import Image from "next/image";
import styles from "./BrandScene.module.css";

/** Decorative brand art. Typography and diagrams are always separate DOM content. */
export function BrandScene({
  variant = "trio",
  className = "",
}: {
  variant?: "trio" | "learner" | "hermes" | "ribbon" | "directory";
  className?: string;
}) {
  const star = Array.from({ length: 28 }, (_, i) => {
    const a = (i * Math.PI) / 14 - Math.PI / 2,
      r = i % 2 ? 26 : 58;
    return `${430 + Math.cos(a) * r},${96 + Math.sin(a) * r}`;
  }).join(" ");
  return (
    <div
      className={`${styles.scene} ${styles[variant === "ribbon" ? "ribbonOnly" : variant]} ${className}`}
      aria-hidden="true"
      data-hero-art
    >
      <svg
        className={styles.ribbon}
        viewBox="0 0 800 480"
        preserveAspectRatio="none"
      >
        <path
          fill="#dbeaff"
          d="M0 480C30 190 190 140 330 125S650 35 800 80V480Z"
        />
        <path
          fill="#062457"
          d="M120 480C130 200 220 85 400 35L510 0H800V480Z"
        />
        <path
          d="M120 420C260 210 480 340 600 170S690 20 800 -40"
          fill="none"
          stroke="#fff"
          strokeWidth="100"
        />
        <path
          d="M120 420C260 210 480 340 600 170S690 20 800 -40"
          fill="none"
          stroke="#ff2445"
          strokeWidth="46"
        />
        <path
          d="M150 470C350 300 500 390 660 260S720 170 820 160"
          fill="none"
          stroke="#fff"
          strokeWidth="37"
        />
        <path
          d="M150 470C350 300 500 390 660 260S720 170 820 160"
          fill="none"
          stroke="#ff2445"
          strokeWidth="16"
        />

        <path
          d="M458 420l80-84 60 24 115-137"
          fill="none"
          stroke="#08bd59"
          strokeWidth="25"
          strokeLinejoin="round"
        />
        <path
          d="M665 220l69-17-7 72"
          fill="#08bd59"
          stroke="#08bd59"
          strokeWidth="18"
          strokeLinejoin="round"
        />
        {variant === "trio" && (
          <g fill="#0b3474" stroke="#ffd12a" strokeWidth="2">
            <path fill="#ffd12a" d="M640 480V355a85 85 0 0 1 170 0v125Z" />
            <path d="M660 480V350h9v-32h8v-22h4v22h8v32h9v130m10 0V350h9v-32h8v-22h4v22h8v32h9v130" />
            <path d="M676 389h52v9h-52zM765 480V371h7v-12h-7l-8-9h23l-8-9v-32h-3v32l-8 9 8 9v121zM631 480v-62h18v62m102 0v-45h14v45m29 0v-73h16v73" />
          </g>
        )}
      </svg>
      <svg
        className={styles.emblem}
        viewBox="320 20 180 150"
        aria-hidden="true"
      >
        <path fill="#ffd12a" d="M394 38a62 62 0 1 0 0 116a53 53 0 1 1 0-116" />
        <polygon points={star} fill="#ffd12a" />
      </svg>
      {variant !== "ribbon" && (
        <Image
          src={`/assets/illustrations/${variant === "trio" ? "learners-clean" : variant === "hermes" ? "hermes-clean" : "learner-clean"}.png`}
          alt=""
          width={variant === "learner" || variant === "directory" ? 1024 : 1505}
          height={
            variant === "learner" || variant === "directory" ? 1536 : 1045
          }
          className={styles.people}
          priority
        />
      )}
    </div>
  );
}
