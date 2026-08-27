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

/**
 * Arma el `srcset` de una captura.
 *
 * Se exporta porque la imagen de arte dirigida de la portada usa `<picture>`
 * con dos ramas y no puede pasar por este componente, pero la lista de anchos
 * tiene que ser la misma o el navegador pediría variantes que no existen.
 */
export function anchos(src: string, ancho: number): string {
  const base = src.replace(/\.webp$/, "");
  return [
    ...ANCHOS.filter((w) => w < ancho).map((w) => `${base}-${w}w.webp ${w}w`),
    `${src} ${ancho}w`,
  ].join(", ");
}

export default function Captura({
  src, alt, width, height, sizes, className, prioridad = false,
}: Props) {
  const juego = anchos(src, width);

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
