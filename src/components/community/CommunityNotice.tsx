import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./CommunityNotice.module.css";

interface CommunityNoticeProps {
  className?: string;
}

export function CommunityNotice({ className = "" }: CommunityNoticeProps) {
  return (
    <div className={`${styles.banner} ${className}`}>
      {/* Left Navy Box with characters art and heading */}
      <div className={styles.navyBox}>
        <div className={styles.learnersArt}>
          <Image
            src="/assets/illustrations/community-learners.png"
            alt="Komuniti pelajar SiapSatu saling berdiskusi"
            width={240}
            height={110}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className={styles.headingText}>
          <div>Belajar seorang,</div>
          <div className={styles.orangeWord}>support ramai.</div>
        </div>
      </div>

      {/* Right WhatsApp Community Box */}
      <div className={styles.whatsappBox}>
        <a
          href="https://chat.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >
          <Image
            src="/assets/tools/whatsapp.svg"
            alt="WhatsApp"
            width={22}
            height={22}
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span>WhatsApp Community</span>
          <ArrowRight size={18} />
        </a>

        <div className={styles.avatarStrip}>
          <div className={styles.avatarsGroup}>
            <Image
              src="/assets/avatars/avatar-admin.png"
              alt="Admin"
              width={32}
              height={32}
              className={styles.avatarImg}
            />
            <Image
              src="/assets/avatars/avatar-ammar.png"
              alt="Ammar"
              width={32}
              height={32}
              className={styles.avatarImg}
            />
            <Image
              src="/assets/avatars/avatar-siti.png"
              alt="Siti"
              width={32}
              height={32}
              className={styles.avatarImg}
            />
          </div>
          <span className={styles.subtext}>
            Komuniti praktikal saling bantu setiap hari.
          </span>
        </div>
      </div>
    </div>
  );
}
