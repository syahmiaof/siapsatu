import React from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Tool } from "@/types";
import { MODULES } from "@/data/mockData";
import { ToolLogoTile } from "./ToolLogoTile";
import styles from "./ToolCard.module.css";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export function ToolCard({ tool, className = "" }: ToolCardProps) {
  // Direct routes for specific featured hubs
  const href =
    tool.slug === "n8n"
      ? "/tools/n8n"
      : tool.slug === "hermes-agent"
        ? "/tools/hermes-agent"
        : `/modules?search=${encodeURIComponent(tool.name)}`;

  return (
    <Link
      href={href}
      className={`${styles.card} ${className}`}
      data-reveal-item
      data-tool={tool.slug}
    >
      <div className={styles.leftInfo}>
        <ToolLogoTile
          name={tool.name}
          logoPath={tool.logoPath}
          brandColor={tool.brandColor}
          size="md"
        />

        <div className={styles.details}>
          <h3 className={styles.name}>{tool.name}</h3>

          <div className={styles.badgeRow}>
            <span
              className={`${styles.categoryPill} ${
                styles[`cat-${tool.category}`] || ""
              }`}
            >
              {
                {
                  ai: "AI",
                  automation: "Automation",
                  coding: "Coding",
                  design: "Design",
                  productivity: "Productivity",
                }[tool.category]
              }
            </span>
          </div>

          <div className={styles.countRow}>
            <FileText size={13} />
            <span>
              {MODULES.filter((m) => m.toolSlugs.includes(tool.slug)).length}{" "}
              modul
            </span>
          </div>
        </div>
      </div>

      <div className={styles.arrowBtn} aria-hidden="true">
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}
