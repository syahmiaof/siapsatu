import Image from "next/image";
import styles from "./DemoThumbnail.module.css";

interface DemoThumbnailProps {
  postId: string;
}

/**
 * Visual student project demo thumbnails matching approved mockup (ui-09-community-hub.png).
 * Clean, realistic previews with honest prototype figcaptions.
 */
export function DemoThumbnail({ postId }: DemoThumbnailProps) {
  if (postId === "post-1") {
    return (
      <figure
        className={`${styles.thumb} ${styles.digest}`}
        aria-label="Ilustrasi contoh tools digest"
      >
        <Image
          src="/assets/illustrations/community-digest-thumb.png"
          alt="Weekly Tools Digest: AI, No-code & Automation"
          width={256}
          height={115}
          className={styles.thumbImage}
          priority
        />
        <figcaption className={styles.caption}>Ilustrasi contoh</figcaption>
      </figure>
    );
  }

  if (postId === "post-2") {
    return (
      <figure
        className={`${styles.thumb} ${styles.portfolio}`}
        aria-label="Contoh rekaan portfolio"
      >
        <Image
          src="/assets/illustrations/community-portfolio-thumb.png"
          alt="Contoh rekaan portfolio website"
          width={226}
          height={124}
          className={styles.thumbImage}
        />
        <figcaption className={styles.caption}>Rekaan demo</figcaption>
      </figure>
    );
  }

  if (postId === "post-3") {
    return (
      <figure
        className={`${styles.thumb} ${styles.workflow}`}
        aria-label="Diagram workflow contoh"
      >
        <Image
          src="/assets/illustrations/community-workflow-thumb.png"
          alt="Diagram workflow n8n dengan ralat HTTP Request"
          width={260}
          height={101}
          className={styles.thumbImage}
        />
        <figcaption className={styles.caption}>Diagram contoh</figcaption>
      </figure>
    );
  }

  return null;
}
