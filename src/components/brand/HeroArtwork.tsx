import React from "react";
import Image from "next/image";
import styles from "./HeroArtwork.module.css";

export function HeroArtwork({ catalog = false }: { catalog?: boolean }) {
  return (
    <div
      className={`${styles.scene} ${catalog ? styles.catalog : ""}`}
      data-hero-art
    >
      <div className={styles.backdrop} aria-hidden="true" data-malaysia-layers>
        <Image
          className={styles.ribbon}
          src="/assets/illustrations/ui-v4/home-ribbon.svg"
          alt=""
          width={900}
          height={580}
          priority
          unoptimized
        />
        <Image
          className={styles.skyline}
          src="/assets/illustrations/ui-v4/kl-skyline.svg"
          alt=""
          width={320}
          height={320}
          priority
          unoptimized
        />
        <Image
          className={styles.emblem}
          src="/assets/illustrations/ui-v4/emblem.svg"
          alt=""
          width={172}
          height={121}
          priority
          unoptimized
        />
        <Image
          className={styles.arrow}
          src="/assets/illustrations/ui-v4/growth-arrow.svg"
          alt=""
          width={280}
          height={280}
          priority
          unoptimized
        />
      </div>
      <div className={styles.people} aria-hidden="true">
        <picture>
          <source
            media="(max-width:700px)"
            srcSet="/assets/illustrations/parity-v2/hero-trio-800.webp"
          />
          <Image
            src="/assets/illustrations/parity-v2/hero-trio-1400.webp"
            alt=""
            width={1400}
            height={811}
            priority
            sizes="(max-width:700px) 92vw, 54vw"
          />
        </picture>
        <Image
          className={styles.deviceOne}
          src="/assets/brand/siapsatu-symbol-v2.webp"
          alt=""
          width={160}
          height={155}
        />
        <Image
          className={styles.deviceTwo}
          src="/assets/brand/siapsatu-symbol-v2.webp"
          alt=""
          width={160}
          height={155}
        />
      </div>
      <p className={styles.handnote}>
        Ilmu
        <br />
        hari ini,
        <br />
        hasil esok.
        <span aria-hidden="true" />
      </p>
      <svg className={styles.sketch} viewBox="0 0 70 70" aria-hidden="true">
        <path
          d="m10 48 22-9M31 13l8 17M52 6l-2 20"
          fill="none"
          stroke="#ff5a0a"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
      {!catalog && (
        <p className={styles.practical}>
          MODUL
          <br />
          PRAKTIKAL
          <br />
          UNTUK
          <br />
          SEMUA<span aria-hidden="true">⌁</span>
        </p>
      )}
    </div>
  );
}
