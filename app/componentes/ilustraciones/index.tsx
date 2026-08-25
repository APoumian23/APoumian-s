import Producto from "./Producto";
import Crecimiento from "./Crecimiento";
import Automatizacion from "./Automatizacion";
import Respaldo from "./Respaldo";

const POR_SLUG: Record<string, () => React.JSX.Element> = {
  "producto-digital": Producto,
  crecimiento: Crecimiento,
  "ia-y-automatizacion": Automatizacion,
  "legal-y-contable": Respaldo,
};

export default function Ilustracion({ slug }: { slug: string }) {
  const C = POR_SLUG[slug];
  return C ? <C /> : null;
}
