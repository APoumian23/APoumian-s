"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Aclarado progresivo con el scroll.
 *
 * Cada bloque empieza atenuado y se va aclarando conforme sube por la
 * pantalla. No es una entrada de golpe al cruzar un umbral: la opacidad está
 * atada a la posición, así que el aclarado ocurre MIENTRAS se hace scroll.
 *
 * Va con un listener pasivo + requestAnimationFrame y no con
 * `animation-timeline: view()` porque ese CSS deja la línea de tiempo inactiva
 * en varios motores y clava el contenido en opacidad 0 (ver globals.css).
 *
 * Cuando un bloque termina de aclararse se marca y deja de recalcularse: la
 * página se asienta en vez de estar viva para siempre. */

/** A qué altura de la pantalla el bloque queda del todo visible, como fracción
 *  desde arriba.
 *
 *  Estuvo en 0.68 y el efecto no se percibía: con ese valor un bloque se
 *  aclaraba por completo cuando su borde superior seguía en el tercio
 *  inferior, así que para cuando el visitante lo tenía enfrente ya estaba al
 *  100%. En 0.38 el aclarado ocurre dentro de la zona que uno mira. */
const ZONA = 0.38;

/* Qué se atenúa. Antes esto dependía de envolturas `data-revela` puestas a
 * mano, así que el efecto cubría cuatro rejillas y el resto de la página no
 * hacía nada — se veía como si no funcionara. Ahora se recogen los bloques
 * reales del sitio y el efecto es parejo de arriba abajo. */
const BLOQUES = [
  "[data-revela] > *",
  ".band > .wrap > .head",
  ".hero__grid > div", ".stats > div", ".pie__cols > *",
  ".band > .wrap > .display", ".band > .wrap > .lede", ".band > .wrap > .hero__actions",
  ".disc-card", ".prod", ".obra", ".plan", ".step", ".svc", ".caso__bloque",
  ".work-card", ".faq__item", ".cod", ".casillas", ".incl__i",
  ".spec tbody tr", ".vivo__i", ".marca--grande",
  ".hero__index", ".proof",
].join(",");

export default function ObservadorRevela() {
  const ruta = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const vistos = new Set<HTMLElement>();
    const bloques = Array.from(document.querySelectorAll<HTMLElement>(BLOQUES)).filter((b) => {
      // Un bloque dentro de otro ya marcado se atenuaría dos veces.
      if (vistos.has(b)) return false;
      for (const v of vistos) if (v.contains(b)) return false;
      vistos.add(b);
      return true;
    });
    if (bloques.length === 0) return;
    bloques.forEach((b) => (b.dataset.fade = ""));

    // Sin movimiento: se ven completos y no se calcula nada.
    if (reduce.matches) {
      bloques.forEach((b) => b.style.setProperty("--v", "1"));
      return;
    }

    const pendientes = new Set(bloques);
    let pedido = 0;
    /* Testigo de que el cálculo llegó a ejecutarse. Sin esto el seguro de
     * abajo se disparaba SIEMPRE a los 1500 ms y aclaraba de golpe todo lo que
     * el visitante aún no había alcanzado — matando el efecto entero. */
    let corrio = false;

    const pintar = () => {
      pedido = 0;
      corrio = true;
      const alto = window.innerHeight || document.documentElement.clientHeight;
      const limite = alto * ZONA;

      /* Se recorre una copia y se borra DESPUÉS. Borrar del Set mientras se
       * itera con forEach hace que la iteración salte elementos: los primeros
       * bloques se calculaban y los de más abajo se quedaban sin tocar. */
      const listos: HTMLElement[] = [];
      Array.from(pendientes).forEach((b) => {
        const arriba = b.getBoundingClientRect().top;
        // 0 cuando el bloque está al pie de la pantalla, 1 cuando llegó a la zona.
        const v = Math.min(1, Math.max(0, (alto - arriba) / Math.max(1, alto - limite)));
        b.style.setProperty("--v", v.toFixed(3));
        if (v >= 1) listos.push(b);
      });
      listos.forEach((b) => pendientes.delete(b));
    };

    const alScroll = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(pintar);
    };

    pintar();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll, { passive: true });

    /* Seguro, solo si el cálculo NO llegó a correr: en ese caso todo queda
     * visible. Una animación puede fallar; el contenido no. */
    const seguro = window.setTimeout(() => {
      if (corrio) return;
      pendientes.forEach((b) => b.style.setProperty("--v", "1"));
      pendientes.clear();
    }, 1500);

    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
      if (pedido) cancelAnimationFrame(pedido);
      window.clearTimeout(seguro);
    };
  }, [ruta]);

  return null;
}
