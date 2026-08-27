import Link from "next/link";

export type Ficha = {
  id: string;
  numero: string;
  titulo: string;
  /** Una línea. Es lo que se lee primero. */
  lema?: string;
  /** Segunda línea, corta. Nada de párrafos. */
  detalle?: string;
  /** Lo que incluye, como lista de verdad. Un texto corrido separado por
   *  puntos no se puede escanear, que es justo lo que se hace con una lista. */
  lista?: string[];
  /** Lo que NO incluye. Se marca en rojo con una tacha. */
  listaNo?: string[];
  /** Cifra grande (precios, calificaciones). */
  cifra?: string;
  cifraPie?: string;
  href?: string;
  hrefTexto?: string;
  /** Botón de acción. Una tarjeta de precio sin él no sirve de nada. */
  accion?: { texto: string; href: string; externo?: boolean };
  /** Texto en lugar de la cifra, cuando el precio no está definido. */
  cifraPendiente?: string;
  /** Qué se dibuja en la cabecera de la ficha. */
  cara?: React.ReactNode;
  destacada?: boolean;
};

/* Tarjetas en rejilla: todas a la vista, sin abanico y sin clavar la página.
 *
 * Sustituye a la baraja. La baraja se veía bien pero cobraba caro: cuatro
 * pantallas de scroll para enseñar cuatro cosas, con la información escondida
 * detrás de una interacción. Aquí se ve todo de un golpe y cada ficha enlaza a
 * su detalle.
 *
 * Es un componente de servidor: no necesita estado ni JavaScript. */
export default function Rejilla({
  fichas,
  columnas = 4,
}: {
  fichas: Ficha[];
  columnas?: 2 | 3 | 4;
}) {
  return (
    <ul className="rejilla" data-cols={columnas}>
      {fichas.map((f) => (
        // `data-clic` hace que TODA la tarjeta lleve al enlace, no solo su texto.
        // Solo cuando hay un único destino: con botón de acción encima serían
        // dos zonas de clic encimadas y el visitante no sabría a dónde va.
        <li
          className="ficha"
          key={f.id}
          data-destacada={f.destacada ? "" : undefined}
          data-clic={f.href && !f.accion ? "" : undefined}
        >
          <span className="ficha__n">{f.numero}</span>

          {f.cara && <span className="ficha__cara">{f.cara}</span>}

          {f.cifraPendiente ? (
            <span className="ficha__pend">{f.cifraPendiente}</span>
          ) : f.cifra ? (
            <span className="ficha__cifra">
              <span className="ficha__cifra-n">{f.cifra}</span>
              {f.cifraPie && <span className="ficha__cifra-p">{f.cifraPie}</span>}
            </span>
          ) : null}

          <h3 className="ficha__t">{f.titulo}</h3>
          {f.lema && <p className="ficha__l">{f.lema}</p>}
          {f.detalle && <p className="ficha__d">{f.detalle}</p>}

          {(f.lista || f.listaNo) && (
            <ul className="ficha__lista">
              {f.lista?.map((x) => <li key={x}>{x}</li>)}
              {f.listaNo?.map((x) => <li key={x} data-no="">{x}</li>)}
            </ul>
          )}

          {/* El pie se empuja abajo para que los botones queden alineados entre
              tarjetas de distinta altura. Botones a distintas alturas es de las
              cosas que más delatan un maquetado descuidado. */}
          <span className="ficha__pie">
            {f.accion && (
              f.accion.externo ? (
                <a className="btn ficha__btn" href={f.accion.href} target="_blank" rel="noopener noreferrer">
                  {f.accion.texto}
                </a>
              ) : (
                <Link className="btn ficha__btn" href={f.accion.href}>{f.accion.texto}</Link>
              )
            )}
            {f.href && (
              <Link className="link" href={f.href}>{f.hrefTexto ?? "Ver a detalle"} →</Link>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
