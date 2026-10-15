import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./CommunityNotice.module.css";
export function CommunityNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.banner} ${className}`}>
      <div className={styles.navyBox}>
        <div className={styles.learnersArtWrap}>
          <Image
            src="/assets/illustrations/community-discussion.png"
            alt="Komuniti SiapSatu"
            width={429}
            height={124}
            className={styles.learnersArt}
            priority
          />
        </div>
        <div className={styles.headingText}>
          Belajar seorang,
          <br />
          <span className={styles.orangeWord}>support ramai.</span>
        </div>
      </div>
      <div className={styles.whatsappBox}>
        <Link href="/community" className={styles.whatsappCard}>
          <div className={styles.whatsappPill}>
            <Image
              src="/assets/tools/whatsapp.svg"
              alt="WhatsApp"
              width={24}
              height={24}
              className={styles.whatsappIcon}
            />
            <span className={styles.whatsappTitle}>WhatsApp Community</span>
            <ArrowRight size={17} className={styles.whatsappArrow} />
            <div className={styles.sunburstRays} aria-hidden="true">
              <span className={styles.ray} style={{ transform: "rotate(30deg)" }} />
              <span className={styles.ray} style={{ transform: "rotate(10deg)" }} />
              <span className={styles.ray} style={{ transform: "rotate(-10deg)" }} />
            </div>
          </div>
        </Link>
        <div className={styles.communityProof}>
          <div className={styles.avatarGroup}>
            <Image
              src="/assets/avatars/avatar-ammar.png"
              alt=""
              width={26}
              height={26}
              className={styles.avatar}
            />
            <Image
              src="/assets/avatars/avatar-siti.png"
              alt=""
              width={26}
              height={26}
              className={styles.avatar}
            />
            <Image
              src="/assets/avatars/avatar-user.png"
              alt=""
              width={26}
              height={26}
              className={styles.avatar}
            />
            <Image
              src="/assets/avatars/avatar-admin.png"
              alt=""
              width={26}
              height={26}
              className={styles.avatar}
            />
          </div>
          <span className={styles.proofText}>
            Ratusan learners saling bantu setiap hari.
          </span>
        </div>
      </div>
    </div>
  );
}
