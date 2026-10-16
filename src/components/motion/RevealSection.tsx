"use client";

import React, { useRef } from "react";
import { registerGSAP, gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  together?: boolean;
}

export function RevealSection({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  together = false,
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

        // Explicit endpoint avoids capturing an in-flight CSS hover transition.
        // A featured row moves as one unit so its cards remain aligned throughout.
        gsap.fromTo(
          together ? containerRef.current : items,
          { y: 6 },
          {
            y: 0,
            clearProps: "transform,translate,rotate,scale",
            stagger: together ? 0 : Math.min(stagger, 0.03),
            duration: 0.4,
            ease: "power2.out",
            delay,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          },
        );
      });
      return () => mm.revert();
    },
    {
      scope: containerRef,
      dependencies: [together, stagger, delay],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
