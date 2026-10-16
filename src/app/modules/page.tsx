"use client";

import { useDirectoryFilters } from "@/lib/useDirectoryFilters";
import React, { useMemo, Suspense } from "react";
import { HeroArtwork } from "@/components/brand/HeroArtwork";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  LayoutGrid,
  Briefcase,
  Building,
  GraduationCap,
  Code,
  Sparkles,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RevealSection } from "@/components/motion/RevealSection";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { EmptyState } from "@/components/modules/EmptyState";
import { MODULES } from "@/data/mockData";
import styles from "./modules.module.css";

export default function ModulesCatalogPage() {
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
    selectedTool,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
  } = useDirectoryFilters();

  const categories = [
    { id: "semua", label: "Semua", icon: LayoutGrid },
    { id: "bisnes", label: "Bisnes", icon: Briefcase },
    { id: "kerja", label: "Kerja", icon: Building },
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "bina", label: "Bina & Deploy", icon: Code },
    { id: "ai-tools", label: "AI Tools", icon: Sparkles },
  ];

  const filteredModules = useMemo(() => {
    return MODULES.filter((m) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        m.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        !!m.discoveryTitle
          ?.toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        m.shortOutcome
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        m.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.trim().toLowerCase()),
        ) ||
        m.toolSlugs.some((t) =>
          t.toLowerCase().includes(searchQuery.trim().toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "semua" ||
        (selectedCategory === "bisnes" && m.audience?.includes("bisnes")) ||
        (selectedCategory === "kerja" && m.audience?.includes("kerja")) ||
        (selectedCategory === "student" && m.audience?.includes("student")) ||
        (selectedCategory === "bina" && m.audience?.includes("bina")) ||
        (selectedCategory === "ai-tools" &&
          (m.tags.includes("AI") ||
            m.tags.includes("AI Tools") ||
            m.tags.includes("AI / LLM")));

      return (
        matchesSearch &&
        matchesCategory &&
        (!selectedTool || m.toolSlugs.includes(selectedTool))
      );
    });
  }, [searchQuery, selectedCategory, selectedTool]);

  const featuredList = useMemo(() => {
    return filteredModules.filter((m) => m.featured);
  }, [filteredModules]);

  const regularList = useMemo(() => {
    return filteredModules.filter((m) => !m.featured);
  }, [filteredModules]);

  return (
    <div className="container" data-catalog>
      {/* Header & Search Hero */}
      <section className={styles.pageHeader} aria-label="Katalog Modul">
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <AnimatedHeading
              text="Pilih benda yang nak siap."
              mobileBreakAfter={2}
              accentWords={["yang", "nak", "siap."]}
              as="h1"
              className={styles.headline}
            />

            <p className={styles.subtitle}>Satu modul kecil, satu hasil yang boleh terus digunakan.</p>

            {/* Search Input */}
            <form
              className={styles.searchBox}
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <Search
                size={20}
                color="var(--ss-muted)"
                style={{ marginRight: "0.5rem" }}
              />
              <input
                type="text"
                placeholder="Cari modul atau tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Cari modul atau tool"
              />
              <button
                type="submit"
                className={styles.searchBtn}
                aria-label="Mulakan carian"
              >
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Category Filter Chips */}
            <div
              className={styles.filterBar}
              role="group"
              aria-label="Tapis kategori"
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`${styles.filterChip} ${
                      isActive ? styles.activeChip : ""
                    }`}
                    aria-pressed={isActive}
                  >
                    <Icon size={16} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroArtWrap}>
              <HeroArtwork catalog />
            </div>
          </div>
        </div>
      </section>

      {selectedTool && (
        <div className={styles.toolFilterNotice}>
          <span>
            Modul untuk {selectedTool} · {filteredModules.length} hasil tersedia
          </span>
          <button type="button" onClick={resetFilters}>
            Lihat semua modul
          </button>
        </div>
      )}
      {/* Main Content Area */}
      {filteredModules.length === 0 ? (
        <EmptyState
          title="Tiada modul yang sepadan"
          description={`Tiada modul dijumpai untuk carian "${searchQuery}". Cuba gunakan kata kunci lain.`}
          onAction={resetFilters}
        />
      ) : (
        <>
          {/* Section: Modul Pilihan */}
          {featuredList.length > 0 && (
            <section className={styles.sectionBlock} aria-label="Modul Pilihan">
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleGroup}>
                  <h2 className={styles.sectionTitle}>Modul Pilihan</h2>
                  <p className={styles.sectionDesc}>
                    Modul paling popular untuk mula belajar dan terus dapat hasil.
                  </p>
                </div>
                <Link
                  href={regularList.length ? "#modul-lainnya" : "/modules"}
                  className={styles.viewAllLink}
                >
                  <span>Lihat semua modul</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <RevealSection className={styles.featuredGrid}>
                {featuredList.map((m) => (
                  <ModuleCard
                    key={m.slug}
                    module={m}
                    variant="featured"
                    density="catalog"
                  />
                ))}
              </RevealSection>
            </section>
          )}

          {/* Section: Modul Lainnya */}
          {regularList.length > 0 && (
            <section
              id="modul-lainnya"
              className={styles.sectionBlock}
              aria-label="Modul Lainnya"
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleGroup}>
                  <h2 className={styles.sectionTitle}>Modul Lainnya</h2>
                  <p className={styles.sectionDesc}>
                    Pelbagai topik praktikal, setiap satu dengan hasil yang anda
                    boleh guna.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className={styles.viewAllLink}
                >
                  <span>Reset pilihan</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <RevealSection className={styles.compactGrid}>
                {regularList.map((m) => (
                  <ModuleCard
                    key={m.slug}
                    module={m}
                    variant="compact"
                    density="catalog"
                  />
                ))}
              </RevealSection>
            </section>
          )}
        </>
      )}
    </div>
  );
}
