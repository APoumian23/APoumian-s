#!/usr/bin/env bash
#
# Compila el sitio y deja el resultado en la RAÍZ del repositorio.
#
# Por qué en la raíz y no en una carpeta: el despliegue de Hostinger desde
# GitHub clona el repositorio y copia su raíz a public_html, sin compilar nada
# ni saber de subcarpetas. Si en la raíz vive el código fuente, Apache no
# encuentra index.html y responde 403 —que fue exactamente lo que pasó—.
#
# Así que en `main` conviven dos cosas: el sitio compilado, que es lo que se
# sirve, y el código que lo genera, que .htaccess bloquea para que nadie lo
# descargue desde el navegador.
#
#   ./publicar.sh   y luego commit + push a main
set -euo pipefail
cd "$(dirname "$0")"

# Nada de lo que salga del build puede llamarse igual que estas entradas. Si
# algún día una ruta nueva coincide, el script se detiene antes de borrar algo
# irrecuperable en vez de descubrirlo cuando ya no esté.
PROTEGIDAS=(
  .git .gitignore .hallmark .next .next-build README.md app lib
  next-env.d.ts next.config.ts node_modules package.json pnpm-lock.yaml
  pnpm-workspace.yaml public tokens.css tsconfig.json publicar.sh servidor
  .env.example .env.production .env.local .env.development.local
)

# `next build` borra archivos de `.next` aunque `distDir` lo mande a otra
# carpeta. Está medido: con el servidor de desarrollo encendido, un build
# elimina 17 archivos de `.next/server/app/` y la siguiente petición responde
# 500 con "Cannot find module './325.js'". Es comportamiento de Next, no algo
# que se pueda configurar.
#
# Antes esto solo avisaba. No sirvió: el aviso se pierde entre la salida del
# build y el 500 aparece después, cuando ya nadie lo relaciona. Dos veces
# costó media hora buscar un fallo en el código que no estaba ahí. Así que se
# niega, que es lo único que de verdad lo evita.
if lsof -nP -iTCP:3180 -sTCP:LISTEN >/dev/null 2>&1 && [ "${FORZAR:-}" != "1" ]; then
  cat <<'AVISO'
✗ El servidor de desarrollo está encendido en el 3180.

  Compilar ahora lo dejaría respondiendo 500 con "Cannot find module".
  No es un fallo del código: `next build` borra archivos que el dev tiene
  cargados, y eso no se puede evitar desde la configuración.

  Apágalo, publica, y vuelve a encenderlo:

      pkill -f "next dev" && ./publicar.sh && pnpm dev

  Si sabes lo que haces y vas a reiniciarlo tú:  FORZAR=1 ./publicar.sh
AVISO
  exit 1
fi

echo "→ Compilando…"
# La salida del build se silencia porque son cien líneas de rutas, pero el
# fallo NO puede silenciarse: con `set -e` el script aborta sin decir nada, y
# quien redirige la salida se queda con el sitio anterior creyendo que publicó.
if ! pnpm exec next build > /tmp/publicar-build.log 2>&1; then
  echo "✗ La compilación falló. No se tocó nada de lo publicado." >&2
  echo "  Últimas líneas del error:" >&2
  tail -20 /tmp/publicar-build.log >&2
  exit 1
fi

echo "→ Afinando la exportación…"
# Quita el polyfill que nadie usa y mete el CSS en el HTML. Los dos son
# cosas que Next no deja configurar; el detalle está en scripts/afinar.mjs.
if ! node scripts/afinar.mjs .next-build; then
  echo "✗ El afinado falló. No se tocó nada de lo publicado." >&2
  exit 1
fi

ORIGEN=".next-build"
[ -f "$ORIGEN/index.html" ] || { echo "✗ La exportación no tiene index.html. Aborto."; exit 1; }

echo "→ Comprobando que nada del sitio pise al código…"
for ruta in "$ORIGEN"/* "$ORIGEN"/.[!.]*; do
  [ -e "$ruta" ] || continue
  nombre="$(basename "$ruta")"
  for p in "${PROTEGIDAS[@]}"; do
    if [ "$nombre" = "$p" ]; then
      echo "✗ El build genera «$nombre», que chocaría con el código fuente. Aborto."
      exit 1
    fi
  done
done

echo "→ Retirando la publicación anterior…"
# Solo se borra lo que el build anterior dejó registrado, nunca a ciegas.
if [ -f .publicado ]; then
  while IFS= read -r viejo; do
    [ -n "$viejo" ] && rm -rf -- "./$viejo"
  done < .publicado
fi

echo "→ Copiando el sitio a la raíz…"
: > .publicado
for ruta in "$ORIGEN"/* "$ORIGEN"/.[!.]*; do
  [ -e "$ruta" ] || continue
  nombre="$(basename "$ruta")"
  cp -R "$ruta" "./$nombre"
  echo "$nombre" >> .publicado
done

echo "→ Colocando .htaccess y contacto.php…"
# apache.conf se copia como .htaccess. En el repositorio NO puede llamarse así:
# Apache lee el .htaccess de cada carpeta, y el de una subcarpeta anula las
# reglas de la raíz —incluida la que debía bloquear esa misma subcarpeta—.
cp servidor/apache.conf ./.htaccess && echo ".htaccess" >> .publicado
cp servidor/contacto.php ./contacto.php && echo "contacto.php" >> .publicado

echo
echo "✓ Sitio en la raíz: $(find . -maxdepth 2 -name '*.html' -not -path './node_modules/*' -not -path './.next*' | wc -l | tr -d ' ') páginas"
echo "  Ahora:  git add -A && git commit && git push origin main"
