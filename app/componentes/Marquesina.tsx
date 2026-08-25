import { DISCIPLINAS } from "@/lib/contenido";

/* Marquesina de servicios. Es CSS puro: ancora la resuelve con GSAP, pero un
 * desplazamiento lineal en bucle no necesita 100 KB de librería.
 *
 * El contenido se duplica una vez y el recorrido es de -50%: así el bucle
 * empalma sin salto visible. `aria-hidden` en la copia para que un lector de
 * pantalla no lea la lista dos veces. */
export default function Marquesina({ sentido = "izq" }: { sentido?: "izq" | "der" }) {
  const servicios = DISCIPLINAS.flatMap((d) => d.servicios.map((s) => s.nombre));

  const tira = (oculto: boolean) => (
    <ul className="marq__tira" aria-hidden={oculto || undefined}>
      {servicios.map((n) => (
        <li className="marq__i" key={n}>
          {n}
          <span className="marq__p" aria-hidden="true">·</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marq marq--${sentido}`} role="group" aria-label="Servicios de APoumian Studio">
      <div className="marq__pista">
        {tira(false)}
        {tira(true)}
      </div>
    </div>
  );
}
