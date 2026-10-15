import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./CommunityNotice.module.css";
export function CommunityNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.banner} ${className}`}>
      <div className={styles.navyBox}>
        <Image
          src="/assets/illustrations/learners-clean.png"
          alt=""
          width={1505}
          height={1045}
          className={styles.learnersArt}
        />
        <div className={styles.headingText}>
          Belajar seorang,
          <br />
          <span className={styles.orangeWord}>support ramai.</span>
        </div>
      </div>
      <div className={styles.whatsappBox}>
        <Link href="/community" className={styles.whatsappBtn}>
          <Image
            src="/assets/tools/whatsapp.svg"
            alt=""
            width={40}
            height={40}
          />
          <span>Ruang komuniti</span>
          <ArrowRight size={22} />
        </Link>
        <p className={styles.subtext}>
          Teroka contoh perkongsian. Komuniti dan jemputan WhatsApp belum
          dibuka.
        </p>
      </div>
    </div>
  );
}
