import Image from "next/image";

/* Sobre el papel claro va el isotipo marino; la variante blanca queda para las
   bandas oscuras. */
export default function Marca({ tono = "marino" }: { tono?: "marino" | "blanco" }) {
  return (
    <span className="marca">
      <Image
        className="marca__iso"
        src={tono === "blanco" ? "/marca/isotipo-blanco.svg" : "/marca/isotipo-marino.svg"}
        alt=""
        width={226}
        height={199}
        /* `loading="eager"` y no `priority`. Los dos pintan el logo de
           inmediato, pero `priority` además lo precarga, y ahí competía por
           ancho de banda con la imagen que decide el LCP —siendo un logo de
           30px—. Diferirlo tampoco sirve: es lo primero que se ve, y en
           `lazy` aparece de golpe un momento después. */
        loading="eager"
      />
      <span className="marca__texto">
        <span className="marca__nombre">APoumian</span>
        <span className="marca__sufijo">Studio</span>
      </span>
    </span>
  );
}
