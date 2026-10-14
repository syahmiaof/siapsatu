import React from "react";
import Image from "next/image";
import styles from "./ToolLogoTile.module.css";

interface ToolLogoTileProps {
  name: string;
  logoPath: string;
  brandColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ToolLogoTile({
  name,
  logoPath,
  brandColor = "#062457",
  size = "md",
  className = "",
}: ToolLogoTileProps) {
  return (
    <div
      className={`${styles.tileWrapper} ${styles[`size-${size}`]} ${className}`}
    >
      <div
        className={styles.halo}
        style={{
          background: `radial-gradient(circle, ${brandColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className={styles.tile}>
        <Image
          src={logoPath}
          alt={`${name} logo`}
          width={size === "lg" ? 44 : size === "md" ? 32 : 24}
          height={size === "lg" ? 44 : size === "md" ? 32 : 24}
          className={styles.tileImage}
        />
      </div>
    </div>
  );
}
