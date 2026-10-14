"use client";

import React, { useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function RevealSection({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
}: RevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      if (!containerRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!containerRef.current) return;
        const items =
          containerRef.current.querySelectorAll("[data-reveal-item]");
        if (items.length === 0) return;

        gsap.from(items, {
          y: 24,
          stagger,
          duration: 0.55,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
