import Image from "next/image";
import { ArrowRight, Code2, Globe, Mail, Workflow } from "lucide-react";
import styles from "./DemoThumbnail.module.css";

/** Illustrative examples, deliberately not represented as real student submissions. */
export function DemoThumbnail({ postId }: { postId: string }) {
  if (postId === "post-1")
    return (
      <figure
        className={`${styles.thumb} ${styles.digest}`}
        aria-label="Ilustrasi contoh tools digest"
      >
        <div className={styles.toolMarks}>
          <Image
            src="/assets/tools/gemini-google-v2.png"
            width={28}
            height={28}
            alt=""
          />
          <Image src="/assets/tools/n8n.png" width={28} height={28} alt="" />
          <Code2 size={25} />
        </div>
        <Image
          className={styles.learner}
          src="/assets/illustrations/ui-v3/path-learner-600.webp"
          alt=""
          width={600}
          height={404}
          sizes="170px"
        />
        <figcaption>Ilustrasi contoh</figcaption>
      </figure>
    );
  if (postId === "post-2")
    return (
      <figure
        className={`${styles.thumb} ${styles.portfolio}`}
        aria-label="Contoh rekaan portfolio"
      >
        <div className={styles.browserDots}>● ● ●</div>
        <strong>My Portfolio</strong>
        <span>Design · Code · Build</span>
        <div className={styles.projectTiles}>
          <i />
          <i />
          <i />
        </div>
        <figcaption>Rekaan demo</figcaption>
      </figure>
    );
  if (postId === "post-3")
    return (
      <figure
        className={`${styles.thumb} ${styles.workflow}`}
        aria-label="Diagram workflow contoh"
      >
        <div className={styles.nodes}>
          <Globe />
          <ArrowRight size={14} />
          <Workflow />
          <ArrowRight size={14} />
          <Mail />
        </div>
        <span>Trigger → Proses → Hantar</span>
        <figcaption>Diagram contoh</figcaption>
      </figure>
    );
  return null;
}
