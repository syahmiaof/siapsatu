"use client";

import { PathArtwork } from "@/components/brand/PathArtwork";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Share2,
  Clock,
  BookOpen,
  Tag,
  ArrowRight,
  Play,
  Users,
  Award,
  Check,
  CheckSquare,
  Square,
  FileText,
  Workflow,
  Bot,
  CloudUpload,
  Sheet,
  Mail,
  Activity,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RevealSection } from "@/components/motion/RevealSection";
import { LEARNING_PATHS } from "@/data/mockData";
import { getStoredProgress, saveStoredProgress } from "@/lib/storage";
import styles from "./path.module.css";

export default function LearningPathAutomationPage() {
  const path = LEARNING_PATHS[0];

  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const progress = getStoredProgress();
    const map: Record<string, boolean> = {};

    path.moduleSlugs.forEach((slug) => {
      map[slug] = progress.completedModuleSlugs.includes(slug);
    });

    setCompletedMap(map);
  }, [path.moduleSlugs]);

  function toggleComplete(slug: string) {
    const nextVal = !completedMap[slug];
    const newMap = { ...completedMap, [slug]: nextVal };
    setCompletedMap(newMap);

    const progress = getStoredProgress();
    const updatedCompletedSlugs = nextVal
      ? [...new Set([...progress.completedModuleSlugs, slug])]
      : progress.completedModuleSlugs.filter((s) => s !== slug);

    saveStoredProgress({
      ...progress,
      completedModuleSlugs: updatedCompletedSlugs,
    });
  }

  const trackModules = [
    {
      num: "01",
      slug: "n8n-asas-workflow",
      title: "Faham Asas Automation",
      desc: "Kenal n8n, konsep workflow dan integrasi asas tanpa coding.",
      hasil: "Bina workflow pertama yang boleh jalan",
      hasilIcon: <FileText size={16} />,
      time: "45 minit",
      icon: <FileText size={22} />,
      colorClass: styles["step-01"],
      iconBg: "#1777f2",
      accentColor: "#1777f2",
    },
    {
      num: "02",
      slug: "n8n-google-sheets",
      title: "Bina Workflow n8n",
      desc: "Sambung app, set trigger, proses data dan kawal logik workflow.",
      hasil: "Workflow ambil data dari form dan simpan ke Google Sheets",
      hasilIcon: <Workflow size={16} />,
      time: "60 minit",
      icon: <Workflow size={22} />,
      colorClass: styles["step-02"],
      iconBg: "#ff5a0a",
      accentColor: "#ff5a0a",
    },
    {
      num: "03",
      slug: "n8n-faq-assistant",
      title: "Tambah AI Agent",
      desc: "Integrasi AI untuk proses teks, jana jawapan dan automasi tugas harian.",
      hasil: "Auto-reply pintar dengan AI berdasarkan data sebenar",
      hasilIcon: <Bot size={16} />,
      time: "60 minit",
      icon: <Bot size={22} />,
      colorClass: styles["step-03"],
      iconBg: "#08bd59",
      accentColor: "#08bd59",
    },
    {
      num: "04",
      slug: "n8n-deploy-monitor",
      title: "Deploy & Monitor",
      desc: "Deploy workflow, set notifikasi, pantau prestasi dan selesaikan isu.",
      hasil: "Workflow live, dengan notifikasi dan log pemantauan",
      hasilIcon: <Activity size={16} />,
      time: "45 minit",
      icon: <CloudUpload size={22} />,
      colorClass: styles["step-04"],
      iconBg: "#ff2445",
      accentColor: "#ff2445",
    },
  ];

  return (
    <div className="container" data-path>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Laluan AI Automation">
        <div className={styles.heroLeft}>
          <div className={styles.pathBadge}>
            <Share2 size={16} />
            <span>Laluan Pembelajaran</span>
          </div>

          <AnimatedHeading
            steadyEntrance
            text="Laluan AI Automation"
            breakAfter={3}
            accentWords={[
              "AI",
              "Automation",
              "workflow",
              "berjalan",
              "sendiri.",
            ]}
            as="h1"
            className={styles.headline}
          />

          <p className={styles.tagline}>
            Dari kerja manual, sampai
            <br />
            workflow berjalan sendiri.
          </p>
          <p className={styles.subtitle}>{path.subheadline}</p>

          <div className={styles.metaRow}>
            <span className={styles.metaPill}>
              <BookOpen size={15} />
              <span>4 modul</span>
            </span>

            <span className={styles.metaPill}>
              <Clock size={15} />
              <span>3 jam</span>
            </span>

            <span className={styles.metaPill}>
              <span>Beginner</span>
            </span>

            <span className={styles.discountBadge}>
              <Tag size={15} />
              <span>
                <strong>RM10</strong> setiap modul · pilih ikut keperluan
              </span>
            </span>
          </div>
        </div>

        <div className={styles.heroRight}>
          <PathArtwork />
        </div>
      </section>

      {/* Main Track & Outcomes Grid */}
      <div className={styles.pathContentGrid}>
        {/* Track Column */}
        <section aria-label="Modul dalam laluan ini" className={styles.trackSection}>
          <h2 className={styles.trackHeaderTitle}>Modul dalam laluan ini</h2>

          {/* Desktop Timeline Bar */}
          <div className={styles.desktopTimelineTrack} aria-hidden="true">
            <span className={`${styles.timelineTrackSegment} ${styles.seg01}`} />
            <span className={`${styles.timelineTrackSegment} ${styles.seg02}`} />
            <span className={`${styles.timelineTrackSegment} ${styles.seg03}`} />
            <span className={`${styles.timelineTrackSegment} ${styles.seg04}`} />
          </div>

          <RevealSection className={styles.modulesTrackGrid}>
            {trackModules.map((m, idx) => {
              const isChecked = !!completedMap[m.slug];

              return (
                <div
                  key={m.slug}
                  className={styles.trackModuleCard}
                  data-reveal-item
                  data-step={m.num}
                >
                  <span className={`${styles.stepNumberPip} ${m.colorClass}`}>
                    {m.num}
                  </span>

                  {/* Vertical connector line to next step for stacked view */}
                  {idx < trackModules.length - 1 && (
                    <span
                      className={`${styles.verticalConnector} ${styles[`vConn0${idx + 1}`]}`}
                      aria-hidden="true"
                    />
                  )}

                  <div>
                    <div
                      className={styles.moduleCardIcon}
                      style={{ background: m.iconBg }}
                    >
                      {m.icon}
                    </div>

                    <h3 className={styles.moduleCardTitle}>
                      <Link
                        href={`/modules/${m.slug}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {m.title}
                      </Link>
                    </h3>

                    <p className={styles.moduleCardDesc}>{m.desc}</p>

                    <div className={styles.hasilBlock}>
                      <div className={styles.hasilLabel}>Hasil modul</div>
                      <div className={styles.hasilRow}>
                        <span className={styles.hasilMiniIcon} aria-hidden="true">
                          {m.hasilIcon}
                        </span>
                        <div className={styles.hasilText}>{m.hasil}</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.trackCardFooter}>
                    <span className={styles.durationText}>
                      <Clock size={13} />
                      {m.time}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleComplete(m.slug)}
                      className={`${styles.completionToggle} ${
                        isChecked ? styles.completed : ""
                      }`}
                      aria-label={`Tanda ${m.title} sebagai ${
                        isChecked ? "belum selesai" : "selesai"
                      }`}
                    >
                      {isChecked ? (
                        <>
                          <CheckSquare size={16} />
                          <span>Selesai</span>
                        </>
                      ) : (
                        <>
                          <Square size={16} />
                          <span>Selesai</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </RevealSection>
        </section>

        {/* Right Panel: Hasil Akhir Checklist Card */}
        <aside aria-label="Hasil Akhir Laluan" className={styles.outcomeAside}>
          <div className={styles.outcomeChecklistCard}>
            <h2 className={styles.outcomeCardTitle}>Hasil akhir</h2>
            <p className={styles.outcomeCardSubtitle}>
              Selepas lengkap 4 modul, anda akan ada:
            </p>

            <div className={styles.outcomeList}>
              {path.finalOutcomes.map((item, idx) => {
                const iconNode =
                  item.icon === "sheet" ? (
                    <Sheet size={20} />
                  ) : item.icon === "mail" ? (
                    <Mail size={20} />
                  ) : item.icon === "file-text" ? (
                    <FileText size={20} />
                  ) : (
                    <Activity size={20} />
                  );

                const iconBoxClass =
                  item.icon === "sheet"
                    ? styles.iconBoxSheet
                    : item.icon === "mail"
                      ? styles.iconBoxMail
                      : item.icon === "file-text"
                        ? styles.iconBoxDoc
                        : styles.iconBoxMonitor;

                return (
                  <div key={idx} className={styles.outcomeRow}>
                    <div
                      className={styles.outcomeCheckCircle}
                      aria-hidden="true"
                    >
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <div
                      className={`${styles.outcomeAppTile} ${iconBoxClass}`}
                      aria-hidden="true"
                    >
                      {iconNode}
                    </div>
                    <div className={styles.outcomeContent}>
                      <h3 className={styles.outcomeItemHeading}>{item.title}</h3>
                      <p className={styles.outcomeItemSummary}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom CTA & Highlights */}
      <div className={styles.bottomBanner}>
        <Link href="/modules/n8n-asas-workflow" className={styles.bigCtaCard}>
          <div className={styles.playCircle}>
            <Play size={24} fill="currentColor" />
          </div>

          <div>
            <div className={styles.ctaCardTitle}>
              <span>Mulakan Modul 01</span>
              <ArrowRight size={22} />
            </div>

            <p className={styles.ctaCardDesc}>
              Faham asas automation dan bina workflow pertama anda.
            </p>
          </div>
        </Link>

        <div className={styles.featuresCard}>
          <div className={styles.featureItem}>
            <BookOpen size={22} className={styles.featureIcon} />
            <div className={styles.featureText}>
              <span className={styles.featureTitle}>Belajar ikut langkah</span>
              <span className={styles.featureDesc}>
                Teks + gambar + template
              </span>
            </div>
          </div>

          <div className={styles.featureItem}>
            <Users size={22} className={styles.featureIcon} />
            <div className={styles.featureText}>
              <span className={styles.featureTitle}>Sokongan komuniti</span>
              <span className={styles.featureDesc}>Tanya dan kongsi</span>
            </div>
          </div>

          <div className={styles.featureItem}>
            <Award size={22} className={styles.featureIcon} />
            <div className={styles.featureText}>
              <span className={styles.featureTitle}>Checklist hasil</span>
              <span className={styles.featureDesc}>
                Semak kefahaman selepas lengkap modul
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
