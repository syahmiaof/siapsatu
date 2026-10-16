import { useId } from "react";

/** Authored vector layers; the cultural artwork contains no baked-in copy. */
export function MalaysiaBackdrop({
  className,
  city = false,
}: {
  className?: string;
  city?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const star = Array.from({ length: 28 }, (_, i) => {
    const angle = (i * Math.PI) / 14 - Math.PI / 2;
    const radius = i % 2 ? 28 : 61;
    return `${522 + Math.cos(angle) * radius},${127 + Math.sin(angle) * radius}`;
  }).join(" ");
  return (
    <svg
      className={className}
      viewBox="0 0 900 580"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-navy`} x2=".8" y2="1">
          <stop stopColor="#03143a" />
          <stop offset="1" stopColor="#08336b" />
        </linearGradient>
        <linearGradient id={`${id}-sun`} x2="0" y2="1">
          <stop stopColor="#ffdc51" />
          <stop offset="1" stopColor="#ffad28" />
        </linearGradient>
        <clipPath id={`${id}-city`}>
          <circle cx="792" cy="450" r="158" />
        </clipPath>
      </defs>
      <path
        fill="#d6e5ff"
        d="M0 580C24 358 114 264 248 207C405 139 591 74 900 32V580Z"
      />
      <path
        fill={`url(#${id}-navy)`}
        d="M77 580C88 362 132 193 321 107C438 55 533 31 628 0H900V580Z"
      />
      <path
        d="M120 462C272 305 403 357 537 234C652 128 640 53 710-19"
        fill="none"
        stroke="white"
        strokeWidth="77"
      />
      <path
        d="M120 462C272 305 403 357 537 234C652 128 640 53 710-19"
        fill="none"
        stroke="#ff1838"
        strokeWidth="44"
      />
      <path
        d="M190 505C370 302 463 357 626 200S770 169 925 92"
        fill="none"
        stroke="white"
        strokeWidth="61"
      />
      <path
        d="M190 505C370 302 463 357 626 200S770 169 925 92"
        fill="none"
        stroke="#ff1938"
        strokeWidth="28"
      />
      <path fill="#ffd12a" d="M465 65a68 68 0 1 0 0 128a59 59 0 1 1 0-128" />
      <polygon points={star} fill="#ffd12a" />
      <path
        d="M470 504L583 373L641 408L752 230"
        fill="none"
        stroke="#02c45a"
        strokeWidth="39"
        strokeLinejoin="round"
      />
      <path
        d="M694 224L780 197Q791 194 790 207L777 293Q775 306 765 298L739 276L711 249Z"
        fill="#02c45a"
      />
      {city && (
        <g>
          <circle
            cx="792"
            cy="450"
            r="158"
            fill={`url(#${id}-sun)`}
            stroke="white"
            strokeWidth="6"
          />
          <g clipPath={`url(#${id}-city)`}>
            <path
              fill="#ff8b32"
              d="M640 580V485h25v-38l20-10 20 10v38h26v-61l21-12 22 12v156h16V426l20-15 20 15v34h34v-30l25-9 28 9v150Z"
            />
            <g fill="#07336c" stroke="#07336c" strokeLinejoin="round">
              <path d="M681 580V400h7v-26h5v-23h4v-15h4v-34h2v34h4v15h4v23h5v26h7v180Zm61 0V382h7v-28h5v-23h4v-15h4v-35h2v35h4v15h4v23h5v28h7v198Z" />
              <path
                d="M700 443h62v7h-62zm1 7 59 28m-59 0 59-28"
                strokeWidth="3"
              />
              <path d="M824 580l7-144h8l7 144Z" />
              <path
                d="M835 342v46m-13 10h26l-3 24-10 15-10-15Z"
                strokeWidth="2"
              />
              <path d="M817 399q18-20 36 0v7h-36Zm3 13h30v5h-30Z" />
              <path d="M635 580V501h13v-15h7v-31h3v31h8v15h9v79m108 0V490h13v-17l11-8 11 8v107m44 0V465l24-8v123m8 0V508h11v-14h7v-11h3v11h7v14h10v72" />
            </g>
          </g>
        </g>
      )}
    </svg>
  );
}
