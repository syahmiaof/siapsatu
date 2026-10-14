"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";

/** Route-scoped entrance. Text stays readable while the layout settles. */
export function PageMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useGSAP(
    () => {
      registerGSAP();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current;
        if (!root) return;
        const nav = root.querySelector("header");
        const heading = root.querySelector("h1")?.closest("[data-heading]");
        const copy = heading?.parentElement?.querySelectorAll(
          ":scope > p, :scope > [data-hero-actions]",
        );
        const art = root.querySelector("[data-hero-art]");
        const tl = gsap.timeline({
          defaults: { ease: "power2.out", duration: 0.55 },
        });
        if (nav) tl.from(nav, { y: -8 }, 0);
        if (copy?.length) tl.from(copy, { y: 10, stagger: 0.07 }, 0.3);
        if (art) tl.from(art, { y: 14 }, 0.55);
      });
      return () => mm.revert();
    },
    { scope, dependencies: [pathname], revertOnUpdate: true },
  );
  return (
    <div ref={scope} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
