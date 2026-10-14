"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Search,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Target,
  ArrowLeft,
  ArrowRight,
  Plus,
  Webhook,
  FileSpreadsheet,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { LessonSidebar } from "@/components/learning/LessonSidebar";
import { CopyTemplate } from "@/components/learning/CopyTemplate";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import { MODULES } from "@/data/mockData";
import { getStoredProgress, markStepCompleted } from "@/lib/storage";
import styles from "./reader.module.css";

interface LessonReaderPageProps {
  params: {
    slug: string;
    step: string;
  };
}

export default function LessonReaderPage({ params }: LessonReaderPageProps) {
  const currentModule = MODULES.find((m) => m.slug === params.slug);
  const stepNum = parseInt(params.step, 10) || 1;

  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);
  const [taskDone, setTaskDone] = useState(false);
  const [markedDone, setMarkedDone] = useState(false);

  useEffect(() => {
    const progress = getStoredProgress();
    if (progress.completedSteps[params.slug]) {
      setCompletedSteps(progress.completedSteps[params.slug]);
    }
  }, [params.slug]);

  if (!currentModule) {
    notFound();
  }

  // Find corresponding lesson or fallback to lesson 3
  const activeLesson =
    currentModule.lessons.find((l) => l.stepNumber === stepNum) ||
    currentModule.lessons[2] ||
    currentModule.lessons[0];

  const totalSteps = currentModule.lessons.length || 6;
  const currentStepNumber = activeLesson.stepNumber || stepNum;
  const progressPercent = Math.round((currentStepNumber / totalSteps) * 100);

  const prevStep = currentStepNumber > 1 ? currentStepNumber - 1 : null;
  const nextStep = currentStepNumber < totalSteps ? currentStepNumber + 1 : null;

  function handleMarkComplete() {
    markStepCompleted(currentModule!.slug, currentStepNumber);
    setCompletedSteps((prev) => [...new Set([...prev, currentStepNumber])]);
    setMarkedDone(true);
  }

  return (
    <div>
      {/* Top Reader Navigation Bar */}
      <div className={styles.readerHeader}>
        <div className={`container ${styles.readerHeaderInner}`}>
          <Link href="/">
            <Image
              src="/assets/brand/siapsatu-logo.png"
              alt="SiapSatu"
              width={140}
              height={38}
              style={{ objectFit: "contain" }}
            />
          </Link>

          <div className={styles.searchBox}>
            <Search size={18} color="var(--ss-muted)" />
            <input
              type="text"
              placeholder="Cari modul, topik atau kemahiran..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.readerHeaderRight}>
            <Link href="/library" className={styles.libraryLink}>
              <BookOpen size={18} />
              <span>Pustaka Saya</span>
            </Link>

            <Link href="/progress">
              <Image
                src="/assets/avatars/avatar-user.png"
                alt="Profil pengguna"
                width={36}
                height={36}
                className={styles.userAvatar}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Main 3-Column Layout */}
        <div className={styles.readerLayout}>
          {/* Left Column: Lesson Sidebar */}
          <LessonSidebar
            moduleTitle={currentModule.title}
            moduleSlug={currentModule.slug}
            lessons={currentModule.lessons}
            activeStepNumber={currentStepNumber}
            completedStepNumbers={completedSteps}
          />

          {/* Center Column: Step Content */}
          <main className={styles.centerCol}>
            {/* Progress Bar */}
            <div>
              <div className={styles.progressTop}>
                <span>
                  Langkah {currentStepNumber} daripada {totalSteps}
                </span>
                <span>{progressPercent}% siap</span>
              </div>
              <div className={styles.progressBarWrap}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Main Lesson Heading */}
            <AnimatedHeading
              text={activeLesson.title}
              accentWords={["Google", "Sheets", "design", "workflow"]}
              as="h1"
              className={styles.mainHeadline}
            />

            <p className={styles.lessonSubtitle}>{activeLesson.body}</p>

            {/* Outcome Callout Banner */}
            <div className={styles.outcomeCallout}>
              <div className={styles.outcomeCheck}>
                <CheckCircle2 size={18} strokeWidth={2.5} />
              </div>
              <span>
                {activeLesson.outcomeCallout ||
                  "Hasil langkah ini: data ujian masuk ke spreadsheet."}
              </span>
            </div>

            {/* Step Detail Card */}
            <div className={styles.stepDetailBox}>
              <div className={styles.stepDetailHeader}>
                <span className={styles.badgeNumber}>
                  {String(currentStepNumber).padStart(2, "0")}
                </span>
                <div>
                  <h2 className={styles.stepDetailTitle}>
                    {activeLesson.actionTitle || "Pilih action Google Sheets"}
                  </h2>
                  <p className={styles.stepDetailSub}>
                    {activeLesson.actionSubtitle ||
                      "Sekarang kita tambah nod Google Sheets untuk simpan data yang masuk."}
                  </p>
                </div>
              </div>

              {/* Numbered Instruction Steps */}
              <div className={styles.instructionsList}>
                {(
                  activeLesson.instructions || [
                    {
                      step: 1,
                      title: "Tambah nod Google Sheets",
                      detail:
                        "Dalam editor n8n, klik ikon +, cari Google Sheets dan pilih nod tersebut.",
                    },
                    {
                      step: 2,
                      title: "Pilih operasi",
                      detail:
                        "Tetapkan operasi kepada Append Row supaya setiap data baru akan ditambah sebagai baris baharu.",
                    },
                    {
                      step: 3,
                      title: "Sambungkan dengan kredensial",
                      detail:
                        "Log masuk dengan akaun Google anda dan pilih spreadsheet serta nama sheet yang ingin digunakan.",
                    },
                  ]
                ).map((inst) => (
                  <div key={inst.step} className={styles.instructionItem}>
                    <div className={styles.instructionNum}>{inst.step}</div>
                    <div>
                      <h3 className={styles.instructionTitle}>{inst.title}</h3>
                      <p className={styles.instructionDetail}>{inst.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual Node Editor Mockup */}
              <div className={styles.canvasMockupBox} aria-hidden="true">
                <div className={styles.canvasTopBar}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Image
                      src="/assets/tools/n8n.png"
                      alt="n8n"
                      width={20}
                      height={20}
                    />
                    <span>Lead ke Google Sheets</span>
                  </div>
                </div>

                <div className={styles.nodesFlowVisual}>
                  <div className={styles.canvasNode}>
                    <div
                      className={styles.nodeIconSquare}
                      style={{ background: "#ea4b71" }}
                    >
                      <Webhook size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.88rem" }}>
                        Webhook
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--ss-muted)" }}>
                        trigger
                      </div>
                    </div>
                  </div>

                  <ArrowRight size={18} color="var(--ss-muted)" />

                  <div className={styles.canvasNode}>
                    <div
                      className={styles.nodeIconSquare}
                      style={{ background: "#08bd59" }}
                    >
                      <FileSpreadsheet size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.88rem" }}>
                        Google Sheets
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--ss-muted)" }}>
                        append: sheet
                      </div>
                    </div>
                  </div>
                </div>

                <button type="button" className={styles.addNodeBtn}>
                  <Plus size={14} style={{ display: "inline", marginRight: "4px" }} />
                  Add node
                </button>
              </div>

              {/* Official Tool Link Strip */}
              <div className={styles.officialLinkStrip}>
                <div className={styles.officialLeft}>
                  <Image
                    src="/assets/tools/n8n.png"
                    alt="n8n"
                    width={40}
                    height={40}
                    style={{ borderRadius: "8px" }}
                  />
                  <div>
                    <div className={styles.officialTitle}>
                      Buka n8n (laman rasmi)
                    </div>
                    <div className={styles.officialSub}>
                      Gunakan n8n Cloud atau self-hosted anda.
                    </div>
                  </div>
                </div>

                <a
                  href="https://n8n.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalOpenBtn}
                >
                  <span>Buka n8n</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </main>

          {/* Right Column: Copyable Template & Practice Task */}
          <aside className={styles.rightCol}>
            {/* Copy Template */}
            <CopyTemplate
              code={
                activeLesson.template ||
                `{\n  "nodes": [\n    {\n      "name": "Google Sheets",\n      "type": "n8n-nodes-base.googleSheets",\n      "typeVersion": 4,\n      "position": [800, 300]\n    }\n  ]\n}`
              }
              title="Template untuk disalin"
            />

            {/* Task Container */}
            <div className={styles.taskBox}>
              <div className={styles.taskHeader}>
                <Target size={22} color="var(--ss-orange)" />
                <span>Cuba sekarang</span>
              </div>
              <p className={styles.taskText}>
                {activeLesson.task ||
                  "Sambungkan n8n ke Google Sheets anda dan hantar satu data ujian. Pastikan ia masuk sebagai baris baharu dalam spreadsheet."}
              </p>
              <button
                type="button"
                onClick={() => setTaskDone(!taskDone)}
                className={styles.taskSuccessBtn}
              >
                <span>{taskDone ? "✓ Berjaya diselesaikan" : "Saya dah berjaya ✓"}</span>
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky Bottom Dock */}
      <div className={styles.bottomActionDock}>
        <div className={`container ${styles.bottomDockInner}`}>
          {prevStep ? (
            <Link
              href={`/learn/${currentModule.slug}/${prevStep}`}
              className={styles.prevBtn}
            >
              <ArrowLeft size={16} />
              <span>Sebelumnya: Langkah {prevStep}</span>
            </Link>
          ) : (
            <div />
          )}

          <div className={styles.rightDockButtons}>
            <button
              type="button"
              onClick={handleMarkComplete}
              className={styles.markCompleteBtn}
            >
              <span>{markedDone ? "Langkah telah siap ✓" : "Tanda langkah siap ✓"}</span>
            </button>

            {nextStep && (
              <PrimaryButton
                href={`/learn/${currentModule.slug}/${nextStep}`}
                variant="primary"
              >
                Seterusnya: Langkah {nextStep}
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
