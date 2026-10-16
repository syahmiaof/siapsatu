"use client";

import { useDirectoryFilters } from "@/lib/useDirectoryFilters";
import React, { useMemo, Suspense } from "react";
import { DirectoryArtwork } from "@/components/brand/DirectoryArtwork";
import {
  Search,
  Bot,
  Settings,
  Code,
  Palette,
  CheckSquare,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RevealSection } from "@/components/motion/RevealSection";
import { ToolCard } from "@/components/tools/ToolCard";
import { EmptyState } from "@/components/modules/EmptyState";
import { directoryTools } from "@/lib/catalog";
import styles from "./tools.module.css";

export default function ToolsDirectoryPage() {
  return (
    <Suspense>
      <DirectoryContent />
    </Suspense>
  );
}

function DirectoryContent() {
  const {
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
  } = useDirectoryFilters();

  const categories = [
    { id: "semua", label: "Semua", icon: null },
    { id: "ai", label: "AI Assistant", icon: Bot },
    { id: "automation", label: "Automation", icon: Settings },
    { id: "coding", label: "Coding", icon: Code },
    { id: "design", label: "Design", icon: Palette },
    { id: "productivity", label: "Productivity", icon: CheckSquare },
  ];

  const filteredTools = useMemo(() => {
    return directoryTools.filter((tool) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        tool.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        tool.summary.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.trim().toLowerCase());

      const matchesCat =
        selectedCategory === "semua" || tool.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={`container ${styles.directory}`}>
      {/* Hero Banner */}
      <section className={styles.pageHeader} aria-label="Direktori Tools">
        <div className={styles.heroBanner}>
          <div className={styles.heroLeft}>
            <AnimatedHeading
              steadyEntrance
              text="Belajar tool yang orang tengah guna."
              breakAfter={3}
              accentFrom={3}
              as="h1"
              className={styles.headline}
            />
            <p className={styles.subtitle}>
              Kenal fungsi, ikut modul, terus hasilkan sesuatu.
            </p>
          </div>

          <div className={styles.heroRight}>
            <DirectoryArtwork />
          </div>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search size={18} color="var(--ss-muted)" />
          <input
            type="text"
            placeholder="Cari tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Cari tool"
          />
        </div>

        <div
          className={styles.filterChips}
          role="group"
          aria-label="Tapis mengikut kategori"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`${styles.chip} ${isActive ? styles.activeChip : ""}`}
                aria-pressed={isActive}
              >
                {Icon && <Icon size={16} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools 4x4 Grid */}
      {filteredTools.length === 0 ? (
        <EmptyState
          title="Tiada tool dijumpai"
          description={`Tiada tool yang sepadan dengan "${searchQuery}". Cuba cari kata kunci lain seperti "n8n", "AI", atau "Figma".`}
          onAction={resetFilters}
        />
      ) : (
        <RevealSection className={styles.toolsGrid}>
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </RevealSection>
      )}
    </div>
  );
}
