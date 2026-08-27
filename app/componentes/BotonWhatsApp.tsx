import { WA_GENERAL } from "@/lib/enlaces";

/* Botón fijo de WhatsApp, en todas las páginas.
 *
 * Escribir por WhatsApp es la vía más corta a una conversación con un negocio
 * mexicano, y hasta ahora había que llegar al pie o a contacto para encontrarla.
 *
 * Va abajo a la derecha porque ahí lo alcanza el pulgar sin cambiar la mano, y
 * lleva `env(safe-area-inset-bottom)` para no quedar debajo de la barra del
 * navegador en un iPhone. Lleva el mensaje ya escrito: quien lo toca no tiene
 * que redactar nada, y del otro lado se sabe de dónde viene.
 */
export default function BotonWhatsApp() {
  return (
    <a
      className="wapp"
      href={WA_GENERAL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg className="wapp__i" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z"
        />
        <path
          fill="currentColor"
          d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.86 9.86 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Z"
        />
      </svg>
      <span className="wapp__t">WhatsApp</span>
    </a>
  );
}
