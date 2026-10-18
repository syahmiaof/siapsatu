// Discovery presentation only. Availability is explicit; this is not module data.
export const HOME_TOPICS = [
  {
    id: "website",
    title: "Website live",
    promise: "Brief → bina → deploy",
    description: "Bina website untuk perniagaan, portfolio atau projek sendiri. Uji hasil dan ikut langkah penerbitan.",
    href: "/modules/vibe-code-website",
    desktopWidth: 312,
    mobileHeight: 262,
  },
  {
    id: "app",
    title: "App & sistem tanpa coding",
    promise: "Form → data → dashboard",
    description: "Laluan ini masih dalam perancangan. Fokusnya ialah prototaip form, data dan dashboard. Belum ada modul lengkap yang mengajar data, permissions dan deployment untuk laluan ini.",
    discoveryHref: "/tools?category=productivity",
    discoveryLabel: "Kenali tools produktiviti",
    desktopWidth: 295,
    mobileHeight: 278,
  },
  {
    id: "agent",
    title: "AI agent",
    promise: "Arahan → tools → tindakan",
    description: "Laluan AI agent menyeluruh masih dalam perancangan. Agent memerlukan konteks, tools dan tindakan yang boleh diperiksa; ia bukan sekadar workflow tetap. Belum ada modul lengkap untuk semua hasil yang ditunjukkan dalam gambar.",
    discoveryHref: "/tools?category=ai",
    discoveryLabel: "Kenali tools AI",
    desktopWidth: 303,
    mobileHeight: 258,
  },
  {
    id: "automation",
    title: "Automasi kerja",
    promise: "Trigger → proses → output",
    description: "Mula dengan n8n dan Google Sheets. Semak akaun, permissions dan kos API atau tool sebelum memilih modul.",
    href: "/modules/n8n-google-sheets",
    desktopWidth: 317,
    mobileHeight: 245,
  },
  {
    id: "content",
    title: "Content AI",
    promise: "Idea → imej, video & lagu",
    description: "Laluan penuh imej, video dan lagu masih dalam perancangan. Modul 7 Hari Content yang sedia ada membantu merancang content; ia tidak mengajar ketiga-tiga jenis media ini. Gambar ialah contoh konsep, bukan UI rasmi vendor.",
    discoveryHref: "/tools?category=design",
    discoveryLabel: "Kenali tools reka bentuk",
    desktopWidth: 309,
    mobileHeight: 227,
  },
] as const;

export type HomeTopic = (typeof HOME_TOPICS)[number];
export type PlannedHomeTopic = Extract<HomeTopic, { discoveryHref: string }>;

export const HOME_SUPPORT = "Belajar tools AI dengan bahasa mudah. Bina website, prototaip app, AI agent, automasi dan content—satu topik, satu hasil yang boleh diuji.";
