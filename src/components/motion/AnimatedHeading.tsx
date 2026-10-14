"use client";

import React, { useRef, useId } from "react";
import { registerGSAP, gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import styles from "./AnimatedHeading.module.css";

interface AnimatedHeadingProps {
  text: string;
  accentWords?: string[];
  highlightWords?: string[];
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  accentColor?: string;
  delay?: number;
}

export function AnimatedHeading({
  text,
  accentWords = [],
  highlightWords,
  as: Component = "h2",
  className = "",
  accentColor,
  delay = 0,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingId = useId();

  const effectiveAccents = highlightWords || accentWords;

  // Normalize accent lookup
  const accentSet = new Set(
    effectiveAccents.map((w) => w.toLowerCase().replace(/[.,!?:;]/g, ""))
  );

  const words = text.split(" ");

  useGSAP(
    () => {
      registerGSAP();

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced || !containerRef.current) return;

      const baseWordEls = containerRef.current.querySelectorAll(
        `[data-word="base"]`
      );
      const accentWordEls = containerRef.current.querySelectorAll(
        `[data-word="accent"]`
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      });

      if (baseWordEls.length > 0) {
        tl.fromTo(
          baseWordEls,
          {
            autoAlpha: 0,
            yPercent: 115,
            rotationX: -12,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotationX: 0,
            stagger: 0.05,
            duration: 0.75,
            ease: "power3.out",
            delay,
          },
          0
        );
      }

      if (accentWordEls.length > 0) {
        tl.fromTo(
          accentWordEls,
          {
            autoAlpha: 0,
            yPercent: 115,
            rotationX: -12,
            scale: 0.94,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotationX: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.78,
            ease: "power3.out",
            delay: delay + 0.08,
          },
          0.05
        );
      }
    },
    { scope: containerRef, dependencies: [text, accentWords] }
  );

  return (
    <div ref={containerRef} className={`${styles.wrapper} ${className}`}>
      {/* Accessible readable heading for Screen Readers */}
      <Component id={headingId} className="sr-only">
        {text}
      </Component>

      {/* Decorative split-word container */}
      <div
        className={styles.visualContainer}
        aria-hidden="true"
        role="presentation"
      >
        {words.map((word, idx) => {
          const cleanWord = word.toLowerCase().replace(/[.,!?:;]/g, "");
          const isAccent = accentSet.has(cleanWord);

          return (
            <span key={`${word}-${idx}`} className={styles.wordMask}>
              <span
                data-word={isAccent ? "accent" : "base"}
                className={`${styles.wordInner} ${isAccent ? styles.accent : ""}`}
                style={isAccent && accentColor ? { color: accentColor } : undefined}
              >
                {word}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
