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

echo "→ Compilando…"
pnpm exec next build >/dev/null

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
