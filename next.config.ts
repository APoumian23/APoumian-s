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
  /* /trabajo existió y se reemplazó por /codigo. Una URL que ya se publicó no se
   * deja morir en un 404: se redirige, para no perder a quien la tenga guardada
   * ni el posicionamiento que hubiera ganado. */
  async redirects() {
    /* /trabajo y /codigo existieron y se fundieron en /casos: las dos hacían
     * lo mismo —probar el trabajo—, una con capturas y otra con código. Una
     * URL publicada no se deja morir en un 404. */
    return [
      { source: "/trabajo", destination: "/casos", permanent: true },
      { source: "/codigo", destination: "/casos", permanent: true },
    ];
  },
  distDir: esBuild ? ".next-build" : ".next",
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
