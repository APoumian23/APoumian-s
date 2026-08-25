"use client";

import { useEffect, useRef, useState } from "react";

/** Marca al hijo con data-visto la primera vez que entra en pantalla.
 *  Las ilustraciones se animan una sola vez: cuatro bucles infinitos en la
 *  misma página no dejan leer. Con el cursor encima se vuelven a reproducir. */
export default function EnVista({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visto) return;
    if (typeof IntersectionObserver === "undefined") { setVisto(true); return; }
    const io = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => { if (e.isIntersecting) { setVisto(true); io.disconnect(); } }),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visto]);

  return (
    <div className={`ilus ${className}`} ref={ref} data-visto={visto || undefined}>
      {children}
    </div>
  );
}
