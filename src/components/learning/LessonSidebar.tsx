import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Lesson } from "@/types";
import styles from "./LessonSidebar.module.css";

interface LessonSidebarProps {
  moduleTitle: string;
  moduleSlug: string;
  lessons: Lesson[];
  activeStepNumber: number;
  completedStepNumbers?: number[];
  className?: string;
}

export function LessonSidebar({
  moduleTitle,
  moduleSlug,
  lessons,
  activeStepNumber,
  completedStepNumbers = [],
  className = "",
}: LessonSidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${className}`} aria-label="Senarai Langkah">
      <h2 className={styles.moduleTitle}>{moduleTitle}</h2>

      <div className={styles.stepRail}>
        {lessons.map((lesson) => {
          const isActive = lesson.stepNumber === activeStepNumber;
          const isCompleted = completedStepNumbers.includes(lesson.stepNumber);

          return (
            <Link
              key={lesson.id}
              href={`/learn/${moduleSlug}/${lesson.stepNumber}`}
              className={`${styles.stepItem} ${isActive ? styles.active : ""} ${
                isCompleted ? styles.completed : ""
              }`}
            >
              <div className={styles.nodeCircle}>
                {isCompleted ? <Check size={14} /> : lesson.stepNumber}
              </div>
              <span>{lesson.title}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
