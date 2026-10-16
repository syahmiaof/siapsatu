import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, UsersRound } from "lucide-react";
import styles from "./CommunityNotice.module.css";
export function CommunityNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.banner} ${className}`}>
      <div className={styles.navyBox}>
        <svg
          className={styles.ribbon}
          viewBox="0 0 900 180"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M-50 85C220 120 480 195 960 115"
            fill="none"
            stroke="white"
            strokeWidth="22"
          />
          <path
            d="M-50 109C220 144 480 219 960 139"
            fill="none"
            stroke="#d72837"
            strokeWidth="15"
          />
        </svg>
        <picture className={styles.learnersArt}>
          <source
            media="(max-width:700px)"
            srcSet="/assets/illustrations/parity-v2/discussion-650.webp"
          />
          <Image
            src="/assets/illustrations/parity-v2/discussion-1200.webp"
            alt=""
            width={1200}
            height={403}
            sizes="(max-width:900px) 60vw, 36vw"
          />
        </picture>
        <div className={styles.headingText}>
          Belajar seorang,
          <br />
          <span className={styles.orangeWord}>support ramai.</span>
        </div>
      </div>
      <div className={styles.whatsappBox}>
        <Link href="/community" className={styles.whatsappBtn}>
          <span className={styles.whatsappIcon}>
            <Image
              src="/assets/tools/whatsapp.svg"
              alt=""
              width={40}
              height={40}
            />
          </span>
          <span>Ruang komuniti</span>
          <ArrowRight size={22} />
        </Link>
        <div className={styles.previewInfo}>
          <span className={styles.previewIcon} aria-hidden="true">
            <UsersRound size={26} />
          </span>
          <p className={styles.subtext}>
            Pratonton komuniti.
            <br />
            Jemputan WhatsApp belum dibuka.
          </p>
        </div>
      </div>
    </div>
  );
}
