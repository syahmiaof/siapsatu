import Image from "next/image";
import { MalaysiaBackdrop } from "./MalaysiaBackdrop";
import styles from "./DirectoryArtwork.module.css";

/** The wide banner and mobile portrait have independently composed artwork. */
export function DirectoryArtwork() {
  return (
    <div className={styles.scene} data-hero-art aria-hidden="true">
      <svg
        className={styles.banner}
        viewBox="0 0 800 250"
        preserveAspectRatio="none"
      >
        {/* Clean Midnight Navy Negative Space */}
        <path
          fill="#062457"
          d="M 40 250 C 90 190, 150 110, 240 50 C 340 10, 520 0, 800 0 V 250 H 40 Z"
        />

        {/* Fluid Malaysian Ribbon: Sweeps strictly BELOW the emblem region */}
        <g id="tools-fluid-ribbon">
          <path
            d="M -20 240 C 120 235, 260 230, 380 220 C 500 210, 580 80, 820 20"
            fill="none"
            stroke="#ffffff"
            strokeWidth="66"
            strokeLinejoin="round"
          />
          <path
            d="M -20 240 C 120 235, 260 230, 380 220 C 500 210, 580 80, 820 20"
            fill="none"
            stroke="#ff1938"
            strokeWidth="54"
            strokeLinejoin="round"
          />
          <path
            d="M -20 240 C 120 235, 260 230, 380 220 C 500 210, 580 80, 820 20"
            fill="none"
            stroke="#ffffff"
            strokeWidth="18"
            strokeLinejoin="round"
          />
        </g>

        {/* Growth Arrow & Sparkles */}
        <path
          d="M475 260 603 149"
          fill="none"
          stroke="#03c758"
          strokeWidth="37"
        />
        <path
          d="m555 138 77-27q12-3 10 10l-17 75q-2 10-10 3l-55-47q-10-9-5-14"
          fill="#03c758"
        />
        <path
          d="m652 223 16-20m1 32 20-15"
          stroke="#ff5a0a"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
      <Image
        className={styles.emblem}
        src="/assets/illustrations/ui-v4/emblem.svg"
        alt=""
        width={172}
        height={121}
        unoptimized
      />
      <p className={styles.caption}>
        Tools betul.
        <br />
        Skill nyata.
        <br />
        Masa depan lebih cerah.
        <span />
      </p>
      <div className={styles.mobile}>
        <MalaysiaBackdrop className={styles.flag} />
        <div className={styles.person}>
          <Image
            src="/assets/illustrations/parity-v2/portrait-male-500.webp"
            alt=""
            width={500}
            height={750}
            sizes="180px"
            priority
          />
          <Image
            className={styles.mark}
            src="/assets/brand/siapsatu-symbol-v2.webp"
            alt=""
            width={160}
            height={155}
          />
        </div>
      </div>
    </div>
  );
}
