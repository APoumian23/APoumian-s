# apoumian.com — APoumian Studio

Landing de servicios. Next.js 15 (App Router) + CSS con tokens. Sin Tailwind: el sistema
de diseño vive en `tokens.css` y se consume por nombre.

## Correr en local

```bash
pnpm install
pnpm dev     # http://localhost:3180
```

## Variables de entorno

Copia `.env.example` a `.env.local` y llena:

| Variable | Para qué | Obligatoria |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP` | Número en formato internacional sin `+` ni espacios (ej. `52477…`). Alimenta todos los enlaces de WhatsApp. | **Sí** |
| `NEXT_PUBLIC_EMAIL` | Correo público que aparece en el sitio. | **Sí** |
| `RESEND_API_KEY` | Si está definida, el formulario de diagnóstico envía correo con [Resend](https://resend.com). | No |
| `CONTACTO_TO` | Destinatario de ese correo. | Solo con Resend |

Sin `RESEND_API_KEY` el formulario **sigue funcionando**: valida, responde y registra la
solicitud en el log del servidor. Es un modo honesto de arranque, no un error silencioso.

## Deploy en Vercel

1. Sube el repo a GitHub y en Vercel elige *Import Project*.
2. En *Settings → Environment Variables* carga las cuatro variables de arriba.
3. En *Settings → Domains* agrega `apoumian.com` y `www.apoumian.com`, y apunta el DNS
   como te indique Vercel.
4. Si usas Resend, verifica el dominio ahí para poder enviar desde `@apoumian.com`;
   mientras tanto cambia el remitente en `app/api/contacto/route.ts`.

## Estructura

```
app/
  layout.tsx          fuentes, metadatos, Open Graph
  page.tsx            la página completa
  globals.css         el CSS del sitio (lleva el sello de diseño arriba)
  componentes/        Nav · Marca · Diagnostico (formulario)
  api/contacto/       endpoint del formulario
lib/contenido.ts      TODO el texto y los datos: servicios, trabajo, pasos
tokens.css            el sistema de diseño (color, tipografía, espacio, movimiento)
public/marca/         logos reales del brandbook
```

**Para editar textos o servicios no toques el JSX**: todo está en `lib/contenido.ts`.

## Sistema de diseño

Marca: marino tinta `#16223C` · oro arena `#C6952F` · crema marfil `#F4EDE1`.
Tipografía: Bodoni Moda (display) + IBM Plex Sans (texto) + IBM Plex Mono (solo numerales).
Todo color y toda fuente pasan por un token de `tokens.css`; no hay valores sueltos.

## Por qué `distDir` cambia según el entorno

`next.config.ts` manda el build a `.next-build` y deja `.next` para el servidor de desarrollo.
Si los dos escriben en la misma carpeta y corres un build con `pnpm dev` encendido, el build
reemplaza los chunks que el dev ya tenía cargados y el sitio revienta con
`Cannot find module './562.js'` y se queda sin CSS.

Está resuelto en la configuración y no en el script de `package.json` para que también aplique
cuando se llama a `next build` directamente (por ejemplo con `pnpm exec next build`, que se
salta los scripts).
