"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { useDialogFocus } from "@/lib/useDialogFocus";
import { DesktopMegaMenu } from "@/components/navigation/DesktopMegaMenu";
import { MobileMenuSheet } from "@/components/navigation/MobileMenuSheet";
import { HOME_SUPPORT, HOME_TOPICS, type PlannedHomeTopic } from "./homeTopics";
import styles from "./ImageFirstHome.module.css";

const ASSETS = "/assets/home/build-with-ai-v3";

function ReferenceNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeMega = useCallback(() => setMegaOpen(false), []);
  return (
    <header className={styles.header}>
      <Link href="/" className={`${styles.hotspot} ${styles.logo}`} aria-label="SiapSatu Home" />
      <nav className={styles.desktopNavigation} aria-label="Navigasi Utama">
        <div className={styles.moduleMenu} onMouseEnter={() => setMegaOpen(true)} onMouseLeave={closeMega}>
          <button className={styles.hotspot} aria-label="Modul" aria-haspopup="menu" aria-expanded={megaOpen} onClick={() => setMegaOpen(true)} onKeyDown={event => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setMegaOpen(true);
              const parent = event.currentTarget.parentElement;
              requestAnimationFrame(() => parent?.querySelector<HTMLAnchorElement>('[role="menu"] a')?.focus());
            }
          }} />
          <DesktopMegaMenu isOpen={megaOpen} onClose={closeMega} />
        </div>
        <Link href="/tools" className={`${styles.hotspot} ${styles.tools}`} aria-label="Tools" />
        <Link href="/paths/ai-automation" className={`${styles.hotspot} ${styles.paths}`} aria-label="Laluan" />
        <Link href="/community" className={`${styles.hotspot} ${styles.community}`} aria-label="Komuniti" />
        <Link href="/login" className={`${styles.hotspot} ${styles.login}`} aria-label="Login" />
      </nav>
      <div className={styles.mobileNavigation}>
        <Link href="/modules" className={`${styles.hotspot} ${styles.search}`} aria-label="Cari modul" />
        <button className={`${styles.hotspot} ${styles.menu}`} aria-label="Buka menu" onClick={() => setMobileOpen(true)} />
      </div>
      <MobileMenuSheet isOpen={mobileOpen} onClose={closeMobile} />
    </header>
  );
}

export function ImageFirstHome() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const [planned, setPlanned] = useState<PlannedHomeTopic | null>(null);
  const close = useCallback(() => setPlanned(null), []);
  useDialogFocus(Boolean(planned), dialog, close);

  useGSAP(() => {
    registerGSAP();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(root.current?.querySelectorAll("[data-topic-card]") ?? [], { y: 4 }, {
        y: 0, stagger: 0.035, duration: 0.35, ease: "power2.out", clearProps: "transform",
        scrollTrigger: { trigger: root.current?.querySelector("#topik"), start: "top 95%", toggleActions: "play none none none" },
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root} className={styles.reference} data-image-home>
      <section className={styles.hero} aria-label="Bina sesuatu dengan AI">
        <picture className={styles.heroImage} data-hero-art>
          <source media="(min-width: 1100px)" srcSet={`${ASSETS}/hero-desktop.webp`} width={1536} height={572} />
          <Image src={`${ASSETS}/hero-mobile.webp`} width={809} height={598} alt="" priority unoptimized />
        </picture>
        <ReferenceNavigation />
        <p className="sr-only">Platform belajar tools AI untuk Malaysia</p>
        <h1 className="sr-only">AI dah ada di mana-mana. Kini giliran kau bina sesuatu.</h1>
        <p className={styles.support}>{HOME_SUPPORT}</p>
        <a href="#topik" className={`${styles.hotspot} ${styles.heroCta}`} onClick={() => requestAnimationFrame(() => document.getElementById("topik")?.focus({ preventScroll: true }))}>
          <span className="sr-only">Teroka apa yang boleh dibina</span>
        </a>
        <p className="sr-only">Tak perlu jadi orang IT untuk mula.</p>
        <nav aria-label="Pilih ikut keperluan" className={styles.audiences}>
          {(["Student", "Bisnes", "Kerja"] as const).map(name => (
            <Link key={name} href={`/modules?category=${name.toLowerCase()}`} className={styles.hotspot} aria-label={`Untuk ${name}`} />
          ))}
        </nav>
      </section>

      <section id="topik" aria-label="Lima topik untuk diteroka" tabIndex={-1} className={styles.gallery}>
        {HOME_TOPICS.map((topic, index) => {
          const art = (
            <>
              <picture>
                <source media="(min-width: 1100px)" srcSet={`${ASSETS}/topic-${index + 1}-desktop.webp`} width={topic.desktopWidth} height={452} />
                <Image src={`${ASSETS}/topic-${index + 1}-mobile.webp`} alt="" width={809} height={topic.mobileHeight} unoptimized />
              </picture>
              <span className="sr-only" id={`topic-${topic.id}`}><strong>{topic.title}.</strong> {topic.promise}. {"href" in topic ? topic.description : "Dalam perancangan. " + topic.description}</span>
            </>
          );
          const props = {
            className: styles.topic,
            "data-topic-card": topic.id,
            "aria-label": `Teroka topik: ${topic.title}`,
            "aria-describedby": `topic-${topic.id}`,
            style: { "--mobile-ratio": `809 / ${topic.mobileHeight}`, "--desktop-ratio": `${topic.desktopWidth} / 452` } as CSSProperties,
          };
          return "href" in topic ? (
            <Link key={topic.id} {...props} href={topic.href}>{art}</Link>
          ) : (
            <button key={topic.id} {...props} type="button" aria-haspopup="dialog" onClick={() => setPlanned(topic)}>{art}</button>
          );
        })}
      </section>
      <p className={styles.truthNote}>Gambar menunjukkan contoh hasil. Website dan automasi mempunyai modul untuk diteroka; laluan penuh App, AI agent dan Content AI masih dalam perancangan.</p>

      {planned && (
        <div className={styles.dialogBackdrop} onClick={close}>
          <div ref={dialog} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="planned-title" aria-describedby="planned-description" onClick={event => event.stopPropagation()}>
            <button className={styles.closeButton} onClick={close}>Tutup</button>
            <p className={styles.plannedLabel}>Dalam perancangan</p>
            <h2 id="planned-title">{planned.title}</h2>
            <p id="planned-description">{planned.description}</p>
            <Link href={planned.discoveryHref} className={styles.discoveryLink}>{planned.discoveryLabel} <span aria-hidden="true">→</span></Link>
            <p className={styles.dialogNote}>Teroka tool dahulu. Tiada pembelian untuk laluan konsep ini.</p>
          </div>
        </div>
      )}
    </div>
  );
}
