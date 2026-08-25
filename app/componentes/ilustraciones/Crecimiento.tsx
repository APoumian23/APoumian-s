/** Crecimiento: las barras suben y el clic aterriza. */
export default function Crecimiento() {
  return (
    <svg className="ilu ilu--crece" viewBox="0 0 320 240" role="img" aria-label="Barras que suben y un clic que llega al sitio">
      <line x1="42" y1="196" x2="286" y2="196" stroke="var(--color-ink)" strokeWidth="2" />
      <g className="ilu__barras">
        {[
          { x: 60, h: 44, d: "0ms" },
          { x: 104, h: 72, d: "110ms" },
          { x: 148, h: 58, d: "220ms" },
          { x: 192, h: 106, d: "330ms" },
          { x: 236, h: 142, d: "440ms" },
        ].map((b) => (
          <rect
            key={b.x}
            className="ilu__barra"
            style={{ "--d": b.d, "--h": `${b.h}px` } as React.CSSProperties}
            x={b.x} y={196 - b.h} width="28" height={b.h} rx="3"
            fill={b.h > 120 ? "var(--color-accent)" : "var(--color-rule)"}
          />
        ))}
      </g>
      <g className="ilu__clic">
        <circle cx="250" cy="44" r="14" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" />
        <path d="M243 44l5 5 9-11" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
