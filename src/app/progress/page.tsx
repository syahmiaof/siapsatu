"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Share2,
  BookOpen,
  Users,
  User,
  HelpCircle,
  CheckCircle2,
  Circle,
  Lock,
  ArrowRight,
  FileText,
  Rocket,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RevealSection } from "@/components/motion/RevealSection";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import { PROGRESS_TRACKS } from "@/data/mockData";
import styles from "./progress.module.css";

export default function ProgressMapPage() {
  const railItems = [
    { label: "Utama", href: "/", icon: Home },
    { label: "Peta Hasil", href: "/progress", icon: Share2, active: true },
    { label: "Modul", href: "/modules", icon: BookOpen },
    { label: "Komuniti", href: "/community", icon: Users },
    { label: "Profil", href: "/library", icon: User },
    { label: "Bantuan", href: "#", icon: HelpCircle },
  ];

  function renderStatusPill(status: string) {
    switch (status) {
      case "siap":
        return (
          <span className={`${styles.nodeStatusPill} ${styles.statusSiap}`}>
            <CheckCircle2 size={13} />
            <span>Siap</span>
          </span>
        );
      case "seterusnya":
        return (
          <span className={`${styles.nodeStatusPill} ${styles.statusSeterusnya}`}>
            <Circle size={13} />
            <span>Seterusnya</span>
          </span>
        );
      case "dalam_progress":
        return (
          <span className={`${styles.nodeStatusPill} ${styles.statusProgress}`}>
            <Circle size={13} />
            <span>Dalam progress</span>
          </span>
        );
      case "akan_datang":
      default:
        return (
          <span className={`${styles.nodeStatusPill} ${styles.statusAkanDatang}`}>
            <Lock size={13} />
            <span>Akan datang</span>
          </span>
        );
    }
  }

  return (
    <div className={styles.pageContainer}>
      {/* Left Vertical App Rail */}
      <nav className={styles.leftRail} aria-label="Navigasi Aplikasi">
        {railItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.railLink} ${
                item.active ? styles.railActive : ""
              }`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Header Hero Grid */}
        <section className={styles.headerGrid} aria-label="Peta Hasil Saya">
          <div className={styles.headerLeft}>
            <AnimatedHeading
              text="Peta Hasil Saya"
              accentWords={["Hasil", "Saya"]}
              as="h1"
              className={styles.headline}
            />
            <p className={styles.subtitle}>
              Nampak apa yang dah siap dan apa yang boleh dibuat seterusnya.
            </p>

            {/* 3 Metric Stats */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <FileText size={24} className={styles.statIcon} />
                <div>
                  <div className={styles.statNumTitle}>3 hasil siap</div>
                  <div className={styles.statSub}>
                    Artefak sebenar, bukan markah.
                  </div>
                </div>
              </div>

              <div className={styles.statCard}>
                <Share2 size={24} className={styles.statIcon} />
                <div>
                  <div className={styles.statNumTitle}>2 laluan aktif</div>
                  <div className={styles.statSub}>Sedang dalam progress.</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <BookOpen size={24} className={styles.statIcon} />
                <div>
                  <div className={styles.statNumTitle}>6 modul seterusnya</div>
                  <div className={styles.statSub}>Disyorkan untuk anda.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/assets/illustrations/hero-learners.png"
              alt="Ilustrasi peta hasil pembelajaran"
              width={480}
              height={300}
              priority
              className={styles.headerArtwork}
            />
          </div>
        </section>

        {/* 3 Tracks Pipeline */}
        <div className={styles.tracksContainer}>
          {PROGRESS_TRACKS.map((track) => {
            const sideClass =
              track.color === "crimson"
                ? styles.sideCrimson
                : track.color === "green"
                ? styles.sideGreen
                : styles.sideNavy;

            return (
              <div key={track.id} className={styles.trackRow}>
                {/* Track Left Info */}
                <div className={`${styles.trackSideHeader} ${sideClass}`}>
                  <span className={styles.trackNumber}>{track.number}</span>
                  <h2 className={styles.trackTitle}>{track.title}</h2>
                  <p className={styles.trackDesc}>{track.description}</p>
                </div>

                {/* Track Steps Pipeline */}
                <div className={styles.trackPipeline}>
                  {track.steps.map((step, idx) => (
                    <React.Fragment key={step.id}>
                      <div className={styles.stepNodeCard}>
                        {renderStatusPill(step.status)}

                        <div>
                          <h3 className={styles.nodeTitle}>{step.title}</h3>
                          <p className={styles.nodeDesc}>{step.description}</p>
                        </div>

                        {step.artifactPreview && (
                          <div className={styles.artifactBox}>
                            <div className={styles.artifactLabel}>
                              {step.artifactPreview.label}
                            </div>
                            {step.artifactPreview.items && (
                              <ul className={styles.artifactItems}>
                                {step.artifactPreview.items.map((it, i) => (
                                  <li key={i}>{it}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>

                      {idx < track.steps.length - 1 && (
                        <ArrowRight
                          size={18}
                          color="var(--ss-muted)"
                          style={{ flexShrink: 0 }}
                          aria-hidden="true"
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Rocket Action Strip */}
        <div className={styles.bottomRocketBar}>
          <div className={styles.rocketGroup}>
            <div className={styles.rocketIcon} aria-hidden="true">
              🚀
            </div>
            <div className={styles.rocketText}>
              <div className={styles.rocketTitle}>
                Teruskan perjalanan anda.
              </div>
              <div className={styles.rocketSub}>Satu modul. Satu hasil.</div>
            </div>
          </div>

          <PrimaryButton href="/modules" variant="primary">
            Pilih hasil seterusnya
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
