import path from "node:path";
import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

/* `next build` y `next dev` escribirían los dos en `.next`. Correr un build con
 * el servidor de desarrollo encendido reemplaza los trozos que el dev ya tenía
 * cargados, y la página revienta con "Cannot find module './325.js'".
 *
 * Esto se separaba antes mirando NODE_ENV, y NO FUNCIONABA: Next carga esta
 * configuración antes de fijar esa variable, así que `next build` la veía sin
 * definir, se iba por la rama de desarrollo y escribía en `.next` igual. El
 * guardia existía, se leía bien y no hacía nada — que es la peor clase de
 * guardia, porque nadie vuelve a mirarlo.
 *
 * La fase sí la pasa Next como argumento, y es su forma documentada de
 * distinguir un build de un `dev`. */
const configuracion = (fase: string): NextConfig => ({
  reactStrictMode: true,

  /* El sitio se publica en hosting compartido de Hostinger, que sirve archivos
   * y PHP pero no ejecuta Node. `export` genera HTML plano: no hace falta un
   * servidor encendido y el hosting que ya se paga alcanza.
   *
   * Lo que esto cuesta, para que nadie lo descubra a media urgencia:
   *   - No puede haber rutas de API en Next. El formulario vive en
   *     `public/contacto.php`, que Hostinger sí ejecuta.
   *   - `redirects()` deja de aplicarse: las redirecciones viven en
   *     `public/.htaccess`, que es quien manda en Apache.
   *   - Las imágenes no se optimizan al vuelo. Por eso ya están en WebP. */
  output: "export",

  /* Apache sirve directorios, no extensiones: con esto cada ruta se escribe
   * como `casos/index.html` y `apoumian.com/casos` funciona sin `.html`. */
  trailingSlash: true,

  /* El optimizador de imágenes de Next es un servicio en ejecución; en un
   * sitio exportado no existe. `unoptimized` hace que <Image> emita la ruta
   * tal cual, conservando ancho y alto para que no salte el layout. */
  images: { unoptimized: true },

  distDir: fase === PHASE_PRODUCTION_BUILD ? ".next-build" : ".next",
  outputFileTracingRoot: path.join(process.cwd()),
});

export default configuracion;
