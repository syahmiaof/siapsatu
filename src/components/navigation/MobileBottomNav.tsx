"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Share2, User } from "lucide-react";
import styles from "./MobileBottomNav.module.css";

export function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on lesson reader to preserve full screen height for reading
  if (pathname.startsWith("/learn/")) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/", icon: Home, exact: true },
    { label: "Modul", href: "/modules", icon: BookOpen },
    { label: "Tools", href: "/tools", icon: Share2 },
    { label: "Profil", href: "/library", icon: User },
  ];

  return (
    <nav
      className={styles.bottomNav}
      aria-label="Navigasi Bawah"
      data-fixed-dock
    >
      <div className={styles.inner}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
              {isActive && <span className={styles.activeDot} />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
