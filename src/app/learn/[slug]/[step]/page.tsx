"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Target,
} from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { LessonSidebar } from "@/components/learning/LessonSidebar";
import { CopyTemplate } from "@/components/learning/CopyTemplate";
import { WorkflowDiagram } from "@/components/learning/WorkflowDiagram";
import { BrandScene } from "@/components/brand/BrandScene";
import { PrimaryButton } from "@/components/brand/PrimaryButton";
import { MODULES } from "@/data/mockData";
import { getStoredProgress, markStepCompleted } from "@/lib/storage";
import styles from "./reader.module.css";

export default function LessonReaderPage({
  params,
}: {
  params: { slug: string; step: string };
}) {
  const learningModule = MODULES.find((m) => m.slug === params.slug);
  const step = Number(params.step);
  const lesson = learningModule?.lessons.find((l) => l.stepNumber === step);
  const chaptersRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (chaptersRef.current) chaptersRef.current.open = window.innerWidth > 700;
  }, []);
  const [completed, setCompleted] = useState<number[]>([]);
  const [taskDone, setTaskDone] = useState(false);
  const [markedDone, setMarkedDone] = useState(false);
  useEffect(() => {
    const saved = getStoredProgress().completedSteps[params.slug] || [];
    setCompleted(saved);
    setMarkedDone(saved.includes(Number(params.step)));
    setTaskDone(false);
  }, [params.slug, params.step]);
  if (!learningModule || !lesson || !Number.isInteger(step)) notFound();
  const percent = Math.round(
    (completed.length / learningModule.lessons.length) * 100,
  );
  const instructions = lesson.instructions || [
    { step: 1, title: lesson.title, detail: lesson.body },
  ];
  const template =
    lesson.template ||
    `Catatan langkah ${step}: ${lesson.title}\nHasil yang saya dapat:\nPerkara yang perlu disemak:`;
  function complete() {
    const saved = markStepCompleted(params.slug, step);
    setCompleted(saved.completedSteps[params.slug]);
    setMarkedDone(true);
  }
  return (
    <div data-reader>
      <header className={styles.readerHeader}>
        <div className={`container ${styles.readerHeaderInner}`}>
          <Link href="/" aria-label="SiapSatu Home">
            <Image
              src="/assets/brand/siapsatu-display.png"
              alt="SiapSatu"
              width={1611}
              height={455}
              className={styles.readerLogo}
              priority
            />
          </Link>
          <form action="/modules" className={styles.searchBox} role="search">
            <input
              name="search"
              aria-label="Cari modul"
              placeholder="Cari modul, topik atau kemahiran..."
              className={styles.searchInput}
            />
          </form>
          <Link href="/library" className={styles.libraryLink}>
            <BookOpen size={18} />
            <span>Pustaka Saya</span>
          </Link>
        </div>
      </header>
      <div className={`container ${styles.readerLayout}`}>
        <details ref={chaptersRef} className={styles.chapterMenu} open>
          <summary>Langkah modul</summary>
          <LessonSidebar
            moduleTitle={learningModule.title}
            moduleSlug={learningModule.slug}
            lessons={learningModule.lessons}
            activeStepNumber={step}
            completedStepNumbers={completed}
          />
        </details>
        <article className={styles.centerCol}>
          <div>
            <div className={styles.progressTop}>
              <span>
                Langkah {step} daripada {learningModule.lessons.length}
              </span>
              <span>{percent}% siap</span>
            </div>
            <div className={styles.progressBarWrap}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          <AnimatedHeading
            text={lesson.title}
            accentWords={["n8n", "Google", "Sheets"]}
            as="h1"
            className={styles.mainHeadline}
          />
          <p className={styles.lessonSubtitle}>{lesson.body}</p>
          <div className={styles.outcomeCallout}>
            <CheckCircle2 size={22} />
            <span>
              {lesson.outcomeCallout ||
                `Hasil langkah ini: ${lesson.title.toLowerCase()}.`}
            </span>
          </div>
          <section className={styles.stepDetailBox}>
            <div className={styles.stepDetailHeader}>
              <span className={styles.badgeNumber}>
                {String(step).padStart(2, "0")}
              </span>
              <div>
                <h2 className={styles.stepDetailTitle}>
                  {lesson.actionTitle || lesson.title}
                </h2>
                <p className={styles.stepDetailSub}>
                  {lesson.actionSubtitle ||
                    "Ikut panduan dan semak hasil sebelum teruskan."}
                </p>
              </div>
            </div>
            <div className={styles.lessonBodyGrid}>
              <ol className={styles.instructionsList}>
                {instructions.map((i) => (
                  <li className={styles.instructionItem} key={i.step}>
                    <span className={styles.instructionNum}>{i.step}</span>
                    <div>
                      <h3 className={styles.instructionTitle}>{i.title}</h3>
                      <p className={styles.instructionDetail}>{i.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {learningModule.toolSlugs.includes("n8n") && (
                <WorkflowDiagram setup={step < 3} compact />
              )}
            </div>
            {lesson.officialLinks.map((link) => (
              <div className={styles.officialLinkStrip} key={link.href}>
                <div>
                  <strong>{link.label}</strong>
                  <p className={styles.officialSub}>Panduan dan tool rasmi</p>
                </div>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalOpenBtn}
                >
                  Buka <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </section>
        </article>
        <aside className={styles.rightCol}>
          <div className={styles.readerArt}>
            <BrandScene variant="learner" />
          </div>
          <CopyTemplate code={template} title="Template untuk disalin" />
          <section className={styles.taskBox}>
            <h2 className={styles.taskHeader}>
              <Target size={22} />
              Cuba sekarang
            </h2>
            <p className={styles.taskText}>
              {lesson.task ||
                `Cuba langkah ini dengan contoh sendiri dan catat hasilnya.`}
            </p>
            <button
              type="button"
              aria-pressed={taskDone}
              className={styles.taskSuccessBtn}
              onClick={() => setTaskDone(!taskDone)}
            >
              {taskDone ? "Berjaya diselesaikan ✓" : "Saya dah berjaya ✓"}
            </button>
          </section>
          <p className="prototype-note">
            Reader demo · progress disimpan pada browser ini.
          </p>
        </aside>
      </div>
      <footer className={styles.bottomActionDock} data-fixed-dock>
        <div className={`container ${styles.bottomDockInner}`}>
          <Link
            href={
              step > 1
                ? `/learn/${learningModule.slug}/${step - 1}`
                : `/modules/${learningModule.slug}`
            }
            className={styles.prevBtn}
          >
            <ArrowLeft size={16} />
            <span>{step > 1 ? "Sebelumnya" : "Isi modul"}</span>
          </Link>
          <div className={styles.rightDockButtons}>
            <button
              type="button"
              onClick={complete}
              className={styles.markCompleteBtn}
            >
              {markedDone ? "Langkah telah siap ✓" : "Tanda langkah siap ✓"}
            </button>
            <PrimaryButton
              href={
                step < learningModule.lessons.length
                  ? `/learn/${learningModule.slug}/${step + 1}`
                  : "/library"
              }
            >
              {step < learningModule.lessons.length
                ? `Seterusnya: Langkah ${step + 1}`
                : "Kembali ke pustaka"}
            </PrimaryButton>
          </div>
        </div>
      </footer>
    </div>
  );
}
