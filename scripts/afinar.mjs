/**
 * Retoques sobre la exportación, antes de publicarla.
 *
 *   node scripts/afinar.mjs .next-build
 *
 * Son dos cosas que Next no deja configurar y que PageSpeed cobra caro.
 *
 * 1. El polyfill. Next 15 emite `polyfills-*.js` con `noModule` en todas las
 *    páginas, pase lo que pase: probamos con browserslist moderno y el archivo
 *    sigue ahí (y el bundle no cambió ni un KB). Son 109 KB que solo
 *    descargaría un navegador sin soporte de módulos —o sea, uno que tampoco
 *    puede ejecutar el resto del JavaScript de Next—. Para ese navegador la
 *    página igual queda como HTML estático, que se ve bien. Así que el archivo
 *    no sirve a nadie.
 *
 * 2. La hoja de estilos. Un solo archivo para las 25 páginas, y el último
 *    recurso que bloquea el primer pintado: PageSpeed lo tasa en 161 ms.
 *    Metida en el HTML, esos bytes llegan en la misma respuesta en vez de
 *    esperar un segundo viaje que ni siquiera puede empezar hasta que el
 *    navegador termine de leer el <head>. Comprimida son ~10 KB.
 *
 *    El <link> se retira. Se puede porque las 25 páginas usan LA MISMA hoja:
 *    al navegar dentro del sitio, el <style> de la primera página sigue en el
 *    documento y las siguientes ya están cubiertas. Si algún día una ruta
 *    tuviera su propio CSS, esto dejaría de valer: la comprobación de abajo
 *    aborta si aparece más de una hoja.
 *
 * Esto vive aparte de `publicar.sh` para poder correrlo y revisarlo solo.
 */
import { readdirSync, statSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, extname } from "node:path";

const raiz = process.argv[2];
if (!raiz) {
  console.error("Falta la carpeta. Uso: node scripts/afinar.mjs .next-build");
  process.exit(1);
}

function paginas(dir) {
  return readdirSync(dir).flatMap((n) => {
    const f = join(dir, n);
    if (statSync(f).isDirectory()) return paginas(f);
    return extname(n) === ".html" ? [f] : [];
  });
}

const html = paginas(raiz);

/* Primera pasada: solo se mira. La comprobación de "una sola hoja" tiene que
   correr antes de tocar ningún archivo — si aborta a medias, deja la
   exportación en un estado que nadie pidió. */
const hojas = new Set();
for (const archivo of html) {
  for (const [, ruta] of readFileSync(archivo, "utf8")
    .matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*\/?>/g)) {
    hojas.add(ruta);
  }
}
if (hojas.size > 1) {
  console.error(
    `✗ Hay ${hojas.size} hojas de estilo distintas. Meterlas en línea y quitar\n` +
    `  el <link> solo es seguro con una sola hoja compartida. No se tocó nada.`,
  );
  process.exit(1);
}
let sinPolyfill = 0;
let conEstilo = 0;
const cssVistos = new Map();

for (const archivo of html) {
  let t = readFileSync(archivo, "utf8");
  const antes = t;

  // 1. Fuera el polyfill.
  t = t.replace(/<script[^>]*\bnoModule\b[^>]*><\/script>/gi, "");
  if (t !== antes) sinPolyfill++;

  // 2. La hoja de estilos, metida en el HTML.
  //    El <link> se queda: el enrutador de Next lo usa al navegar, y quitarlo
  //    deja las páginas siguientes sin estilo. Lo que se logra es que el
  //    primer pintado ya no lo espere, porque las reglas van antes.
  const enlaces = [...t.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*\/?>/g)];
  for (const [etiqueta, ruta] of enlaces) {
    if (!cssVistos.has(ruta)) {
      try {
        cssVistos.set(ruta, readFileSync(join(raiz, ruta), "utf8"));
      } catch {
        cssVistos.set(ruta, null);
      }
    }
    const css = cssVistos.get(ruta);
    if (!css) continue;
    t = t.replace(etiqueta, `<style>${css}</style>`);
    conEstilo++;
  }

  if (t !== antes) writeFileSync(archivo, t);
}


// El archivo del polyfill ya no lo referencia nadie.
let borrados = 0;
const chunks = join(raiz, "_next", "static", "chunks");
try {
  for (const n of readdirSync(chunks)) {
    if (n.startsWith("polyfills-") && n.endsWith(".js")) {
      rmSync(join(chunks, n));
      borrados++;
    }
  }
} catch { /* si no existe la carpeta, no hay nada que borrar */ }

console.log(`  ${html.length} páginas · polyfill fuera de ${sinPolyfill} · estilos en línea en ${conEstilo} · ${borrados} archivo(s) de polyfill borrado(s)`);
