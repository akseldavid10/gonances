import { NextResponse } from "next/server";
import { authenticatedUserId } from "@/lib/api-auth";
import { avatarPublicId, cloudinarySignature } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { allowRateLimitedRequest } from "@/lib/rate-limit";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
const MAX_REQUEST_SIZE = MAX_AVATAR_SIZE + 128 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function detectedImageType(bytes: Uint8Array) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff)
    return "image/jpeg";
  if (
    bytes.length >= 8 &&
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
      (value, index) => bytes[index] === value,
    )
  )
    return "image/png";
  if (
    bytes.length >= 12 &&
    new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" &&
    new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
  )
    return "image/webp";
  return null;
}

async function readBoundedRequest(request: Request): Promise<Request | null> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_REQUEST_SIZE) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new Request(request.url, {
    method: request.method,
    headers: request.headers,
    body,
  });
}

export async function POST(request: Request) {
  const userId = await authenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  if (
    !(await allowRateLimitedRequest("avatar-upload:user", userId, 10, 15 * 60))
  ) {
    return NextResponse.json(
      { error: "Demasiadas cargas. Espera unos minutos e inténtalo de nuevo." },
      { status: 429, headers: { "Retry-After": String(15 * 60) } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_SIZE) {
    return NextResponse.json(
      { error: "La imagen no puede superar 2 MB" },
      { status: 413 },
    );
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "La carga de fotos no está configurada" },
      { status: 503 },
    );
  }

  try {
    const boundedRequest = await readBoundedRequest(request);
    if (!boundedRequest) {
      return NextResponse.json(
        { error: "La imagen no puede superar 2 MB" },
        { status: 413 },
      );
    }
    const formData = await boundedRequest.formData();
    const file = formData.get("file");
    if (
      typeof file === "string" ||
      !file ||
      !ACCEPTED_TYPES.has(file.type) ||
      file.size > MAX_AVATAR_SIZE
    ) {
      return NextResponse.json(
        { error: "Elige una imagen JPG, PNG o WebP de hasta 2 MB" },
        { status: 400 },
      );
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (bytes.length === 0 || detectedImageType(bytes) !== file.type) {
      return NextResponse.json(
        { error: "El contenido del archivo no coincide con una imagen válida" },
        { status: 400 },
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = avatarPublicId(userId);
    const signedParameters = {
      allowed_formats: "jpg,png,webp",
      invalidate: true,
      overwrite: true,
      public_id: publicId,
      timestamp,
    };
    const signature = cloudinarySignature(signedParameters, apiSecret);
    const uploadData = new FormData();
    uploadData.set("file", file, file.name);
    uploadData.set("api_key", apiKey);
    uploadData.set("timestamp", String(timestamp));
    for (const [key, value] of Object.entries(signedParameters)) {
      uploadData.set(key, String(value));
    }
    uploadData.set("signature", signature);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadData,
      },
    );
    const uploaded: unknown = await uploadResponse.json().catch(() => null);
    const result =
      uploaded && typeof uploaded === "object"
        ? (uploaded as Record<string, unknown>)
        : null;
    const secureUrl = result?.secure_url;
    if (
      !uploadResponse.ok ||
      typeof secureUrl !== "string" ||
      result?.public_id !== publicId ||
      result?.resource_type !== "image" ||
      typeof result?.format !== "string" ||
      !["jpg", "jpeg", "png", "webp"].includes(result.format) ||
      typeof result?.bytes !== "number" ||
      result.bytes > MAX_AVATAR_SIZE ||
      typeof result?.width !== "number" ||
      typeof result?.height !== "number" ||
      result.width > 4096 ||
      result.height > 4096
    ) {
      return NextResponse.json(
        { error: "No se pudo cargar la foto" },
        { status: 502 },
      );
    }
    await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: secureUrl },
    });
    return NextResponse.json({ secure_url: secureUrl }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar la imagen" },
      { status: 400 },
    );
  }
}
