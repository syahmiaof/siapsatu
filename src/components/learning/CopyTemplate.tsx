"use client";

import React, { useState } from "react";
import { Copy, Check, FileCode } from "lucide-react";
import styles from "./CopyTemplate.module.css";

interface CopyTemplateProps {
  code: string;
  title?: string;
  language?: string;
}

export function CopyTemplate({
  code,
  title = "Template untuk disalin",
  language = "json",
}: CopyTemplateProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <FileCode size={18} color="var(--ss-orange)" />
          <span>{title}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
          aria-label={copied ? "Telah disalin ke papan klip" : "Salin template"}
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Disalin!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Salin template</span>
            </>
          )}
        </button>
      </div>

      <pre className={styles.codeArea}>
        <code>{code}</code>
      </pre>

      {/* Accessible live region */}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Template telah berjaya disalin ke papan klip anda." : ""}
      </span>
    </div>
  );
}
