/**
 * Una captura de pantalla, servida en el tamaño que toca.
 *
 * No usa `next/image` a propósito. La exportación estática obliga a
 * `images.unoptimized`, con lo que `next/image` no genera variantes ni
 * `srcset`: manda el archivo original y le pone un `<img>` alrededor. En
 * celular eso significa bajar 1400px de ancho para pintar 369.
 *
 * Las variantes las genera `scripts/variantes.mjs` con el sufijo del ancho.
 * Aquí solo se declaran, y el navegador escoge.
 */

/** Los mismos anchos que genera el guion. Si cambian allá, cambian aquí. */
const ANCHOS = [400, 800];

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Ancho que ocupará la imagen en pantalla. Sin esto el navegador supone
   *  el ancho del viewport y vuelve a bajar la grande. */
  sizes: string;
  className?: string;
  /** Solo para la imagen que decide el LCP: una por página, o ninguna. */
  prioridad?: boolean;
};

export default function Captura({
  src, alt, width, height, sizes, className, prioridad = false,
}: Props) {
  const base = src.replace(/\.webp$/, "");
  const juego = [
    ...ANCHOS.filter((w) => w < width).map((w) => `${base}-${w}w.webp ${w}w`),
    `${src} ${width}w`,
  ].join(", ");

  return (
    <img
      src={src}
      srcSet={juego}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      /* La del LCP se pide temprano y con prioridad alta; las demás esperan a
         estar cerca de la pantalla. */
      loading={prioridad ? "eager" : "lazy"}
      fetchPriority={prioridad ? "high" : undefined}
      decoding={prioridad ? "sync" : "async"}
    />
  );
}
