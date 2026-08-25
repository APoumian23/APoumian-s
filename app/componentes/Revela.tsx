/** Envoltura que marca un grupo para revelarse escalonado.
 *
 *  Es un componente de SERVIDOR: solo pinta el atributo. Quien observa es
 *  `ObservadorRevela`, montado una sola vez en el layout. Antes esto llevaba
 *  su propio IntersectionObserver por instancia y no disparaba: en desarrollo
 *  React monta, desmonta y vuelve a montar, y el observador quedaba enredado
 *  en ese ciclo. Un observador global no depende del ciclo de vida de nadie.
 */
export default function Revela({
  children,
  paso = 90,
  className = "",
}: {
  children: React.ReactNode;
  /** Milisegundos entre un hijo y el siguiente. */
  paso?: number;
  className?: string;
}) {
  return (
    <div className={className} data-revela="" style={{ "--paso": `${paso}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
