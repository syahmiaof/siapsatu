import React from "react";
import { SearchX } from "lucide-react";
import { PrimaryButton } from "@/components/brand/PrimaryButton";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = "Tiada hasil dijumpai",
  description = "Cuba cari menggunakan kata kunci yang berbeza atau pilih kategori lain.",
  actionText = "Reset carian",
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3.5rem 1.5rem",
        textAlign: "center",
        background: "#ffffff",
        border: "1.5px dashed var(--ss-line)",
        borderRadius: "var(--ss-radius-lg)",
        margin: "2rem 0",
      }}
      className={className}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--ss-surface-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ss-muted)",
          marginBottom: "1rem",
        }}
      >
        <SearchX size={28} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display, inherit)",
          fontSize: "1.3rem",
          fontWeight: 800,
          color: "var(--ss-navy-950)",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "var(--ss-muted)",
          maxWidth: "420px",
          lineHeight: 1.5,
          marginBottom: "1.5rem",
        }}
      >
        {description}
      </p>
      {onAction && (
        <PrimaryButton variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </PrimaryButton>
      )}
    </div>
  );
}
