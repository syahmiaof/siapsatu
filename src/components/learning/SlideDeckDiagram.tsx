import React from "react";
import {
  Image as ImageIcon,
  AlertTriangle,
  Lightbulb,
  ListOrdered,
  BarChart3,
  CheckSquare,
  CornerLeftUp,
  MoveRight,
} from "lucide-react";
import styles from "./SlideDeckDiagram.module.css";

interface SlideInfo {
  num: number;
  title: string;
  type: "image" | "list" | "warning" | "lightbulb" | "numbered" | "chart" | "check";
}

const SLIDES: SlideInfo[] = [
  { num: 1, title: "Tajuk & pengenalan", type: "image" },
  { num: 2, title: "Latar belakang", type: "list" },
  { num: 3, title: "Masalah / Cabaran", type: "warning" },
  { num: 4, title: "Penyelesaian dengan AI", type: "lightbulb" },
  { num: 5, title: "Proses / Cara kerja", type: "numbered" },
  { num: 6, title: "Hasil atau manfaat", type: "chart" },
  { num: 7, title: "Contoh penggunaan", type: "image" },
  { num: 8, title: "Kesimpulan & langkah seterusnya", type: "check" },
];

export function SlideDeckDiagram() {
  return (
    <div className={styles.container} aria-label="Contoh rangka 8 slide pembentangan">
      <div className={styles.titleWrap}>
        <span className={styles.title}>
          Contoh rangka 8 slide
          <span className={styles.titleUnderline} />
        </span>
      </div>

      <div className={styles.cardsScroll}>
        {SLIDES.map((slide) => (
          <div key={slide.num} className={styles.slideCard}>
            <span className={styles.cardNum}>{slide.num}</span>
            <span className={styles.cardTitle}>{slide.title}</span>

            <div className={styles.cardIllustration}>
              {slide.type === "image" && (
                <ImageIcon size={24} color="#94a3b8" />
              )}
              {slide.type === "list" && (
                <>
                  <div className={styles.lines} />
                  <div className={styles.lines} />
                  <div className={styles.linesShort} />
                </>
              )}
              {slide.type === "warning" && (
                <AlertTriangle size={24} color="var(--ss-red)" />
              )}
              {slide.type === "lightbulb" && (
                <Lightbulb size={24} color="#f59e0b" />
              )}
              {slide.type === "numbered" && (
                <ListOrdered size={24} color="#64748b" />
              )}
              {slide.type === "chart" && (
                <div className={styles.bars}>
                  <div className={styles.bar} style={{ height: "14px" }} />
                  <div className={styles.bar} style={{ height: "24px" }} />
                  <div className={styles.bar} style={{ height: "18px" }} />
                </div>
              )}
              {slide.type === "check" && (
                <CheckSquare size={22} color="var(--ss-green)" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.annotationsRow}>
        <div className={styles.annotationLeft}>
          <CornerLeftUp size={16} />
          <span>Setiap slide satu idea utama</span>
        </div>
        <div className={styles.annotationRight}>
          <span>Turutan yang logik dari awal hingga akhir</span>
          <MoveRight size={18} />
        </div>
      </div>
    </div>
  );
}
