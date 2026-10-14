import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Zap,
  Puzzle,
  Users,
  Clock,
  ArrowRight,
  Settings,
  User,
  Wifi,
  ShieldCheck,
  Laptop,
  FileSpreadsheet,
  MessageSquare,
  Mail,
  Bot,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RevealSection } from "@/components/motion/RevealSection";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import { ToolLogoTile } from "@/components/tools/ToolLogoTile";
import { TOOLS, MODULES } from "@/data/mockData";
import styles from "./n8n.module.css";

export default function N8nToolHubPage() {
  const tool = TOOLS.find((t) => t.slug === "n8n")!;

  const n8nModules = [
    {
      slug: "n8n-google-sheets",
      title: "Lead masuk Google Sheets",
      desc: "Terima lead dari Google Forms dan simpan terus ke Google Sheets secara automatik.",
      tag: "Automation",
      time: "30 min",
      level: "Beginner",
      icons: [<User key="1" size={16} />, <ArrowRight key="2" size={12} />, <FileSpreadsheet key="3" size={16} />],
    },
    {
      slug: "n8n-whatsapp-autoreply",
      title: "Auto-reply pertanyaan",
      desc: "Balas mesej WhatsApp secara automatik bila ada pertanyaan baru.",
      tag: "Communication",
      time: "30 min",
      level: "Beginner",
      icons: [<MessageSquare key="1" size={16} />, <ArrowRight key="2" size={12} />, <Settings key="3" size={16} />],
    },
    {
      slug: "n8n-weekly-report",
      title: "Laporan mingguan automatik",
      desc: "Kumpul data, jana laporan mingguan dan hantar terus melalui email.",
      tag: "Productivity",
      time: "45 min",
      level: "Beginner",
      icons: [<FileSpreadsheet key="1" size={16} />, <ArrowRight key="2" size={12} />, <Mail key="3" size={16} />],
    },
    {
      slug: "n8n-faq-assistant",
      title: "AI FAQ Assistant",
      desc: "Guna AI untuk jawab soalan pelanggan secara automatik dari pelbagai platform.",
      tag: "AI / LLM",
      time: "45 min",
      level: "Beginner",
      icons: [<Bot key="1" size={16} />, <ArrowRight key="2" size={12} />, <Settings key="3" size={16} />],
    },
  ];

  return (
    <div className="container">
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Jejak navigasi">
        <Link href="/tools">Tools</Link>
        <ChevronRight size={14} />
        <Link href="/tools?category=automation">Automation</Link>
        <ChevronRight size={14} />
        <span style={{ color: "var(--ss-navy-950)" }}>n8n</span>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection} aria-label="Maklumat n8n">
        <div className={styles.heroLeft}>
          <ToolLogoTile
            name="n8n"
            logoPath="/assets/tools/n8n.png"
            brandColor="#ea4b71"
            size="lg"
          />

          <AnimatedHeading
            text="n8n: automasi kerja tanpa coding."
            accentWords={["automasi", "kerja", "tanpa", "coding."]}
            as="h1"
            className={styles.headline}
          />

          <p className={styles.subtitle}>
            Sambungkan apps, data dan AI dalam satu workflow visual.
          </p>

          <div className={styles.ctaGroup}>
            <PrimaryButton href="/modules/n8n-google-sheets" variant="primary">
              Mula dengan modul RM10
            </PrimaryButton>
            <PrimaryButton href="#modul-n8n" variant="secondary" showArrow={false}>
              Lihat semua modul n8n
            </PrimaryButton>
          </div>

          <div className={styles.highlightsStrip}>
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>
                <Zap size={18} color="#ff5a0a" />
              </div>
              <div className={styles.highlightText}>
                <span className={styles.highlightTitle}>Mudah digunakan</span>
                <span className={styles.highlightDesc}>Drag & drop workflow</span>
              </div>
            </div>

            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>
                <Puzzle size={18} color="#1777f2" />
              </div>
              <div className={styles.highlightText}>
                <span className={styles.highlightTitle}>Sambung 400+ apps</span>
                <span className={styles.highlightDesc}>Tanpa coding</span>
              </div>
            </div>

            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>
                <Users size={18} color="#08bd59" />
              </div>
              <div className={styles.highlightText}>
                <span className={styles.highlightTitle}>Automasi kerja harian</span>
                <span className={styles.highlightDesc}>Jimat masa, lebih fokus</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.workflowBrowserMockup}>
            <Image
              src="/assets/illustrations/n8n-hero-character.png"
              alt="Ilustrasi alur kerja n8n visual bersama pelajar Malaysia"
              width={540}
              height={380}
              priority
              className={styles.heroCharacter}
            />
            <div className={styles.stickySticky}>
              Satu workflow,
              <br />
              banyak hasil.
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div id="modul-n8n" className={styles.mainLayout}>
        {/* Left: Modules list */}
        <section aria-label="Apa yang boleh kau siapkan">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleGroup}>
              <AnimatedHeading
                text="Apa yang boleh kau siapkan?"
                accentWords={["kau", "siapkan?"]}
                as="h2"
                className={styles.sectionTitle}
              />
              <p className={styles.sectionDesc}>
                Modul praktikal n8n untuk kerja sebenar. Satu modul, satu hasil.
              </p>
            </div>
          </div>

          <RevealSection className={styles.modulesGrid}>
            {n8nModules.map((item) => (
              <Link
                key={item.slug}
                href={`/modules/${item.slug}`}
                className={styles.n8nModuleCard}
                data-reveal-item
              >
                <div>
                  <div className={styles.cardHeaderFlow}>
                    {item.icons.map((icon, idx) => (
                      <span key={idx} className={styles.flowSquare}>
                        {icon}
                      </span>
                    ))}
                  </div>

                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>

                  <div className={styles.tagRow}>
                    <span className={styles.cardTag}>{item.tag}</span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.cardMetaGroup}>
                    <span className={styles.price}>RM10</span>
                    <span className={styles.timePill}>
                      <Clock size={14} />
                      {item.time}
                    </span>
                    <span className={styles.levelPill}>{item.level}</span>
                  </div>

                  <div className={styles.cardArrowBtn} aria-hidden="true">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </RevealSection>
        </section>

        {/* Right Sidebar: Sebelum mula */}
        <aside className={styles.sidebarPrereqs} aria-label="Sebelum mula">
          <div className={styles.sidebarHeader}>
            <Settings size={22} color="var(--ss-navy-950)" />
            <h3 className={styles.sidebarTitle}>Sebelum mula</h3>
          </div>
          <p className={styles.sidebarSubtitle}>Pastikan kau dah ada benda ni:</p>

          <div className={styles.prereqList}>
            <div className={styles.prereqItem}>
              <div className={styles.prereqIconWrap}>
                <User size={18} />
              </div>
              <div className={styles.prereqText}>
                <span className={styles.prereqTitle}>Akaun n8n</span>
                <span className={styles.prereqDesc}>
                  Boleh guna n8n Cloud (percuma) atau self-hosted.
                </span>
              </div>
            </div>

            <div className={styles.prereqItem}>
              <div className={styles.prereqIconWrap}>
                <Wifi size={18} />
              </div>
              <div className={styles.prereqText}>
                <span className={styles.prereqTitle}>Akaun apps yang berkaitan</span>
                <span className={styles.prereqDesc}>
                  Contoh: Google, WhatsApp, Gmail, OpenAI, dll.
                </span>
              </div>
            </div>

            <div className={styles.prereqItem}>
              <div className={styles.prereqIconWrap}>
                <ShieldCheck size={18} />
              </div>
              <div className={styles.prereqText}>
                <span className={styles.prereqTitle}>Akses & privasi</span>
                <span className={styles.prereqDesc}>
                  Pastikan kau guna akaun sendiri dan jaga data sensitif.
                </span>
              </div>
            </div>

            <div className={styles.prereqItem}>
              <div className={styles.prereqIconWrap}>
                <Laptop size={18} />
              </div>
              <div className={styles.prereqText}>
                <span className={styles.prereqTitle}>Asas penggunaan</span>
                <span className={styles.prereqDesc}>
                  Tak perlu pandai coding. Modul ini sesuai untuk beginner.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
