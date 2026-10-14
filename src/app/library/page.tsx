"use client";

import { BrandScene } from "@/components/brand/BrandScene";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import Link from "next/link";

import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  ChevronRight,
  ExternalLink,
  Play,
  Lightbulb,
  ArrowRight,
  FileSpreadsheet,
  MessageSquare,
  FileCode,
} from "lucide-react";

import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

import { RevealSection } from "@/components/motion/RevealSection";

import { PrimaryButton } from "@/components/brand/PrimaryButton";

import { getStoredProgress } from "@/lib/storage";

import { INITIAL_USER_PROGRESS } from "@/data/mockData";

import styles from "./library.module.css";

export default function LibraryDashboardPage() {
  const [progress, setProgress] = useState(INITIAL_USER_PROGRESS);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  return (
    <div className="container">
      <p className="prototype-note">
        Pustaka demo · data contoh dan progress disimpan pada browser ini. Tiada
        pembelian sebenar.
      </p>

      {/* Top Header */}

      <section className={styles.pageHeader} aria-label="Ringkasan Pustaka">
        <div>
          <AnimatedHeading
            text="Sambung benda yang belum siap."
            accentWords={["yang", "belum", "siap."]}
            as="h1"
            className={styles.headline}
          />

          <p className={styles.subtitle}>
            Teruskan belajar, siapkan hasil, dan bina kemahiran yang boleh guna.
          </p>
        </div>

        {/* 3 Metrics Counter Row */}

        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricLeft}>
              <div
                className={styles.metricIconBox}
                style={{ background: "#f2f7ff", color: "#1777f2" }}
              >
                <BookOpen size={22} />
              </div>

              <div>
                <div className={styles.metricNum}>
                  {progress.ownedModuleSlugs.length}
                </div>

                <div className={styles.metricLabel}>modul demo</div>
              </div>
            </div>

            <ChevronRight size={16} color="var(--ss-muted)" />
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLeft}>
              <div
                className={styles.metricIconBox}
                style={{ background: "#effbf5", color: "#08bd59" }}
              >
                <CheckCircle2 size={22} />
              </div>

              <div>
                <div className={styles.metricNum}>
                  {progress.completedOutputs.length}
                </div>

                <div className={styles.metricLabel}>hasil siap</div>
              </div>
            </div>

            <ChevronRight size={16} color="var(--ss-muted)" />
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricLeft}>
              <div
                className={styles.metricIconBox}
                style={{ background: "#fffbe8", color: "#d97706" }}
              >
                <GraduationCap size={22} />
              </div>

              <div>
                <div className={styles.metricNum}>1</div>

                <div className={styles.metricLabel}>sedang belajar</div>
              </div>
            </div>

            <ChevronRight size={16} color="var(--ss-muted)" />
          </div>
        </div>
      </section>

      {/* Continue Learning Card & Completed Outcomes Panel */}

      <div className={styles.continueGrid}>
        {/* Continue Learning Left Card */}

        <div className={styles.continueCard}>
          <div className={styles.continueLeft}>
            <span className={styles.eyebrow}>TERUSKAN BELAJAR</span>

            <h2 className={styles.continueTitle}>
              Automasi Lead ke Google Sheets dengan n8n
            </h2>

            <p className={styles.continueDesc}>
              Bina sistem automasi untuk simpan lead dari borang, WhatsApp atau
              website terus ke Google Sheets guna n8n. Tanpa perlu coding.
            </p>

            <div className={styles.progressBarContainer}>
              <span className={styles.progressLabel}>50% siap</span>

              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: "50%" }}
                />
              </div>
            </div>

            <PrimaryButton
              href="/learn/n8n-google-sheets/4"
              variant="navy"
              style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
            >
              Sambung Langkah 4
            </PrimaryButton>
          </div>

          <div className={styles.continueRight}>
            <BrandScene variant="learner" />
          </div>
        </div>

        {/* Right: Hasil yang dah siap */}

        <div className={styles.outcomesPanel}>
          <div className={styles.outcomesHeader}>
            <h3 className={styles.outcomesTitle}>Hasil yang dah siap</h3>

            <Link
              href="/progress"
              style={{
                fontSize: "0.88rem",

                fontWeight: 700,

                color: "var(--ss-navy-950)",

                display: "flex",

                alignItems: "center",

                gap: "0.25rem",
              }}
            >
              <span>Lihat semua</span>

              <ArrowRight size={14} />
            </Link>
          </div>

          <p className={styles.outcomesSub}>
            Ini hasil yang kau dah siap dari modul yang dipelajari.
          </p>

          <div className={styles.outcomesList}>
            {progress.completedOutputs.map((out) => (
              <div key={out.id} className={styles.outcomeCard}>
                <div className={styles.outcomeLeft}>
                  <div
                    className={styles.outcomeIconBox}
                    style={{
                      background:
                        out.type === "SLIDE DECK"
                          ? "rgba(255, 36, 69, 0.1)"
                          : "rgba(37, 211, 102, 0.1)",
                    }}
                  >
                    {out.type === "SLIDE DECK" ? (
                      <FileCode size={22} color="var(--ss-red)" />
                    ) : (
                      <MessageSquare size={22} color="var(--ss-green)" />
                    )}
                  </div>

                  <div>
                    <span className={styles.outcomeTag}>{out.type}</span>

                    <h4 className={styles.outcomeItemTitle}>{out.title}</h4>

                    <span className={styles.outcomeDate}>
                      Siap pada {out.date}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/modules/${out.moduleSlug}`}
                  style={{ color: "var(--ss-muted)" }}
                  aria-label={`Lihat modul untuk ${out.title}`}
                >
                  <ExternalLink size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section: Modul Saya */}

      <section className={styles.myModulesSection} aria-label="Modul Saya">
        <div className={styles.myModulesHeader}>
          <h2 className={styles.myModulesTitle}>Modul saya</h2>

          <Link
            href="/modules"
            style={{
              fontSize: "0.95rem",

              fontWeight: 700,

              color: "var(--ss-navy-950)",

              display: "flex",

              alignItems: "center",

              gap: "0.35rem",
            }}
          >
            <span>Lihat semua modul</span>

            <ArrowRight size={16} />
          </Link>
        </div>

        <RevealSection className={styles.myModulesGrid}>
          {/* Card 1: Gemini Canvas (100% Selesai) */}

          <div className={styles.myModuleCard} data-reveal-item>
            <div
              className={styles.myModuleTop}
              style={{ background: "var(--ss-gradient-card-red)" }}
            >
              <div className={styles.myModuleIcon}>
                <Image
                  src="/assets/tools/gemini.svg"
                  alt="Gemini"
                  width={28}
                  height={28}
                />
              </div>

              <div>
                <h3 className={styles.myModuleTitle}>Gemini Canvas</h3>

                <p className={styles.myModuleDesc}>
                  Tulis, reka, susun dan hasilkan kerja dengan lebih pantas.
                </p>
              </div>
            </div>

            <div className={styles.myModuleBottom}>
              <div>
                <div className={styles.progressStatusRow}>
                  <span style={{ color: "var(--ss-green-dark)" }}>100%</span>
                </div>

                <div
                  className={styles.progressBarTrack}
                  style={{ marginTop: "0.4rem" }}
                >
                  <div
                    className={styles.progressBarFill}
                    style={{ width: "100%", background: "var(--ss-green)" }}
                  />
                </div>
              </div>

              <div className={styles.actionButtonRow}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--ss-green-dark)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  <CheckCircle2 size={16} />

                  <span>Selesai</span>
                </span>

                <PrimaryButton
                  href="/modules/gemini-canvas"
                  variant="secondary"
                  size="sm"
                >
                  Lihat hasil
                </PrimaryButton>
              </div>
            </div>
          </div>

          {/* Card 2: Vibe Code Website (30% Sedang belajar) */}

          <div className={styles.myModuleCard} data-reveal-item>
            <div
              className={styles.myModuleTop}
              style={{ background: "var(--ss-gradient-card-green)" }}
            >
              <div className={styles.myModuleIcon}>
                <FileCode size={28} color="#08bd59" />
              </div>

              <div>
                <h3 className={styles.myModuleTitle}>Vibe Code Website</h3>

                <p className={styles.myModuleDesc}>
                  Bina website moden tanpa perlu jadi programmer.
                </p>
              </div>
            </div>

            <div className={styles.myModuleBottom}>
              <div>
                <div className={styles.progressStatusRow}>
                  <span style={{ color: "#1777f2" }}>30%</span>
                </div>

                <div
                  className={styles.progressBarTrack}
                  style={{ marginTop: "0.4rem" }}
                >
                  <div
                    className={styles.progressBarFill}
                    style={{ width: "30%", background: "#1777f2" }}
                  />
                </div>
              </div>

              <div className={styles.actionButtonRow}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "#1777f2",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  <Play size={16} fill="currentColor" />

                  <span>Sedang belajar</span>
                </span>

                <PrimaryButton
                  href="/modules/vibe-code-website"
                  variant="secondary"
                  size="sm"
                >
                  Sambung
                </PrimaryButton>
              </div>
            </div>
          </div>

          {/* Card 3: Balas Prospek WhatsApp (0% Belum mula) */}

          <div className={styles.myModuleCard} data-reveal-item>
            <div
              className={styles.myModuleTop}
              style={{ background: "var(--ss-gradient-card-navy)" }}
            >
              <div className={styles.myModuleIcon}>
                <Image
                  src="/assets/tools/whatsapp.svg"
                  alt="WhatsApp"
                  width={28}
                  height={28}
                />
              </div>

              <div>
                <h3 className={styles.myModuleTitle}>Balas Prospek WhatsApp</h3>

                <p className={styles.myModuleDesc}>
                  Automasi mesej dan urus prospek dengan n8n.
                </p>
              </div>
            </div>

            <div className={styles.myModuleBottom}>
              <div>
                <div className={styles.progressStatusRow}>
                  <span style={{ color: "var(--ss-muted)" }}>0%</span>
                </div>

                <div
                  className={styles.progressBarTrack}
                  style={{ marginTop: "0.4rem" }}
                >
                  <div
                    className={styles.progressBarFill}
                    style={{ width: "0%", background: "var(--ss-muted)" }}
                  />
                </div>
              </div>

              <div className={styles.actionButtonRow}>
                <span
                  style={{
                    color: "var(--ss-muted)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  Belum mula
                </span>

                <PrimaryButton
                  href="/modules/n8n-whatsapp-autoreply"
                  variant="secondary"
                  size="sm"
                >
                  Mulakan
                </PrimaryButton>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Bottom Recommendation Strip */}

      <div className={styles.recommendationBanner}>
        <div className={styles.recomLeft}>
          <div className={styles.lightbulbCircle}>
            <Lightbulb size={28} />
          </div>

          <div>
            <div
              style={{
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "var(--ss-muted)",
              }}
            >
              Seterusnya untuk kau:
            </div>

            <div className={styles.recomTitle}>
              Auto-reply pertanyaan · RM10
            </div>

            <div className={styles.recomSub}>
              Bina sistem auto-reply untuk pertanyaan pelanggan di WhatsApp guna
              n8n.
            </div>
          </div>
        </div>

        <PrimaryButton href="/modules/n8n-whatsapp-autoreply" variant="primary">
          Lihat modul
        </PrimaryButton>
      </div>
    </div>
  );
}
