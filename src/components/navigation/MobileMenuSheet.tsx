"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDialogFocus } from "@/lib/useDialogFocus";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, ChevronRight } from "lucide-react";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import styles from "./MobileMenuSheet.module.css";

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuSheet({ isOpen, onClose }: MobileMenuSheetProps) {
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useDialogFocus(isOpen && mounted, sheetRef, onClose);

  if (!isOpen || !mounted) return null;

  const navLinks = [
    { label: "Utama", href: "/" },
    { label: "Modul", href: "/modules" },
    { label: "Tools", href: "/tools" },
    { label: "Laluan", href: "/paths/ai-automation" },
    { label: "Pustaka Saya", href: "/library" },
    { label: "Peta Hasil", href: "/progress" },
    { label: "Komuniti", href: "/community" },
  ];

  return createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div
        ref={sheetRef}
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        <div className={styles.header}>
          <Image
            src="/assets/brand/siapsatu-display.png"
            alt="SiapSatu"
            width={190}
            height={54}
            style={{ objectFit: "contain" }}
          />
          <button
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.links}>
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`${styles.linkItem} ${isActive ? styles.active : ""}`}
              >
                <span>{item.label}</span>
                <ChevronRight size={18} />
              </Link>
            );
          })}
        </nav>

        <div className={styles.bottomAction}>
          <PrimaryButton
            href="/login"
            onClick={onClose}
            variant="navy"
            className="w-full"
          >
            Masuk ke akaun
          </PrimaryButton>
        </div>
      </div>
    </>,
    document.body,
  );
}
