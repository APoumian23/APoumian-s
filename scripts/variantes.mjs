/**
 * Genera versiones chicas de cada captura, para servir la que toque.
 *
 *   node scripts/variantes.mjs
 *
 * Por qué existe: la exportación estática obliga a `images.unoptimized`, así
 * que `next/image` no genera nada — sirve el archivo original tal cual. En
 * celular eso significa mandar una imagen de 1400px de ancho para pintarla a
 * 369px. PageSpeed medía 223 KB desperdiciados solo en la portada.
 *
 * Las variantes se guardan junto al original con sufijo de ancho
 * (`ampa-400w.webp`) y se versionan: son parte del sitio, no un artefacto de
 * compilación. Volver a correr esto es idempotente.
 *
 * No toca los SVG: un vector ya se adapta a cualquier tamaño, y rasterizarlo
 * lo empeoraría.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";

/** Los anchos que de verdad se usan en el sitio, medidos en el navegador. */
const ANCHOS = [400, 800];

/** Debajo de este ancho no vale la pena: la variante pesaría casi lo mismo. */
const MINIMO = 900;

const CARPETAS = ["public/trabajo", "public/sistemas"];

function ancho(archivo) {
  const salida = execFileSync("magick", ["identify", "-format", "%w", archivo], {
    encoding: "utf8",
  });
  return Number(salida.trim());
}

let generadas = 0;
let saltadas = 0;

for (const carpeta of CARPETAS) {
  if (!existsSync(carpeta)) continue;
  for (const nombre of readdirSync(carpeta)) {
    const archivo = join(carpeta, nombre);
    if (!statSync(archivo).isFile()) continue;
    if (extname(nombre) !== ".webp") continue;
    // Una variante no engendra variantes.
    if (/-\d+w\.webp$/.test(nombre)) continue;

    const original = ancho(archivo);
    if (original < MINIMO) {
      saltadas++;
      continue;
    }

    const base = basename(nombre, ".webp");
    for (const w of ANCHOS) {
      if (w >= original) continue;
      const destino = join(dirname(archivo), `${base}-${w}w.webp`);
      if (existsSync(destino)) continue;
      execFileSync("magick", [
        archivo,
        "-resize", `${w}x`,
        // 82 es donde la diferencia deja de verse en una captura de pantalla
        // y el archivo todavía baja de tamaño de forma notable.
        "-quality", "82",
        "-define", "webp:method=6",
        "-strip",
        destino,
      ]);
      generadas++;
      console.log(`  + ${destino}`);
    }
  }
}

console.log(`\n  ${generadas} variantes generadas, ${saltadas} imágenes ya eran chicas.`);
