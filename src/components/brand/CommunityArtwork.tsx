import Image from "next/image";
import styles from "./CommunityArtwork.module.css";

export function CommunityArtwork() {
  return (
    <div className={styles.scene} aria-hidden="true" data-hero-art>
      <Image
        className={styles.ribbon}
        src="/assets/illustrations/ui-v3/community-ribbon.svg"
        alt=""
        width={900}
        height={300}
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
        className={styles.city}
        src="/assets/illustrations/ui-v3/kl-skyline.svg"
        alt=""
        width={328}
        height={294}
        unoptimized
      />
      <Image
        className={styles.people}
        src="/assets/illustrations/parity-v2/discussion-1200.webp"
        alt=""
        width={1200}
        height={403}
        sizes="(max-width:600px) 100vw, 44vw"
        priority
      />
    </div>
  );
}
