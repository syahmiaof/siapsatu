import React from "react";
import { Check, Sheet, Mail, FileText, Activity } from "lucide-react";
import styles from "./OutcomePanel.module.css";

interface OutcomeItem {
  title: string;
  description: string;
  icon?: string;
}

interface OutcomePanelProps {
  title?: string;
  subtitle?: string;
  outcomes: OutcomeItem[];
  className?: string;
}

export function OutcomePanel({
  title = "Hasil akhir",
  subtitle = "Selepas lengkap semua modul, anda akan dapat:",
  outcomes,
  className = "",
}: OutcomePanelProps) {
  function renderIcon(name?: string) {
    switch (name) {
      case "sheet":
        return <Sheet size={20} />;
      case "mail":
        return <Mail size={20} />;
      case "file-text":
        return <FileText size={20} />;
      case "activity":
      default:
        return <Activity size={20} />;
    }
  }

  return (
    <div className={`${styles.panel} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      <div className={styles.list}>
        {outcomes.map((item, idx) => (
          <div key={idx} className={styles.item}>
            <div className={styles.checkIcon}>
              <Check size={14} strokeWidth={3} />
            </div>
            {item.icon && (
              <div className={styles.iconSquare}>{renderIcon(item.icon)}</div>
            )}
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.itemDesc}>{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
