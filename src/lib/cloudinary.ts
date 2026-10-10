import { createHash } from "node:crypto";

export function avatarPublicId(userId: string) {
  return `gonances/avatars/${userId}`;
}

export function cloudinarySignature(
  parameters: Record<string, string | number | boolean>,
  secret: string,
) {
  const value = Object.entries(parameters)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, entry]) => `${key}=${entry}`)
    .join("&");
  return createHash("sha1").update(`${value}${secret}`).digest("hex");
}

export async function deleteManagedAvatar(userId: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return;

  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = avatarPublicId(userId);
  const signature = cloudinarySignature(
    { invalidate: true, public_id: publicId, timestamp },
    apiSecret,
  );
  const body = new URLSearchParams({
    api_key: apiKey,
    invalidate: "true",
    public_id: publicId,
    signature,
    timestamp: String(timestamp),
  });
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    { method: "POST", body },
  );
  if (!response.ok) throw new Error("Cloudinary no pudo eliminar el avatar");
}
