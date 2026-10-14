import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./PrimaryButton.module.css";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "navy" | "green";
  size?: "default" | "sm";
  showArrow?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

export function PrimaryButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "default",
  showArrow = true,
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
  style,
}: PrimaryButtonProps) {
  const buttonClasses = `${styles.button} ${styles[variant]} ${
    size === "sm" ? styles.sm : ""
  } ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowRight className={styles.arrowIcon} size={size === "sm" ? 16 : 19} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses} aria-label={ariaLabel} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      aria-label={ariaLabel}
      style={style}
    >
      {content}
    </button>
  );
}
