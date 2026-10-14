import Image from "next/image";
import { ArrowRight, FileText, FileSpreadsheet, Play } from "lucide-react";
import styles from "./WorkflowDiagram.module.css";

export function WorkflowDiagram({
  setup = false,
  compact = false,
}: {
  setup?: boolean;
  compact?: boolean;
}) {
  return (
    <figure
      className={`${styles.browser} ${compact ? styles.compact : ""}`}
      aria-label={
        setup
          ? "Contoh workflow: Manual Trigger ke Edit Fields"
          : "Aliran contoh: borang ke n8n ke Google Sheets"
      }
    >
      <figcaption className={styles.bar}>
        <span aria-hidden="true">● ● ●</span>{" "}
        {setup
          ? "Workflow pertama · contoh visual"
          : "Lead → spreadsheet · contoh visual"}
      </figcaption>
      <div className={styles.flow}>
        <div className={styles.node}>
          <div className={styles.icon} style={{ color: "#7150db" }}>
            {setup ? <Play /> : <FileText />}
          </div>
          <strong>{setup ? "Manual Trigger" : "Borang"}</strong>
          <small>{setup ? "Mula ujian" : "Data masuk"}</small>
        </div>
        <ArrowRight className={styles.arrow} />
        <div className={styles.node}>
          <div className={styles.icon}>
            <Image src="/assets/tools/n8n.png" alt="" width={60} height={60} />
          </div>
          <strong>n8n</strong>
          <small>{setup ? "Edit Fields" : "Susun data"}</small>
        </div>
        {!setup && (
          <>
            <ArrowRight className={styles.arrow} />
            <div className={styles.node}>
              <div className={styles.icon} style={{ color: "#057a44" }}>
                <FileSpreadsheet />
              </div>
              <strong>Google Sheets</strong>
              <small>Simpan baris</small>
            </div>
          </>
        )}
      </div>
    </figure>
  );
}
