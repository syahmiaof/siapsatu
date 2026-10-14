"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  CheckSquare,
  Square,
  FileText,
  Workflow,
  Bot,
  CloudUpload,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RevealSection } from "@/components/motion/RevealSection";
import { OutcomePanel } from "@/components/learning/OutcomePanel";
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
      time: "45 minit",
      icon: <FileText size={22} />,
      colorClass: styles["step-01"],
      iconBg: "#1777f2",
    },
    {
      num: "02",
      slug: "n8n-google-sheets",
      title: "Bina Workflow n8n",
      desc: "Sambung app, set trigger, proses data dan kawal logik workflow.",
      hasil: "Workflow ambil data dari form dan simpan ke Google Sheets",
      time: "60 minit",
      icon: <Workflow size={22} />,
      colorClass: styles["step-02"],
      iconBg: "#ff5a0a",
    },
    {
      num: "03",
      slug: "n8n-faq-assistant",
      title: "Tambah AI Agent",
      desc: "Integrasi AI untuk proses teks, jana jawapan dan automasi tugas harian.",
      hasil: "Auto-reply pintar dengan AI berdasarkan data sebenar",
      time: "60 minit",
      icon: <Bot size={22} />,
      colorClass: styles["step-03"],
      iconBg: "#08bd59",
    },
    {
      num: "04",
      slug: "n8n-deploy-monitor",
      title: "Deploy & Monitor",
      desc: "Deploy workflow, set notifikasi, pantau prestasi dan selesaikan isu.",
      hasil: "Workflow live, dengan notifikasi dan log pemantauan",
      time: "45 minit",
      icon: <CloudUpload size={22} />,
      colorClass: styles["step-04"],
      iconBg: "#ff2445",
    },
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Laluan AI Automation">
        <div className={styles.heroLeft}>
          <div className={styles.pathBadge}>
            <Share2 size={16} />
            <span>Laluan Pembelajaran</span>
          </div>

          <AnimatedHeading
            text="Laluan AI Automation Dari kerja manual, sampai workflow berjalan sendiri."
            accentWords={["AI", "Automation", "workflow", "berjalan", "sendiri."]}
            as="h1"
            className={styles.headline}
          />

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
              <span>Ambil satu-satu RM10 atau lengkap RM27</span>
            </span>
          </div>
        </div>

        <div className={styles.heroRight}>
          <Image
            src="/assets/illustrations/path-hero-character.png"
            alt="Ilustrasi laluan pembelajaran AI Automation bersama pelajar Malaysia"
            width={520}
            height={360}
            priority
            className={styles.heroArt}
          />
        </div>
      </section>

      {/* Main Track & Outcomes Grid */}
      <div className={styles.pathContentGrid}>
        {/* Track Column */}
        <section aria-label="Modul dalam laluan ini">
          <h2 className={styles.trackHeaderTitle}>Modul dalam laluan ini</h2>

          <RevealSection className={styles.modulesTrackGrid}>
            {trackModules.map((m) => {
              const isChecked = !!completedMap[m.slug];

              return (
                <div key={m.slug} className={styles.trackModuleCard} data-reveal-item>
                  <span className={`${styles.stepNumberPip} ${m.colorClass}`}>
                    {m.num}
                  </span>

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
                      <div className={styles.hasilText}>{m.hasil}</div>
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

        {/* Right Panel: Hasil Akhir */}
        <aside aria-label="Hasil Akhir Laluan">
          <OutcomePanel
            title="Hasil akhir"
            subtitle="Selepas lengkap 4 modul, anda akan ada:"
            outcomes={path.finalOutcomes}
          />
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
              <span className={styles.featureTitle}>Sijil penyertaan</span>
              <span className={styles.featureDesc}>Selepas lengkap modul</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
