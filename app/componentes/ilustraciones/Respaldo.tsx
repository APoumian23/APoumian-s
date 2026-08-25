/** Respaldo legal y contable: el sello que cae sobre el documento. */
export default function Respaldo() {
  return (
    <svg className="ilu ilu--legal" viewBox="0 0 320 240" role="img" aria-label="Un sello de aprobación cayendo sobre un documento">
      <rect x="72" y="26" width="176" height="188" rx="8"
            fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="2" />
      <g fill="var(--color-rule)">
        <rect x="96" y="54" width="96" height="9" rx="4" />
        <rect x="96" y="78" width="128" height="6" rx="3" />
        <rect x="96" y="92" width="112" height="6" rx="3" />
        <rect x="96" y="118" width="128" height="6" rx="3" />
        <rect x="96" y="132" width="86" height="6" rx="3" />
      </g>

      <g className="ilu__sello">
        <circle cx="196" cy="168" r="34" fill="none" stroke="var(--color-accent)" strokeWidth="3" />
        <circle cx="196" cy="168" r="26" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path className="ilu__paloma" d="M183 168l9 9 18-19" fill="none"
              stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
