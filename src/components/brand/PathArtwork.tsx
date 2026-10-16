import Image from "next/image";
import { Mail, Sheet } from "lucide-react";
import styles from "./PathArtwork.module.css";

/** Seated learner and workflow symbols, composed independently of the Home trio. */
export function PathArtwork() {
  return (
    <div className={styles.scene} data-hero-art aria-hidden="true">
      <Image
        className={styles.ribbon}
        src="/assets/illustrations/ui-v3/path-ribbon.svg"
        alt=""
        width={900}
        height={580}
        unoptimized
      />
      <Image
        className={styles.emblem}
        src="/assets/illustrations/ui-v3/emblem.svg"
        alt=""
        width={162}
        height={100}
        unoptimized
      />
      <Image
        className={styles.arrow}
        src="/assets/illustrations/ui-v3/growth-arrow.svg"
        alt=""
        width={320}
        height={340}
        unoptimized
      />
      <div className={styles.learner}>
        <picture>
          <source
            media="(max-width:700px)"
            srcSet="/assets/illustrations/ui-v3/path-learner-600.webp"
          />
          <Image
            src="/assets/illustrations/ui-v3/path-learner-1100.webp"
            alt=""
            width={1100}
            height={741}
            sizes="(max-width:700px) 90vw, 45vw"
            priority
          />
        </picture>
        <Image
          className={styles.mark}
          src="/assets/brand/siapsatu-symbol-v2.webp"
          alt=""
          width={160}
          height={155}
        />
      </div>
      <svg className={styles.connections} viewBox="0 0 300 340">
        <path
          d="M110 65Q40 75 42 145T115 210M140 205Q215 140 255 170"
          fill="none"
          stroke="#062457"
          strokeWidth="3"
          strokeDasharray="7 7"
        />
        <path
          d="m33 137 9 10 9-10m58 54 9 10-13 6"
          fill="none"
          stroke="#062457"
          strokeWidth="3"
        />
      </svg>
      <span className={`${styles.tile} ${styles.n8n}`}>
        <Image src="/assets/tools/n8n.png" width={76} height={76} alt="" />
      </span>
      <span className={`${styles.tile} ${styles.sheet}`}>
        <Sheet size={38} />
      </span>
      <span className={`${styles.tile} ${styles.ai}`}>
        <Image src="/assets/tools/chatgpt.svg" width={50} height={50} alt="" />
      </span>
      <span className={`${styles.tile} ${styles.mail}`}>
        <Mail size={44} />
      </span>
    </div>
  );
}
