import { grafo } from "@/lib/schema";

/**
 * Pinta un bloque de datos estructurados.
 *
 * Va con `dangerouslySetInnerHTML` porque React escaparía las comillas del
 * JSON y Google recibiría texto roto. El contenido no viene de nadie de fuera:
 * lo arma `grafo()` con JSON.stringify a partir de nuestro propio contenido.
 */
export default function Datos({ nodos }: { nodos: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: grafo(...nodos) }}
    />
  );
}
