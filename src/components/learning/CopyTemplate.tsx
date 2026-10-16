"use client";
import React, { useState, useEffect, useRef } from "react";
import { Copy, Check, FileCode } from "lucide-react";
import styles from "./CopyTemplate.module.css";
export function CopyTemplate({
  code,
  title = "Template untuk disalin",
}: {
  code: string;
  title?: string;
  language?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    setStatus("idle");
    clearTimeout(timer.current);
  }, [code]);
  async function copy() {
    clearTimeout(timer.current);
    const previous = document.activeElement as HTMLElement | null;
    try {
      if (navigator.clipboard && window.isSecureContext)
        await navigator.clipboard.writeText(code);
      else {
        const area = document.createElement("textarea");
        area.value = code;
        area.style.cssText = "position:fixed;left:-9999px";
        document.body.append(area);
        try {
          area.select();
          if (!document.execCommand("copy"))
            throw new Error("Copy unavailable");
        } finally {
          area.remove();
          previous?.focus();
        }
      }
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <FileCode size={18} />
          <span>{title}</span>
        </div>
        <button
          type="button"
          onClick={copy}
          className={`${styles.copyBtn} ${status === "copied" ? styles.copied : ""}`}
          aria-label={
            status === "copied"
              ? "Telah disalin ke papan klip"
              : "Salin template"
          }
        >
          {status === "copied" ? <Check size={14} /> : <Copy size={14} />}
          <span>{status === "copied" ? "Disalin!" : "Salin template"}</span>
        </button>
      </div>
      <pre className={styles.codeArea} tabIndex={0}>
        <code>{code}</code>
      </pre>
      <p
        role="status"
        className={status === "error" ? "prototype-note" : "sr-only"}
      >
        {status === "error"
          ? "Salinan automatik gagal. Pilih teks template dan salin secara manual."
          : status === "copied"
            ? "Template telah disalin."
            : ""}
      </p>
    </div>
  );
}
