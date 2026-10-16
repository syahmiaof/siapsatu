import Image from "next/image";
import { MalaysiaBackdrop } from "./MalaysiaBackdrop";
import styles from "./DirectoryArtwork.module.css";

/** The wide banner and mobile portrait have independently composed artwork. */
export function DirectoryArtwork() {
  const star = Array.from({ length: 28 }, (_, i) => {
    const a = (i * Math.PI) / 14 - Math.PI / 2,
      r = i % 2 ? 24 : 56;
    return `${333 + Math.cos(a) * r},${83 + Math.sin(a) * r}`;
  }).join(" ");
  return (
    <div className={styles.scene} data-hero-art aria-hidden="true">
      <svg
        className={styles.banner}
        viewBox="0 0 800 250"
        preserveAspectRatio="none"
      >
        <path fill="#062457" d="M0 250C84 193 55 89 154 40L226 0H800V250Z" />
        <path
          d="M0 267C179 104 297 263 443 76S640 123 830-34"
          fill="none"
          stroke="white"
          strokeWidth="64"
        />
        <path
          d="M0 267C179 104 297 263 443 76S640 123 830-34"
          fill="none"
          stroke="#ff1938"
          strokeWidth="32"
        />
        <path fill="#ffd12a" d="M309 28a62 62 0 1 0 0 111a52 52 0 1 1 0-111" />
        <polygon points={star} fill="#ffd12a" />
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
