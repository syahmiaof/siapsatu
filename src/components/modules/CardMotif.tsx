/** Decorative, authored outcome illustrations; not third-party product logos. */
export function CardMotif({ theme }: { theme: string }) {
  return (
    <svg viewBox="0 0 240 240" aria-hidden="true">
      {theme === "green" ? (
        <g transform="rotate(-2 120 120)">
          <rect x="57" y="38" width="190" height="190" rx="12" fill="#003b30" />
          <path d="M57 76h190v138q0 14-14 14H69q-12 0-12-14Z" fill="#54ce92" />
          <g fill="#20af73">
            <circle cx="73" cy="56" r="5" />
            <circle cx="89" cy="56" r="5" />
            <circle cx="105" cy="56" r="5" />
          </g>
          <g fill="#004c34">
            <rect x="77" y="97" width="123" height="26" rx="6" />
            <rect x="77" y="139" width="50" height="60" rx="5" />
            <rect x="139" y="139" width="71" height="10" rx="5" />
            <rect x="139" y="160" width="54" height="10" rx="5" />
            <rect x="139" y="181" width="65" height="10" rx="5" />
          </g>
        </g>
      ) : theme === "crimson" ? (
        <g fill="#850015">
          <rect x="156" y="12" width="76" height="98" rx="6" />
          <rect x="115" y="124" width="108" height="122" rx="8" />
          <rect x="63" y="190" width="44" height="70" rx="5" />
          <g fill="#ee1435">
            <rect x="168" y="28" width="50" height="9" rx="4" />
            <rect x="168" y="49" width="50" height="9" rx="4" />
            <rect x="168" y="70" width="33" height="9" rx="4" />
            <rect x="131" y="145" width="74" height="40" rx="6" />
            <rect x="131" y="198" width="56" height="8" rx="4" />
          </g>
        </g>
      ) : (
        <path
          d="M0 240 72 161l39 30L198 69l-26-18 68-17-4 73-21-21-98 151-40-31-30 34Z"
          fill="#2a59cd"
        />
      )}
    </svg>
  );
}
