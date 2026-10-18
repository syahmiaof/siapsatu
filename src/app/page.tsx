import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageFirstHome } from "@/components/home/ImageFirstHome";
import { RevealSection } from "@/components/motion/RevealSection";
import { CommunityNotice } from "@/components/community/CommunityNotice";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div data-home>
      <ImageFirstHome />
      <div className="container">
      <section
        className={styles.businessSection}
        aria-labelledby="business-why"
      >
        <RevealSection className={styles.businessStory}>
          <div data-reveal-item>
            <p className={styles.eyebrow}>Untuk owner bisnes</p>
            <h2 id="business-why">
              Iklan jalan. Content senyap. Lead pula terlepas.
            </h2>
            <p className={styles.storyCopy}>
              Bila semua kena buat sendiri, susah nak konsisten. Mulakan dengan
              kempen yang jelas dan pelan content yang boleh diikuti, kemudian
              susun cara urus lead.
            </p>
            <Link className={styles.textLink} href="/modules?category=bisnes">
              Cari modul untuk bisnes{" "}
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.businessLinks} data-reveal-item>
            <p className={styles.listCaption}>Susun satu demi satu</p>
            <Link href="/modules/meta-ads-ai">
              <div>
                <span>01 · Kempen</span>
                <h3>Meta Ads + AI</h3>
                <p>Jelaskan tawaran sebelum mula beriklan.</p>
              </div>
              <ArrowRight size={24} aria-hidden="true" />
            </Link>
            <Link href="/modules/7-hari-content">
              <div>
                <span>02 · Konsisten</span>
                <h3>7 Hari Content</h3>
                <p>Susun idea, draf dan jadual siaran.</p>
              </div>
              <ArrowRight size={24} aria-hidden="true" />
            </Link>
          </div>
        </RevealSection>
      </section>

      <section className={styles.workSection} aria-labelledby="work-why">
        <RevealSection className={styles.workStory}>
          <div data-reveal-item>
            <p className={styles.eyebrow}>
              Untuk staf pejabat · Admin · Kerani · Setiausaha
            </p>
            <h2 id="work-why">Dokumen bertambah. Kerja sama berulang.</h2>
            <p className={styles.storyCopy}>
              Draf perlu dikemas, laporan perlu dihantar. Bina cara kerja yang
              boleh diulang, dengan semakan sendiri sebelum hasil dikongsi.
            </p>
            <Link className={styles.textLink} href="/modules?category=kerja">
              Cari modul untuk kerja <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.workSheet} data-reveal-item>
            <p className={styles.listCaption}>Dari draf ke rutin</p>
            <Link href="/modules/gemini-canvas">
              <span className={styles.workLabel}>Dokumen</span>
              <h3>Kemas draf dengan Gemini Canvas</h3>
              <span className={styles.workAction}>
                Lihat modul <ArrowRight size={19} aria-hidden="true" />
              </span>
            </Link>
            <Link href="/modules/n8n-weekly-report">
              <span className={styles.workLabel}>Laporan</span>
              <h3>Susun laporan mingguan automatik</h3>
              <span className={styles.workAction}>
                Lihat modul <ArrowRight size={19} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </RevealSection>
      </section>

      <CommunityNotice />
      </div>
    </div>
  );
}
