/** Ilustración construida a mano: la línea que recorre la página y va
 *  encendiendo los hallazgos. Anima lo que hace la auditoría. */
export default function Escaner() {
  return (
    <svg className="scan" viewBox="0 0 320 240" role="img" aria-label="Una línea recorriendo una página web y marcando hallazgos">
      <rect x="46" y="24" width="228" height="192" rx="8"
            fill="var(--color-surface-deep-2)" stroke="var(--color-rule-deep)" strokeWidth="2" />
      <rect x="46" y="24" width="228" height="26" rx="8" fill="var(--color-surface-deep)" />
      <line x1="46" y1="50" x2="274" y2="50" stroke="var(--color-rule-deep)" strokeWidth="2" />

      <g fill="var(--color-rule-deep)">
        <rect x="66" y="70" width="122" height="9" rx="4" />
        <rect x="66" y="92" width="176" height="6" rx="3" />
        <rect x="66" y="106" width="150" height="6" rx="3" />
        <rect x="66" y="136" width="88" height="6" rx="3" />
        <rect x="66" y="150" width="130" height="6" rx="3" />
        <rect x="66" y="180" width="104" height="6" rx="3" />
      </g>

      {/* hallazgos que se encienden al paso de la línea */}
      <g className="scan__hits">
        <circle className="scan__hit" style={{ "--d": "0ms" } as React.CSSProperties} cx="256" cy="74" r="5" fill="var(--color-accent)" />
        <circle className="scan__hit" style={{ "--d": "700ms" } as React.CSSProperties} cx="256" cy="139" r="5" fill="var(--color-accent)" />
        <circle className="scan__hit" style={{ "--d": "1400ms" } as React.CSSProperties} cx="256" cy="183" r="5" fill="var(--color-accent)" />
      </g>

      <g className="scan__line">
        <line x1="46" y1="0" x2="274" y2="0" stroke="var(--color-accent)" strokeWidth="2.5" />
      </g>
    </svg>
  );
}
