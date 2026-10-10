import { cookies } from "next/headers";
import { calendarDateIn } from "@/lib/date-only";

/** Zona IANA del navegador (p. ej. "America/Bogota"). No es un dato sensible. */
export const TIME_ZONE_COOKIE = "tz";

/**
 * Corre en el <head> de cada página y deja la zona horaria del navegador en
 * una cookie, para que el servidor sepa qué mes es "este mes" para quien
 * mira. La portada y el acceso la escriben antes de que se llegue al panel.
 */
export const timeZoneCookieScript = `(function(){try{var z=Intl.DateTimeFormat().resolvedOptions().timeZone;if(z&&z.length<64)document.cookie=${JSON.stringify(
  `${TIME_ZONE_COOKIE}=`,
)}+encodeURIComponent(z)+";path=/;max-age=31536000;samesite=lax"+(location.protocol==="https:"?";secure":"")}catch(e){}})()`;

/**
 * Hoy en el calendario de quien mira, como medianoche UTC. Sin cookie (primer
 * pintado, bots) se queda en el día UTC, como antes.
 */
export async function userToday(now = new Date()): Promise<Date> {
  const raw = (await cookies()).get(TIME_ZONE_COOKIE)?.value;
  let timeZone: string | undefined;
  try {
    timeZone = raw ? decodeURIComponent(raw) : undefined;
  } catch {
    // Cookie malformada: se ignora y queda el día UTC.
  }
  return calendarDateIn(now, timeZone);
}
