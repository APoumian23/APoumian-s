/** Producto digital: los bloques de una interfaz cayendo en su sitio. */
export default function Producto() {
  return (
    <svg className="ilu ilu--producto" viewBox="0 0 320 240" role="img" aria-label="Los bloques de una interfaz acomodándose en su lugar">
      <rect x="30" y="26" width="260" height="188" rx="10" fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="2" />
      <line x1="30" y1="58" x2="290" y2="58" stroke="var(--color-ink)" strokeWidth="2" />
      <circle cx="48" cy="42" r="4" fill="var(--color-accent)" />
      <rect x="62" y="38" width="46" height="8" rx="4" fill="var(--color-rule)" />

      <g className="ilu__p">
        <rect className="ilu__b" style={{ "--d": "0ms" } as React.CSSProperties} x="50" y="78" width="112" height="10" rx="5" fill="var(--color-ink)" />
        <rect className="ilu__b" style={{ "--d": "110ms" } as React.CSSProperties} x="50" y="98" width="160" height="6" rx="3" fill="var(--color-rule)" />
        <rect className="ilu__b" style={{ "--d": "180ms" } as React.CSSProperties} x="50" y="112" width="132" height="6" rx="3" fill="var(--color-rule)" />
        <rect className="ilu__b" style={{ "--d": "260ms" } as React.CSSProperties} x="50" y="134" width="74" height="26" rx="5" fill="var(--color-accent)" />
        <rect className="ilu__b" style={{ "--d": "340ms" } as React.CSSProperties} x="196" y="78" width="74" height="52" rx="6" fill="none" stroke="var(--color-rule)" strokeWidth="2" />
        <rect className="ilu__b" style={{ "--d": "420ms" } as React.CSSProperties} x="196" y="140" width="74" height="20" rx="5" fill="none" stroke="var(--color-rule)" strokeWidth="2" />
        <rect className="ilu__b" style={{ "--d": "500ms" } as React.CSSProperties} x="50" y="178" width="220" height="18" rx="5" fill="none" stroke="var(--color-rule)" strokeWidth="2" />
      </g>
    </svg>
  );
}
