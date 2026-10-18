import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building,
  Code2,
  GraduationCap,
} from "lucide-react";
import { HeroArtwork } from "@/components/brand/HeroArtwork";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RevealSection } from "@/components/motion/RevealSection";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { CommunityNotice } from "@/components/community/CommunityNotice";
import { MODULES } from "@/data/mockData";
import styles from "./page.module.css";

// Homepage presentation only: catalogue titles, availability and themes stay intact.
const studentOutcomes = [
  {
    slug: "gemini-slide-assignment",
    title: "Siapkan slide yang jelas",
    theme: "navy",
  },
  { slug: "notebooklm-pdf-study", title: "Faham bahan PDF", theme: "crimson" },
  { slug: "vibe-code-website", title: "Bina website pertama", theme: "green" },
] as const;

const audiences = [
  { category: "student", label: "Student", Icon: GraduationCap },
  { category: "bisnes", label: "Bisnes", Icon: Briefcase },
  { category: "kerja", label: "Kerja", Icon: Building },
] as const;

export default function HomePage() {
  return (
    <div className="container" data-home>
      <section className={styles.heroSection} aria-label="Pengenalan SiapSatu">
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <AnimatedHeading
              steadyEntrance
              text="Satu modul. Satu hasil."
              breakAfter={2}
              accentFrom={2}
              as="h1"
              className={styles.heroHeadline}
            />
            <p className={styles.subtitle}>
              Assignment, slide atau portfolio—pilih satu hasil dan buat langkah
              demi langkah.
            </p>
            <div className={styles.ctaContainer}>
              <PrimaryButton href="/modules?category=student" variant="primary">
                Pilih hasil pertama
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
            <nav
              className={styles.audienceChips}
              aria-label="Pilih ikut keperluan"
            >
              {audiences.map(({ category, label, Icon }) => (
                <Link
                  key={category}
                  href={`/modules?category=${category}`}
                  className={styles.audienceChip}
                >
                  <span className={styles.chipIconWrap}>
                    <Icon size={28} aria-hidden="true" />
                  </span>
                  <span>
                    <span className={styles.chipCaption}>Untuk</span> {label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroIllustrationWrap}>
              <HeroArtwork />
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.featuredSection}
        aria-label="Hasil pertama untuk student"
      >
        <RevealSection className={styles.featuredGrid} together>
          {studentOutcomes.map(({ slug, title, theme }) => {
            const selectedModule = MODULES.find((item) => item.slug === slug);
            if (!selectedModule)
              throw new Error(
                `Homepage module missing from catalogue: ${slug}`,
              );
            return (
              <ModuleCard
                key={slug}
                module={selectedModule}
                variant="featured"
                displayTitle={title}
                theme={theme}
                showPrice={false}
                actionLabel="Lihat modul"
              />
            );
          })}
        </RevealSection>
      </section>

      <section className={styles.studentSection} aria-labelledby="student-why">
        <RevealSection className={styles.studentStory}>
          <div data-reveal-item>
            <p className={styles.eyebrow}>Untuk student · Mula dari satu</p>
            <h2 id="student-why">
              Bila tak tahu mula, tugasan kecil pun rasa besar.
            </h2>
            <p className={styles.storyCopy}>
              Bahan dah ada. Idea masih berselerak. Pilih satu benda yang nak
              disiapkan, kemudian buat satu langkah pada satu masa.
            </p>
            <Link className={styles.textLink} href="/modules?category=student">
              Cari hasil untuk tugasan kau{" "}
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
          <ol className={styles.learningSteps} data-reveal-item>
            <li>
              <span className={styles.stepNumber}>01</span>
              <div>
                <h3>Pilih hasil</h3>
                <p>
                  Slide untuk dibentang, PDF untuk difahami atau website untuk
                  portfolio.
                </p>
              </div>
            </li>
            <li>
              <span className={styles.stepNumber}>02</span>
              <div>
                <h3>Ikut langkah</h3>
                <p>
                  Buka tool, cuba contoh dan ubah ikut keperluan tugasan
                  sendiri.
                </p>
              </div>
            </li>
            <li>
              <span className={styles.stepNumber}>03</span>
              <div>
                <h3>Faham dan tunjuk kerja sendiri</h3>
                <p>
                  Semak fakta dan sumber. Pastikan kau boleh terangkan hasilnya
                  dengan ayat sendiri.
                </p>
              </div>
            </li>
          </ol>
        </RevealSection>
        <aside
          className={styles.codingEntry}
          aria-label="Untuk student CS dan IT"
        >
          <Code2 size={26} aria-hidden="true" />
          <p>
            <strong>Student CS / IT?</strong> Simpan projek pertama dan rekod
            perubahan kod.
          </p>
          <Link className={styles.textLink} href="/modules/github-dari-kosong">
            Mula dengan GitHub <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <section
        className={styles.businessSection}
        aria-labelledby="business-why"
      >
        <RevealSection className={styles.businessStory}>
          <div data-reveal-item>
            <p className={styles.eyebrow}>Untuk owner bisnes</p>
            <h2 id="business-why">
              Iklan jalan. Content senyap. Lead pula terlepas.
            </h2>
            <p className={styles.storyCopy}>
              Bila semua kena buat sendiri, susah nak konsisten. Mulakan dengan
              kempen yang jelas dan pelan content yang boleh diikuti, kemudian
              susun cara urus lead.
            </p>
            <Link className={styles.textLink} href="/modules?category=bisnes">
              Cari modul untuk bisnes{" "}
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.businessLinks} data-reveal-item>
            <p className={styles.listCaption}>Susun satu demi satu</p>
            <Link href="/modules/meta-ads-ai">
              <div>
                <span>01 · Kempen</span>
                <h3>Meta Ads + AI</h3>
                <p>Jelaskan tawaran sebelum mula beriklan.</p>
              </div>
              <ArrowRight size={24} aria-hidden="true" />
            </Link>
            <Link href="/modules/7-hari-content">
              <div>
                <span>02 · Konsisten</span>
                <h3>7 Hari Content</h3>
                <p>Susun idea, draf dan jadual siaran.</p>
              </div>
              <ArrowRight size={24} aria-hidden="true" />
            </Link>
          </div>
        </RevealSection>
      </section>

      <section className={styles.workSection} aria-labelledby="work-why">
        <RevealSection className={styles.workStory}>
          <div data-reveal-item>
            <p className={styles.eyebrow}>
              Untuk staf pejabat · Admin · Kerani · Setiausaha
            </p>
            <h2 id="work-why">Dokumen bertambah. Kerja sama berulang.</h2>
            <p className={styles.storyCopy}>
              Draf perlu dikemas, laporan perlu dihantar. Bina cara kerja yang
              boleh diulang, dengan semakan sendiri sebelum hasil dikongsi.
            </p>
            <Link className={styles.textLink} href="/modules?category=kerja">
              Cari modul untuk kerja <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.workSheet} data-reveal-item>
            <p className={styles.listCaption}>Dari draf ke rutin</p>
            <Link href="/modules/gemini-canvas">
              <span className={styles.workLabel}>Dokumen</span>
              <h3>Kemas draf dengan Gemini Canvas</h3>
              <span className={styles.workAction}>
                Lihat modul <ArrowRight size={19} aria-hidden="true" />
              </span>
            </Link>
            <Link href="/modules/n8n-weekly-report">
              <span className={styles.workLabel}>Laporan</span>
              <h3>Susun laporan mingguan automatik</h3>
              <span className={styles.workAction}>
                Lihat modul <ArrowRight size={19} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </RevealSection>
      </section>

      <CommunityNotice />
    </div>
  );
}
