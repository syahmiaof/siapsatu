import Image from "next/image";
import { ArrowRight, FileSpreadsheet, Play } from "lucide-react";
import styles from "./ReaderArtwork.module.css";

export function ReaderArtwork({ setup }: { setup: boolean }) {
  return (
    <div className={styles.scene} aria-hidden="true">
      <svg
        className={styles.ribbon}
        viewBox="0 0 500 280"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80Q170-30 370 20T500 140V280H130Q20 250 0 80"
          fill="#93c8ff"
        />
        <path
          d="M-25 111Q111-8 280 112T520 180"
          fill="none"
          stroke="#ffc840"
          strokeWidth="58"
        />
        <path
          d="M0 200Q171 95 301 226T510 260"
          fill="none"
          stroke="#056be7"
          strokeWidth="54"
        />
      </svg>
      <div className={styles.portrait}>
        <Image
          src="/assets/illustrations/parity-v2/portrait-male-500.webp"
          alt=""
          width={500}
          height={739}
          sizes="220px"
        />
        <Image
          className={styles.mark}
          src="/assets/brand/siapsatu-symbol-v2.webp"
          alt=""
          width={160}
          height={155}
        />
      </div>
      <div className={styles.tools}>
        <span className={styles.tile}>
          <Image src="/assets/tools/n8n.png" alt="" width={92} height={92} />
        </span>
        <ArrowRight size={35} />
        <span className={styles.tile}>
          {setup ? (
            <Play size={58} fill="#08bd59" />
          ) : (
            <FileSpreadsheet size={60} color="#057a44" />
          )}
        </span>
      </div>
      <svg className={styles.sketch} viewBox="0 0 60 50">
        <path
          d="m10 35 15 5m2-30 7 19m13-22-2 17"
          fill="none"
          stroke="#ff5a0a"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
