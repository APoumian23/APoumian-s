/**
 * Da forma a los títulos y descripciones que salen de contenido.ts.
 *
 * Las páginas dinámicas —disciplinas y sistemas— reusan como descripción el
 * mismo texto que se pinta en la página. Ese texto está escrito para leerse,
 * no para caber en un resultado de búsqueda: iba de 106 a 252 caracteres, y
 * Google corta en 158. Lo que se pierde es siempre el final, que es donde
 * suele estar el remate.
 *
 * Aquí no se reescribe el contenido: se recorta por frase completa. Un
 * resumen que termina a media palabra se ve peor que uno corto.
 */

/** Lo que Google muestra sin truncar. Debajo de 120 se desperdicia el espacio. */
const MAX = 158;
const MIN = 120;

/**
 * Recorta a `MAX` cortando en el último punto que quepa.
 *
 * Si no hay ningún punto —una sola frase larga— corta por palabra y cierra con
 * puntos suspensivos, que al menos avisa que sigue.
 */
export function resumen(texto: string, complemento?: string): string {
  const limpio = texto.replace(/\s+/g, " ").trim();

  if (limpio.length <= MAX) {
    if (limpio.length >= MIN || !complemento) return limpio;
    // Corto: se completa, pero solo si el complemento cabe entero.
    const unido = `${limpio} ${complemento}`.trim();
    return unido.length <= MAX ? unido : limpio;
  }

  const recorte = limpio.slice(0, MAX);
  const punto = Math.max(recorte.lastIndexOf(". "), recorte.lastIndexOf("; "));
  // El punto tiene que dejar algo que valga la pena; si cae muy pronto, no sirve.
  if (punto >= MIN) return recorte.slice(0, punto + 1);

  const espacio = recorte.lastIndexOf(" ");
  return recorte.slice(0, espacio > 0 ? espacio : MAX).replace(/[,;:.]$/, "") + "…";
}

/**
 * Alarga un título que se queda corto.
 *
 * El layout le pega " · APoumian Studio" (18 caracteres), así que aquí se
 * cuenta con eso: un título de 12 llega a 30 solo, y no necesita ayuda.
 */
const SUFIJO = 18;

export function titulo(base: string, complemento: string): string {
  const total = base.length + SUFIJO;
  if (total >= 30) return base;
  const largo = `${base} · ${complemento}`;
  // Si el complemento lo pasa de 60, mejor dejarlo corto que dejarlo truncado.
  return largo.length + SUFIJO <= 60 ? largo : base;
}
