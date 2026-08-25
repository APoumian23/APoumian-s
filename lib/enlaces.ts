import { AUDITORIAS } from "./contenido";

export const TEL = process.env.NEXT_PUBLIC_WHATSAPP ?? "524611801622";

/* Dónde vive el motor de auditorías. Se define AQUÍ y en un solo lugar: antes
 * el nav y el buscador leían la variable de entorno mientras el pie y los
 * botones de plan tenían la URL escrita a mano, así que en desarrollo unos
 * apuntaban a localhost y otros a un subdominio inexistente. */
export const MOTOR = process.env.NEXT_PUBLIC_AUDITORIAS_URL ?? AUDITORIAS.url;
export const MOTOR_ACCESO = `${MOTOR}/acceso`;
export const MOTOR_REGISTRO = `${MOTOR}/registro`;
export const CORREO = process.env.NEXT_PUBLIC_EMAIL ?? "hola@apoumian.com";

export const wa = (texto: string) => `https://wa.me/${TEL}?text=${encodeURIComponent(texto)}`;

export const WA_GENERAL = wa("Hola, vi apoumian.com y quiero platicar de un proyecto para mi negocio.");
