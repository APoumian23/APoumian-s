"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* Un velo del color del papel cubre la pantalla completa y se abre un hueco
 * donde está el cursor: lo que hay detrás solo se ve por ahí. Conforme se baja,
 * el velo se desvanece y la página queda descubierta.
 *
 * Decisiones que importan:
 * - `pointer-events: none`, si no el velo se comería todos los clics.
 * - Se apaga en punteros gruesos (táctil): sin cursor no hay hueco, y un velo
 *   fijo sobre una pantalla que no se puede "destapar" es contenido oculto.
 * - Se apaga con `prefers-reduced-motion`.
 * - Si el script no corre, el velo nace en opacidad 0: nunca puede tapar nada. */

/** Cuánto scroll (en fracciones de pantalla) tarda en desvanecerse del todo.
 *
 *  Muy corto a propósito. Una lámina encima SIEMPRE cuesta contraste: al 28%
 *  el titular aguanta 9.2:1 y el cuerpo 4.7:1, pero el texto secundario cae a
 *  3.13:1, por debajo del mínimo legible. No hay forma de tener las dos cosas.
 *
 *  La salida es que dure poco: se disipa en un tercio de pantalla de scroll,
 *  así es un saludo y no un peaje. Y mientras está, el hueco del cursor
 *  permite leer cualquier cosa apuntándola. */
const RECORRIDO = 0.34;

export default function Velo() {
  const ref = useRef<HTMLDivElement>(null);
  const ruta = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fino = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fino.matches || reduce.matches) return;

    el.dataset.activo = "";

    let pedido = 0;
    const pintar = () => {
      pedido = 0;
      const alto = window.innerHeight || 1;
      const avance = Math.min(1, window.scrollY / (alto * RECORRIDO));
      el.style.setProperty("--velo", String(+(1 - avance).toFixed(3)));
      if (avance >= 1) el.dataset.fuera = "";
      else delete el.dataset.fuera;
    };

    const alScroll = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(pintar);
    };

    const alMover = (e: PointerEvent) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
    };

    pintar();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll, { passive: true });
    window.addEventListener("pointermove", alMover, { passive: true });

    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
      window.removeEventListener("pointermove", alMover);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, [ruta]);

  return <div className="velo" ref={ref} aria-hidden="true" />;
}
