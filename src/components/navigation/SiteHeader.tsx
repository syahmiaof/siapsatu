"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Search, Menu } from "lucide-react";
import { DesktopMegaMenu } from "./DesktopMegaMenu";
import { MobileMenuSheet } from "./MobileMenuSheet";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobile = useCallback(() => setIsMobileMenuOpen(false), []);
  const closeMega = useCallback(() => setIsMegaMenuOpen(false), []);

  const isModulActive = pathname.startsWith("/modules");
  const isToolsActive = pathname.startsWith("/tools");
  const isLaluanActive = pathname.startsWith("/paths");
  const isKomunitiActive = pathname.startsWith("/community");

  if (pathname.startsWith("/learn/")) return null;

  return (
    <header className={styles.header}>
      {isMegaMenuOpen && <div className={styles.menuScrim} onClick={closeMega} aria-hidden="true" />}
      <div className={`container ${styles.inner}`}>
        <div className={styles.leftBrand}>
          <Link href="/" className={styles.logoLink} aria-label="SiapSatu Home">
            <Image
              src="/assets/brand/siapsatu-display.png"
              alt="SiapSatu — Satu modul. Satu hasil."
              width={1611}
              height={455}
              priority
              className={styles.logo}
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Navigasi Utama">
            {/* Mega menu trigger */}
            <div
              className={styles.navItemContainer}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                type="button"
                className={`${styles.navLink} ${
                  isModulActive || isMegaMenuOpen ? styles.active : ""
                }`}
                onClick={() => setIsMegaMenuOpen(true)}
                onKeyDown={(event)=>{
                  if(event.key==='ArrowDown'){
                    event.preventDefault();setIsMegaMenuOpen(true);
                    const parent=event.currentTarget.parentElement;
                    requestAnimationFrame(()=>parent?.querySelector<HTMLAnchorElement>('[role="menu"] a')?.focus());
                  }
                }}
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="menu"
              >
                <span>Modul</span>
                <ChevronDown
                  size={16}
                  className={`${styles.chevronIcon} ${
                    isMegaMenuOpen ? styles.chevronOpen : ""
                  }`}
                />
              </button>
              <DesktopMegaMenu isOpen={isMegaMenuOpen} onClose={closeMega} />
            </div>

            <Link
              href="/tools"
              className={`${styles.navLink} ${isToolsActive ? styles.active : ""}`}
            >
              Tools
            </Link>

            <Link
              href="/paths/ai-automation"
              className={`${styles.navLink} ${isLaluanActive ? styles.active : ""}`}
            >
              Laluan
            </Link>

            <Link
              href="/community"
              className={`${styles.navLink} ${isKomunitiActive ? styles.active : ""}`}
            >
              Komuniti
            </Link>
          </nav>
        </div>

        <div className={styles.rightActions}>
          <PrimaryButton href="/login" variant="navy" size="sm">
            Login
          </PrimaryButton>
        </div>

        {/* Mobile quick controls */}
        <div className={styles.mobileControls}>
          <Link
            href="/modules"
            className={styles.mobileIconBtn}
            aria-label="Cari modul"
          >
            <Search size={20} />
          </Link>
          <button
            type="button"
            className={styles.mobileIconBtn}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Buka menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <MobileMenuSheet isOpen={isMobileMenuOpen} onClose={closeMobile} />
    </header>
  );
}
