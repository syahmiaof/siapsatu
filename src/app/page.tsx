import React from "react";
import { HeroArtwork } from "@/components/brand/HeroArtwork";
import Link from "next/link";
import { Briefcase, Building, GraduationCap } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RevealSection } from "@/components/motion/RevealSection";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { CommunityNotice } from "@/components/community/CommunityNotice";
import { MODULES } from "@/data/mockData";
import styles from "./page.module.css";

export default function HomePage() {
  const featuredModules = MODULES.filter((m) => m.featured);

  return (
    <div className="container" data-home>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Pengenalan SiapSatu">
        <div className={styles.heroGrid}>
          {/* Left Column: Heading, Subtitle, CTA, Audience Chips */}
          <div className={styles.heroLeft}>
            <div className={styles.headlineWrap}>
              <AnimatedHeading
                text="Satu modul. Satu hasil."
                breakAfter={2}
                accentFrom={2}
                as="h1"
                className={styles.heroHeadline}
              />
            </div>

            <p className={styles.subtitle}>
              Belajar AI, tools & software tanpa pening kepala.
            </p>

            <div className={styles.ctaContainer}>
              <PrimaryButton href="/modules" variant="primary">
                Cari modul RM10
              </PrimaryButton>
              <div className={styles.sunburstRays} aria-hidden="true">
                <span
                  className={styles.ray}
                  style={{ transform: "rotate(25deg)" }}
                />
                <span className={styles.ray} style={{ width: "18px" }} />
                <span
                  className={styles.ray}
                  style={{ transform: "rotate(-25deg)" }}
                />
              </div>
            </div>

            {/* Target Audience Pills */}
            <div className={styles.audienceChips}>
              <Link
                href="/modules?category=bisnes"
                className={styles.audienceChip}
              >
                <div
                  className={styles.chipIconWrap}
                  style={{ background: "#f2f7ff", color: "#1777f2" }}
                >
                  <Briefcase size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--ss-muted)",
                      fontWeight: 500,
                    }}
                  >
                    Untuk
                  </div>
                  <div>bisnes</div>
                </div>
              </Link>

              <Link
                href="/modules?category=kerja"
                className={styles.audienceChip}
              >
                <div
                  className={styles.chipIconWrap}
                  style={{ background: "#fffbe8", color: "#d97706" }}
                >
                  <Building size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--ss-muted)",
                      fontWeight: 500,
                    }}
                  >
                    Untuk
                  </div>
                  <div>kerja</div>
                </div>
              </Link>

              <Link
                href="/modules?category=student"
                className={styles.audienceChip}
              >
                <div
                  className={styles.chipIconWrap}
                  style={{ background: "#effbf5", color: "#08bd59" }}
                >
                  <GraduationCap size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--ss-muted)",
                      fontWeight: 500,
                    }}
                  >
                    Untuk
                  </div>
                  <div>student</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className={styles.heroRight}>
            <div className={styles.heroIllustrationWrap}>
              <HeroArtwork />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Modules Row (3 prominent cards) */}
      <section className={styles.featuredSection} aria-label="Modul Pilihan">
        <RevealSection className={styles.featuredGrid}>
          {featuredModules.map((module) => (
            <ModuleCard key={module.slug} module={module} variant="featured" />
          ))}
        </RevealSection>
      </section>

      {/* Bottom Banner */}
      <CommunityNotice />
    </div>
  );
}
