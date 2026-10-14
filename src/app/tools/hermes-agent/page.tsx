import { BrandScene } from "@/components/brand/BrandScene";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Download,
  Brain,
  Link as LinkIcon,
  BookOpen,
  Settings,
  Shield,
  Users,
  TrendingUp,
  ArrowRight,
  FileCode,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RevealSection } from "@/components/motion/RevealSection";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import { ToolLogoTile } from "@/components/tools/ToolLogoTile";
import styles from "./hermes.module.css";

export default function HermesAgentHubPage() {
  const hermesModules = [
    {
      slug: "pasang-hermes-agent",
      title: "Pasang Hermes Agent",
      desc: "Ikut langkah demi langkah untuk pasang Hermes Agent dengan selamat di komputer anda.",
      level: "Beginner",
      icon: <Download size={22} />,
      iconBg: "#1777f2",
      badgeBg: "var(--ss-surface-blue)",
      badgeColor: "#1777f2",
    },
    {
      slug: "hermes-memory-skills",
      title: "Faham memory & skills",
      desc: "Ketahui bagaimana Hermes Agent mengingat konteks, belajar daripada tugasan, dan guna skills dengan berkesan.",
      level: "Beginner",
      icon: <Brain size={22} />,
      iconBg: "#ff2445",
      badgeBg: "var(--ss-surface-red)",
      badgeColor: "#ff2445",
    },
    {
      slug: "hermes-tools-integration",
      title: "Hubungkan tools dengan selamat",
      desc: "Sambungkan Hermes Agent dengan tools seperti n8n, apps dan servis lain dengan cara yang selamat.",
      level: "Intermediate",
      icon: <LinkIcon size={22} />,
      iconBg: "#08bd59",
      badgeBg: "var(--ss-surface-green)",
      badgeColor: "#057a44",
    },
  ];

  return (
    <div className="container">
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Jejak navigasi">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/tools">Tools</Link>
        <ChevronRight size={14} />
        <Link href="/tools?category=ai">AI Agent</Link>
        <ChevronRight size={14} />
        <span style={{ color: "var(--ss-navy-950)" }}>Hermes Agent</span>
      </nav>

      {/* Hero Section */}
      <section
        className={styles.heroSection}
        aria-label="Maklumat Hermes Agent"
      >
        <div className={styles.heroLeft}>
          <ToolLogoTile
            name="Hermes Agent"
            logoPath="/assets/tools/hermes-agent.png"
            brandColor="#111827"
            size="lg"
          />

          <AnimatedHeading
            breakAfter={2}
            accentFrom={2}
            text="Hermes Agent: agent yang belajar cara kau bekerja."
            accentWords={[
              "agent",
              "yang",
              "belajar",
              "cara",
              "kau",
              "bekerja.",
            ]}
            as="h1"
            className={styles.headline}
          />

          <p className={styles.subtitle}>
            Kenal asas, pasang dengan selamat, dan bina skills daripada tugasan
            sebenar.
          </p>

          <div className={styles.ctaGroup}>
            <PrimaryButton href="#modul-hermes" variant="primary">
              Lihat modul Hermes
            </PrimaryButton>
            <a
              href="https://github.com/NousResearch/hermes-agent"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubPill}
            >
              <Image
                src="/assets/tools/github.svg"
                alt="GitHub"
                width={18}
                height={18}
              />
              <span>Open-source agent</span>
            </a>
          </div>

          <div className={styles.highlightsStrip}>
            <div className={styles.highlightPill}>
              <BookOpen size={16} color="var(--ss-navy-950)" />
              <span>Fokus pada pembelajaran</span>
            </div>
            <div className={styles.highlightPill}>
              <Settings size={16} color="var(--ss-navy-950)" />
              <span>Langkah demi langkah</span>
            </div>
            <div className={styles.highlightPill}>
              <Shield size={16} color="var(--ss-navy-950)" />
              <span>Selamat dan praktikal</span>
            </div>
            <div className={styles.highlightPill}>
              <Users size={16} color="var(--ss-navy-950)" />
              <span>Sesuai untuk pemula</span>
            </div>
            <div className={styles.highlightPill}>
              <TrendingUp size={16} color="var(--ss-navy-950)" />
              <span>Bina skills sebenar</span>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.characterArtWrap}>
            <BrandScene variant="hermes" />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section
        id="modul-hermes"
        className={styles.modulesSection}
        aria-label="Modul Hermes"
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleGroup}>
            <AnimatedHeading
              text="Mula dari sini"
              accentWords={["sini"]}
              as="h2"
              className={styles.sectionTitle}
            />
            <span className={styles.sectionDesc}>
              Ikuti modul ringkas dan praktikal untuk mula guna Hermes Agent.
            </span>
          </div>
          <Link
            href="/modules?search=Hermes"
            style={{
              color: "var(--ss-navy-950)",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <span>Lihat semua modul</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <RevealSection className={styles.hermesGrid}>
          {hermesModules.map((item) => (
            <Link
              key={item.slug}
              href={`/modules/${item.slug}`}
              className={styles.hermesCard}
              data-reveal-item
            >
              <div>
                <div
                  className={styles.cardIcon}
                  style={{ background: item.iconBg }}
                >
                  {item.icon}
                </div>

                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>

              <div className={styles.cardBottom}>
                <span
                  className={styles.badgePill}
                  style={{ background: item.badgeBg, color: item.badgeColor }}
                >
                  {item.level}
                </span>

                <span className={styles.cardPrice}>RM10</span>

                <div className={styles.cardArrow} aria-hidden="true">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </RevealSection>
      </section>

      {/* How it works bar */}
      <div className={styles.howItWorksBar}>
        <div>
          <div className={styles.howLeftTitle}>Bagaimana ia berfungsi?</div>
          <div className={styles.howLeftDesc}>
            Dari pemasangan hingga hasil nyata dalam kerja harian anda.
          </div>
        </div>

        <div className={styles.howStepsFlow}>
          <div className={styles.howStep}>
            <div
              className={styles.howIconCircle}
              style={{ background: "#1777f2" }}
            >
              <LinkIcon size={20} />
            </div>
            <div className={styles.howStepText}>
              <span className={styles.howStepTitle}>Connect</span>
              <span className={styles.howStepDesc}>
                Pasang dan hubungkan dengan tools anda.
              </span>
            </div>
          </div>
          <ArrowRight size={18} color="var(--ss-muted)" />

          <div className={styles.howStep}>
            <div
              className={styles.howIconCircle}
              style={{ background: "#ff2445" }}
            >
              <FileCode size={20} />
            </div>
            <div className={styles.howStepText}>
              <span className={styles.howStepTitle}>Remember</span>
              <span className={styles.howStepDesc}>
                Ingat konteks dan pembelajaran anda.
              </span>
            </div>
          </div>
          <ArrowRight size={18} color="var(--ss-muted)" />

          <div className={styles.howStep}>
            <div
              className={styles.howIconCircle}
              style={{ background: "#08bd59" }}
            >
              <GraduationCap size={20} />
            </div>
            <div className={styles.howStepText}>
              <span className={styles.howStepTitle}>Build Skills</span>
              <span className={styles.howStepDesc}>
                Belajar cara buat tugasan lebih baik.
              </span>
            </div>
          </div>
          <ArrowRight size={18} color="var(--ss-muted)" />

          <div className={styles.howStep}>
            <div
              className={styles.howIconCircle}
              style={{ background: "#ff5a0a" }}
            >
              <Sparkles size={20} />
            </div>
            <div className={styles.howStepText}>
              <span className={styles.howStepTitle}>Improve</span>
              <span className={styles.howStepDesc}>
                Dapatkan hasil semakin bertambah baik.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
