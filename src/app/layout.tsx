import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { MobileBottomNav } from "@/components/navigation/MobileBottomNav";
import { PageMotion } from "@/components/motion/PageMotion";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SiapSatu — Satu modul. Satu hasil.",
  description:
    "Panduan mudah untuk AI, tools & software. RM10 satu modul, dengan satu hasil yang boleh anda terus guna.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" className={`${bricolage.variable} ${manrope.variable}`}>
      <body>
        <PageMotion>
          <SiteHeader />
          <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </main>
          <MobileBottomNav />
        </PageMotion>
      </body>
    </html>
  );
}
