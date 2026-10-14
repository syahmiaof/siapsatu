import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Megaphone, BarChart3, Edit3, Palette, Clock, CheckCircle2 } from "lucide-react";
import { Module } from "@/types";
import styles from "./ModuleCard.module.css";

interface ModuleCardProps {
  module: Module;
  variant?: "featured" | "compact";
  iconPath?: string;
  className?: string;
}

export function ModuleCard({
  module,
  variant = "compact",
  iconPath,
  className = "",
}: ModuleCardProps) {
  // Determine tool icon
  const resolvedIcon =
    iconPath ||
    (module.toolSlugs.includes("meta")
      ? "/assets/tools/meta.svg"
      : module.toolSlugs.includes("gemini")
      ? "/assets/tools/gemini.svg"
      : module.toolSlugs.includes("vibecode")
      ? "/assets/tools/vibecode.svg"
      : module.toolSlugs.includes("n8n")
      ? "/assets/tools/n8n.png"
      : module.toolSlugs.includes("whatsapp")
      ? "/assets/tools/whatsapp.svg"
      : module.toolSlugs.includes("notion")
      ? "/assets/tools/notion.svg"
      : module.toolSlugs.includes("notebooklm")
      ? "/assets/tools/notebooklm.svg"
      : module.toolSlugs.includes("github")
      ? "/assets/tools/github.svg"
      : module.toolSlugs.includes("codex")
      ? "/assets/tools/codex.svg"
      : module.toolSlugs.includes("antigravity")
      ? "/assets/tools/antigravity.svg"
      : "/assets/tools/gemini.svg");

  const href = `/modules/${module.slug}`;

  if (variant === "featured") {
    const themeClass =
      module.themeColor === "crimson"
        ? styles["theme-crimson"]
        : module.themeColor === "green"
        ? styles["theme-green"]
        : styles["theme-navy"];

    return (
      <Link
        href={href}
        className={`${styles.featuredCard} ${themeClass} ${className}`}
        data-reveal-item
      >
        <div>
          <div className={styles.featuredTop}>
            <div className={styles.featuredIconSquare}>
              <Image
                src={resolvedIcon}
                alt={module.title}
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.featuredHeaderContent}>
              <h3 className={styles.featuredTitle}>{module.title}</h3>
              <p className={styles.featuredDesc}>{module.shortOutcome}</p>
            </div>
          </div>

          <div className={styles.featuredTags}>
            {module.tags.map((tag) => (
              <span key={tag} className={styles.tagPill}>
                {tag === "Strategi" && <BarChart3 size={13} />}
                {tag === "Iklan" && <Megaphone size={13} />}
                {tag === "AI" && <Sparkles size={13} />}
                {tag === "Tulis" && <Edit3 size={13} />}
                {tag === "Reka" && <Palette size={13} />}
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.featuredBottom}>
          <div className={styles.priceTag}>RM{module.priceMyr}</div>
          <div className={styles.circleArrowBtn} aria-hidden="true">
            <ArrowRight size={22} />
          </div>
        </div>
      </Link>
    );
  }

  // Compact card
  return (
    <Link
      href={href}
      className={`${styles.compactCard} ${className}`}
      data-reveal-item
    >
      <div>
        <div
          className={styles.compactIconSquare}
          style={{
            background: module.toolSlugs.includes("whatsapp")
              ? "rgba(37, 211, 102, 0.12)"
              : module.toolSlugs.includes("notion")
              ? "rgba(255, 90, 10, 0.12)"
              : module.toolSlugs.includes("notebooklm")
              ? "rgba(26, 115, 232, 0.12)"
              : module.toolSlugs.includes("github")
              ? "rgba(36, 41, 47, 0.12)"
              : module.toolSlugs.includes("codex")
              ? "rgba(16, 163, 127, 0.12)"
              : "rgba(3, 20, 58, 0.08)",
          }}
        >
          <Image
            src={resolvedIcon}
            alt={module.title}
            width={28}
            height={28}
            style={{ objectFit: "contain" }}
          />
        </div>

        <h3 className={styles.compactTitle}>{module.title}</h3>
        <p className={styles.compactDesc}>{module.shortOutcome}</p>

        {module.tags.length > 0 && (
          <span className={styles.compactTag}>{module.tags[0]}</span>
        )}
      </div>

      <div className={styles.compactBottom}>
        <div className={styles.compactPrice}>RM{module.priceMyr}</div>
        <div className={styles.compactArrowBtn} aria-hidden="true">
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
