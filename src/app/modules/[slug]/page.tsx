"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Tag,
  BarChart2,
  FileText,
  Download,
  BookOpen,
  Lock,
  ArrowRight,
  MessageSquare,
  FileSpreadsheet,
  X,
  ShieldCheck,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import { ToolLogoTile } from "@/components/tools/ToolLogoTile";
import { MODULES, TOOLS } from "@/data/mockData";
import styles from "./module-detail.module.css";

interface ModuleDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const currentModule = MODULES.find((m) => m.slug === params.slug);

  if (!currentModule) {
    notFound();
  }

  const primaryTool =
    TOOLS.find((t) => currentModule.toolSlugs.includes(t.slug)) || TOOLS[0];

  const nextModule = currentModule.nextModuleSlug
    ? MODULES.find((m) => m.slug === currentModule.nextModuleSlug)
    : MODULES[1];

  return (
    <div className="container">
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Jejak navigasi">
        <Link href="/modules">Modul</Link>
        <ChevronRight size={14} />
        <Link href={`/tools?category=${primaryTool.category}`}>
          {primaryTool.category.charAt(0).toUpperCase() +
            primaryTool.category.slice(1)}
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: "var(--ss-navy-950)" }}>{currentModule.title}</span>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Maklumat Modul">
        <div className={styles.heroLeft}>
          <ToolLogoTile
            name={primaryTool.name}
            logoPath={primaryTool.logoPath}
            brandColor={primaryTool.brandColor}
            size="lg"
          />

          <AnimatedHeading
            text={currentModule.title}
            accentWords={["n8n", "AI", "Website", "Canvas", "Sheets"]}
            as="h1"
            className={styles.headline}
          />

          <p className={styles.subtitle}>{currentModule.shortOutcome}</p>

          <div className={styles.metaRow}>
            <span className={styles.metaPill}>
              <Tag size={15} color="var(--ss-navy-950)" />
              <span>RM{currentModule.priceMyr}</span>
            </span>
            <span className={styles.metaPill}>
              <Clock size={15} color="var(--ss-muted)" />
              <span>{currentModule.estimatedMinutes} min</span>
            </span>
            <span className={styles.metaPill}>
              <BarChart2 size={15} color="var(--ss-muted)" />
              <span>
                {currentModule.level.charAt(0).toUpperCase() + currentModule.level.slice(1)}
              </span>
            </span>
            <span className={styles.metaPill}>
              <FileText size={15} color="var(--ss-muted)" />
              <span>Teks + gambar + template</span>
            </span>
          </div>

          <div className={styles.ctaRow}>
            <PrimaryButton
              variant="primary"
              onClick={() => setShowCheckoutModal(true)}
            >
              Beli modul RM{currentModule.priceMyr}
            </PrimaryButton>
            <div className={styles.sunburstRays} aria-hidden="true">
              <span className={styles.ray} style={{ transform: "rotate(25deg)" }} />
              <span className={styles.ray} style={{ width: "16px" }} />
              <span className={styles.ray} style={{ transform: "rotate(-25deg)" }} />
            </div>

            <PrimaryButton
              href={`/learn/${currentModule.slug}/2`}
              variant="secondary"
              showArrow={false}
            >
              Lihat contoh langkah
            </PrimaryButton>
          </div>
        </div>

        <div className={styles.heroRight}>
          <Image
            src="/assets/illustrations/hero-learners.png"
            alt="Pelajar bersama modul pembelajaran SiapSatu"
            width={520}
            height={360}
            priority
            className={styles.heroArtwork}
          />
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className={styles.detailLayout}>
        {/* Left Column: What you will do & Templates */}
        <div className={styles.leftCol}>
          {/* Apa yang kau akan buat */}
          <section className={styles.sectionBox} aria-label="Apa yang kau akan buat">
            <h2 className={styles.sectionTitle}>Apa yang kau akan buat</h2>
            <p className={styles.sectionDesc}>
              Dalam modul ini, kau akan bina automasi yang sambungkan borang
              kepada Google Sheets menggunakan n8n tanpa perlu coding.
            </p>

            <div className={styles.stepsFlowGrid}>
              <div className={styles.stepsList}>
                {(currentModule.whatYouWillDo || [
                  { step: 1, title: "Bina borang", description: "Sediakan Google Form untuk terima lead." },
                  { step: 2, title: "Setup n8n workflow", description: "Sambungkan Google Form ke Google Sheets." },
                  { step: 3, title: "Uji dan aktifkan", description: "Test dengan data sebenar." },
                  { step: 4, title: "Kemas dan guna", description: "Susun kolum, tambah rule asas dan mula guna." },
                ]).map((st) => (
                  <div key={st.step} className={styles.stepItem}>
                    <div className={styles.stepNumberCircle}>{st.step}</div>
                    <div className={styles.stepText}>
                      <span className={styles.stepTitle}>{st.title}</span>
                      <span className={styles.stepDetail}>{st.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual Node Diagram */}
              <div className={styles.visualDiagramBox} aria-hidden="true">
                <div className={styles.diagramNode}>
                  <div className={styles.diagramIcon} style={{ background: "#673ab7" }}>
                    <FileText size={22} />
                  </div>
                  <span className={styles.diagramName}>Google Form</span>
                  <span className={styles.diagramSub}>Borang diisi pengguna</span>
                </div>

                <ArrowRight size={18} color="var(--ss-muted)" />

                <div className={styles.diagramNode}>
                  <div className={styles.diagramIcon} style={{ background: "#ea4b71" }}>
                    <Image
                      src="/assets/tools/n8n.png"
                      alt="n8n"
                      width={24}
                      height={24}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                  <span className={styles.diagramName}>n8n</span>
                  <span className={styles.diagramSub}>Proses data automatik</span>
                </div>

                <ArrowRight size={18} color="var(--ss-muted)" />

                <div className={styles.diagramNode}>
                  <div className={styles.diagramIcon} style={{ background: "#08bd59" }}>
                    <FileSpreadsheet size={22} />
                  </div>
                  <span className={styles.diagramName}>Google Sheets</span>
                  <span className={styles.diagramSub}>Data tersimpan kemas</span>
                </div>
              </div>
            </div>
          </section>

          {/* Template yang dapat */}
          <section className={styles.sectionBox} aria-label="Template yang dapat">
            <h2 className={styles.sectionTitle}>Template yang dapat</h2>
            <p className={styles.sectionDesc}>
              Semua template disediakan, terus guna dan ubah ikut keperluan kau.
            </p>

            <div className={styles.templatesGrid}>
              <div className={styles.templateCard}>
                <div className={styles.templateCardLeft}>
                  <div className={styles.templateIconSquare}>
                    <FileSpreadsheet size={22} color="#08bd59" />
                  </div>
                  <div>
                    <h3 className={styles.templateTitle}>Mapping Sheet (Template)</h3>
                    <p className={styles.templateDesc}>
                      Contoh struktur kolum untuk kemas dan konsisten.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Template Mapping Sheet dimuat turun.")}
                  className={styles.downloadBtn}
                  aria-label="Muat turun Mapping Sheet"
                >
                  <Download size={18} />
                </button>
              </div>

              <div className={styles.templateCard}>
                <div className={styles.templateCardLeft}>
                  <div className={styles.templateIconSquare}>
                    <FileText size={22} color="#1777f2" />
                  </div>
                  <div>
                    <h3 className={styles.templateTitle}>Checklist Setup</h3>
                    <p className={styles.templateDesc}>
                      Senarai langkah demi langkah supaya tak terlepas apa-apa.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Checklist Setup dimuat turun.")}
                  className={styles.downloadBtn}
                  aria-label="Muat turun Checklist Setup"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Pricing & Next Module */}
        <aside>
          <div className={styles.stickyBuyCard}>
            <div className={styles.buyPriceTag}>RM{currentModule.priceMyr}</div>

            <PrimaryButton
              variant="primary"
              onClick={() => setShowCheckoutModal(true)}
              className="w-full"
            >
              Beli modul RM{currentModule.priceMyr}
            </PrimaryButton>

            <div className={styles.buyFeaturesList}>
              <div className={styles.buyFeatureItem}>
                <BookOpen size={18} className={styles.buyFeatureIcon} />
                <div>
                  <div className={styles.buyFeatureTitle}>
                    Akses modul selepas pembayaran
                  </div>
                  <div className={styles.buyFeatureDesc}>
                    Terus belajar bila-bila masa.
                  </div>
                </div>
              </div>

              <div className={styles.buyFeatureItem}>
                <FileText size={18} className={styles.buyFeatureIcon} />
                <div>
                  <div className={styles.buyFeatureTitle}>
                    Teks + gambar + template
                  </div>
                  <div className={styles.buyFeatureDesc}>
                    Panduan lengkap dan mudah ikut.
                  </div>
                </div>
              </div>

              <div className={styles.buyFeatureItem}>
                <Lock size={18} className={styles.buyFeatureIcon} />
                <div>
                  <div className={styles.buyFeatureTitle}>
                    Akaun Google diperlukan
                  </div>
                  <div className={styles.buyFeatureDesc}>
                    Perlu akaun percuma untuk Google Form & Sheets.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Module Recommendation */}
          {nextModule && (
            <div className={styles.nextModuleCard}>
              <div className={styles.nextModuleHeader}>
                <span>Modul seterusnya</span>
                <ChevronRight size={16} />
              </div>

              <Link
                href={`/modules/${nextModule.slug}`}
                className={styles.nextModuleInner}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div className={styles.nextIconSquare}>
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display, inherit)",
                        fontWeight: 800,
                        fontSize: "1rem",
                        color: "var(--ss-navy-950)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {nextModule.title}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--ss-muted)" }}>
                      {nextModule.shortOutcome}
                    </div>
                  </div>
                </div>

                <ArrowRight size={18} color="var(--ss-navy-950)" />
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* Checkout Preview Modal */}
      {showCheckoutModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3, 20, 58, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "var(--ss-radius-lg)",
              padding: "2.25rem",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 24px 64px rgba(3, 20, 58, 0.2)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowCheckoutModal(false)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--ss-surface-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ss-navy-950)",
              }}
              aria-label="Tutup"
            >
              <X size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--ss-green)", marginBottom: "0.85rem" }}>
              <ShieldCheck size={24} />
              <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>Pratonton Checkout SiapSatu</span>
            </div>

            <h3
              id="modal-title"
              style={{
                fontFamily: "var(--font-display, inherit)",
                fontSize: "1.45rem",
                fontWeight: 900,
                color: "var(--ss-navy-950)",
                marginBottom: "0.5rem",
              }}
            >
              Langganan Modul: {currentModule.title}
            </h3>

            <p style={{ fontSize: "0.92rem", color: "var(--ss-muted)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
              Harga rasmi: <strong>RM{currentModule.priceMyr}</strong> (sekali bayar seumur hidup).
            </p>

            <div
              style={{
                background: "var(--ss-surface-subtle)",
                padding: "1rem",
                borderRadius: "var(--ss-radius-sm)",
                fontSize: "0.85rem",
                color: "var(--ss-navy-950)",
                lineHeight: 1.45,
                marginBottom: "1.75rem",
                border: "1px solid var(--ss-line)",
              }}
            >
              <em>Nota Kejujuran Produk:</em> Ini adalah pratonton prototaip frontend. Tiada pemproses gerbang pembayaran sebenar (FPX/Kad) disambungkan pada sesi ini.
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <PrimaryButton
                href={`/learn/${currentModule.slug}/2`}
                variant="primary"
                className="w-full"
              >
                Terus buka panduan reader
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
