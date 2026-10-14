"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Info,
} from "lucide-react";
import styles from "./login.module.css";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.cardAccentBar} />

        <div className={styles.logoHeader}>
          <Link href="/">
            <Image
              src="/assets/brand/siapsatu-display.png"
              alt="SiapSatu - Satu modul. Satu hasil."
              width={160}
              height={44}
              priority
              style={{ height: "auto" }}
            />
          </Link>
          <AnimatedHeading
            text="Masuk ke Pembelajaran"
            highlightWords={["Pembelajaran"]}
            as="h1"
            className={styles.loginTitle}
          />
          <p className={styles.loginSub}>
            Teroka pengalaman belajar SiapSatu. Ini pratonton frontend; akaun
            dan pembayaran belum diaktifkan.
          </p>
        </div>

        {isSubmitted ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                background: "var(--ss-surface-green)",
                padding: "1.5rem",
                borderRadius: "var(--ss-radius-md)",
                border: "1px solid rgba(8, 189, 89, 0.3)",
              }}
            >
              <CheckCircle2
                size={36}
                color="var(--ss-green)"
                style={{ margin: "0 auto 0.5rem" }}
              />
              <div
                style={{
                  fontFamily: "var(--font-display, inherit)",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "var(--ss-navy-950)",
                }}
              >
                Pratonton borang selesai
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--ss-navy-900)",
                  marginTop: "0.5rem",
                }}
              >
                Tiada e-mel atau WhatsApp dihantar. Maklumat ini hanya berada
                dalam borang demo: <strong>{emailOrPhone}</strong>.
              </p>
            </div>

            <button
              onClick={() => router.push("/library")}
              className={styles.submitBtn}
            >
              Buka pustaka demo <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="login-identifier" className={styles.inputLabel}>
                Alamat E-mel atau Nombor WhatsApp
              </label>
              <div className={styles.inputWrapper}>
                <Mail size={18} color="var(--ss-muted)" />
                <input
                  id="login-identifier"
                  type="text"
                  placeholder="contoh@gmail.com atau +60123456789"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className={styles.textInput}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Pratonton akses <ArrowRight size={18} />
            </button>

            <div className={styles.dividerRow}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>Atau Uji Sekarang</span>
              <div className={styles.dividerLine} />
            </div>

            <Link href="/library" className={styles.demoBtn}>
              Masuk Terus Sebagai Pelajar Demo <ArrowRight size={16} />
            </Link>

            <div className={styles.prototypeNote}>
              <Info
                size={18}
                style={{
                  flexShrink: 0,
                  marginTop: "2px",
                  color: "var(--ss-blue)",
                }}
              />
              <span>
                <strong>Nota Prototaip:</strong> Tiada akaun dicipta dan tiada
                mesej dihantar. Progress demo disimpan pada browser ini.
              </span>
            </div>
          </form>
        )}

        <div className={styles.benefitsList}>
          <div className={styles.benefitItem}>
            <CheckCircle2 size={16} color="var(--ss-green)" />
            <span>RM10 untuk satu modul, satu hasil</span>
          </div>
          <div className={styles.benefitItem}>
            <CheckCircle2 size={16} color="var(--ss-green)" />
            <span>Teks, gambar, link rasmi, template dan latihan</span>
          </div>
          <div className={styles.benefitItem}>
            <ShieldCheck size={16} color="var(--ss-blue)" />
            <span>Progress demo disimpan secara lokal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
