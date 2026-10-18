"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Zap,
  Box,
  Briefcase,
  GraduationCap,
  ChevronRight,
  ArrowRight,
  Settings,
} from "lucide-react";
import styles from "./DesktopMegaMenu.module.css";

interface DesktopMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DesktopMegaMenu({ isOpen, onClose }: DesktopMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        menuRef.current?.parentElement?.querySelector('button')?.focus();
        onClose();
      }
      if (menuRef.current?.contains(document.activeElement) && ['ArrowDown','ArrowUp','Home','End'].includes(e.key)) {
        const links=Array.from(menuRef.current.querySelectorAll<HTMLAnchorElement>('a'));
        const current=links.indexOf(document.activeElement as HTMLAnchorElement);
        const next=e.key==='Home'?0:e.key==='End'?links.length-1:(current+(e.key==='ArrowDown'?1:-1)+links.length)%links.length;
        e.preventDefault();links[next]?.focus();
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={styles.menuOverlay}
      role="menu"
      aria-label="Koleksi Modul"
    >
      <div className={styles.topColumns}>
        {/* Column 1: Nak capai apa? */}
        <div className={styles.column}>
          <div className={styles.columnTitle}>Nak capai apa?</div>
          <Link
            href="/modules?goal=jual"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <div className={styles.iconWrap} style={{ color: "#ff2445" }}>
                <TrendingUp size={20} />
              </div>
              <span>Jual lebih jelas</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
          <Link
            href="/modules?goal=kerja"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <div className={styles.iconWrap} style={{ color: "#ff5a0a" }}>
                <Zap size={20} />
              </div>
              <span>Kerja lebih laju</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
          <Link
            href="/modules?goal=bina"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <div className={styles.iconWrap} style={{ color: "#08bd59" }}>
                <Box size={20} />
              </div>
              <span>Bina & deploy</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
        </div>

        {/* Column 2: Untuk siapa? */}
        <div className={styles.column}>
          <div className={styles.columnTitle}>Untuk siapa?</div>
          <Link
            href="/modules?category=bisnes"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <div className={styles.iconWrap} style={{ color: "#062457" }}>
                <Briefcase size={20} />
              </div>
              <span>Owner bisnes</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
          <Link
            href="/modules?category=student"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <div className={styles.iconWrap} style={{ color: "#062457" }}>
                <GraduationCap size={20} />
              </div>
              <span>Student</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
          <Link
            href="/modules?category=ai-tools"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <div className={styles.iconWrap} style={{ color: "#062457" }}>
                <GraduationCap size={20} />
              </div>
              <span>Beginner AI</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
        </div>

        {/* Column 3: Tool popular */}
        <div className={styles.column}>
          <div className={styles.columnTitle}>Tool popular</div>
          <Link
            href="/tools?search=Gemini"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <Image
                src="/assets/tools/gemini-google-v2.png"
                alt="Gemini"
                width={18}
                height={18}
              />
              <span>Gemini</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
          <Link
            href="/tools?search=GitHub"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <Image
                src="/assets/tools/github.svg"
                alt="GitHub"
                width={18}
                height={18}
              />
              <span>GitHub</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
          <Link
            href="/tools?search=Codex"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <Image
                src="/assets/tools/codex.svg"
                alt="Codex"
                width={18}
                height={18}
              />
              <span>Codex</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
          <Link
            href="/modules/meta-ads-ai"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <Image
                src="/assets/tools/meta.svg"
                alt="Meta Ads"
                width={18}
                height={18}
              />
              <span>Meta Ads</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
          <Link
            href="/tools/n8n"
            onClick={onClose}
            className={styles.menuItem}
          >
            <div className={styles.itemLeft}>
              <div className={styles.iconWrap} style={{ color: "#ea4b71" }}>
                <Settings size={18} />
              </div>
              <span>Automation (n8n)</span>
            </div>
            <ChevronRight className={styles.chevron} size={16} />
          </Link>
        </div>
      </div>

      {/* Bottom Spotlight Banner */}
      <div className={styles.spotlightBanner}>
        <div className={styles.spotlightLeft}>
          <div className={styles.spotlightLogo}>
            <Image
              src="/assets/tools/gemini-google-v2.png"
              alt="Gemini"
              width={22}
              height={22}
            />
          </div>
          <span className={styles.spotlightText}>
            Mula dengan satu hasil — Siapkan slide yang jelas
          </span>
        </div>
        <Link
          href="/modules/gemini-slide-assignment"
          onClick={onClose}
          className={styles.spotlightBtn}
        >
          <span>Lihat modul</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
