import path from "node:path";
import type { NextConfig } from "next";

/* `next build` y `next dev` escribían los dos en `.next`. Si se corre un build
 * con el servidor de desarrollo encendido, el build reemplaza los chunks que el
 * dev ya tenía cargados y la página revienta con "Cannot find module './xxx.js'".
 *
 * Se separa por entorno en la propia configuración —y no en el script de
 * package.json— para que también aplique si alguien teclea `next build` a mano. */
const esBuild = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
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

  distDir: esBuild ? ".next-build" : ".next",
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
