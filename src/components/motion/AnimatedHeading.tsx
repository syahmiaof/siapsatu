"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import styles from "./AnimatedHeading.module.css";
interface AnimatedHeadingProps {
  text: string;
  accentWords?: string[];
  highlightWords?: string[];
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  accentColor?: string;
  delay?: number;
  breakAfter?: number;
  mobileBreakAfter?: number;
  accentFrom?: number;
  steadyEntrance?: boolean;
}
export function AnimatedHeading({
  text,
  accentWords = [],
  highlightWords,
  as: Tag = "h2",
  className = "",
  accentColor,
  delay = 0,
  breakAfter,
  mobileBreakAfter,
  accentFrom,
  steadyEntrance = false,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const accents = new Set(
    (highlightWords || accentWords).map((w) =>
      w.toLowerCase().replace(/[.,!?:;]/g, ""),
    ),
  );
  useGSAP(
    () => {
      registerGSAP();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-word]",
          steadyEntrance
            ? { yPercent: 0, scale: 0.98, autoAlpha: 1 }
            : { yPercent: 110, autoAlpha: 0 },
          {
            yPercent: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.045,
            delay: delay + (Tag === "h1" ? 0.12 : 0),
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 96%",
              toggleActions: steadyEntrance
                ? "play none none none"
                : "play none none reverse",
            },
          },
        );
      });
      return () => mm.revert();
    },
    {
      scope: ref,
      dependencies: [text, delay, steadyEntrance],
      revertOnUpdate: true,
    },
  );
  return (
    <div ref={ref} className={`${styles.wrapper} ${className}`} data-heading>
      <Tag aria-label={text} className={styles.heading}>
        {text.split(" ").map((word, i) => (
          <React.Fragment key={`${i}-${word}`}>
            {i > 0 &&
              (i === breakAfter ? (
                <br />
              ) : i === mobileBreakAfter ? (
                <>
                  <br className={styles.mobileBreak} />
                  <span className={styles.desktopSpace}> </span>
                </>
              ) : (
                " "
              ))}
            <span className={styles.wordMask} aria-hidden="true">
              <span
                data-word
                className={`${styles.wordInner} ${(accentFrom !== undefined ? i >= accentFrom : accents.has(word.toLowerCase().replace(/[.,!?:;]/g, ""))) ? styles.accent : ""}`}
                style={
                  accentColor
                    ? ({
                        "--heading-accent": accentColor,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                {word}
              </span>
            </span>
          </React.Fragment>
        ))}
      </Tag>
    </div>
  );
}
