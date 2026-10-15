import Image from "next/image";
import styles from "./BrandScene.module.css";

/** Decorative brand art. Typography and diagrams are always separate DOM content. */
export function BrandScene({
  variant = "trio",
  className = "",
}: {
  variant?: "trio" | "learner" | "hermes" | "ribbon";
  className?: string;
}) {
  if (variant === "trio") {
    return (
      <div
        className={`${styles.scene} ${styles.trioHero} ${className}`}
        aria-hidden="true"
        data-hero-art
      >
        <Image
          src="/assets/illustrations/hero-malaysia-utility.png"
          alt="SiapSatu — Belajar AI, tools & software"
          width={780}
          height={490}
          className={styles.trioArt}
          priority
        />
      </div>
    );
  }

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
        <path fill="#ffd12a" d="M394 38a62 62 0 1 0 0 116a53 53 0 1 1 0-116" />
        <polygon points={star} fill="#ffd12a" />
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
      </svg>
      {variant !== "ribbon" && (
        <Image
          src={`/assets/illustrations/${variant === "hermes" ? "hermes-clean" : "learner-clean"}.png`}
          alt=""
          width={variant === "learner" ? 1024 : 1505}
          height={variant === "learner" ? 1536 : 1045}
          className={styles.people}
          priority
        />
      )}
    </div>
  );
}
