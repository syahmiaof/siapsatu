import {
  Tool,
  Module,
  LearningPath,
  ProgressTrack,
  CommunityPost,
  UserProgress,
} from "@/types";

export const TOOLS: Tool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    category: "ai",
    logoPath: "/assets/tools/chatgpt.svg",
    brandColor: "#10a37f",
    summary:
      "AI assistant pintar untuk penulisan, idea, analisis dan automasi kerja.",
    officialUrl: "https://chatgpt.com",
    moduleSlugs: ["chatgpt-asas-prompt", "chatgpt-analisis-data"],
    badge: "12 modul",
  },
  {
    slug: "gemini",
    name: "Gemini",
    category: "ai",
    logoPath: "/assets/tools/gemini.svg",
    brandColor: "#1ba1e3",
    summary:
      "Tulis, reka, susun dan hasilkan kerja dengan pantas menggunakan Google Gemini.",
    officialUrl: "https://gemini.google.com",
    moduleSlugs: ["gemini-canvas", "gemini-slide-assignment"],
    badge: "8 modul",
  },
  {
    slug: "claude",
    name: "Claude",
    category: "ai",
    logoPath: "/assets/tools/claude.svg",
    brandColor: "#d97706",
    summary:
      "AI pembantu berkuasa untuk analisis dokumen panjang, sintaksis dan penulisan.",
    officialUrl: "https://claude.ai",
    moduleSlugs: ["claude-panjang-dokumen"],
    badge: "6 modul",
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    category: "ai",
    logoPath: "/assets/tools/perplexity.svg",
    brandColor: "#20808d",
    summary:
      "Cari maklumat terkini dengan rujukan sumber yang tepat dan jelas.",
    officialUrl: "https://perplexity.ai",
    moduleSlugs: ["perplexity-research-pasaran"],
    badge: "5 modul",
  },
  {
    slug: "notebooklm",
    name: "NotebookLM",
    category: "productivity",
    logoPath: "/assets/tools/notebooklm.svg",
    brandColor: "#1a73e8",
    summary: "Ringkaskan, analisis dan tanya dokumen PDF dengan AI.",
    officialUrl: "https://notebooklm.google.com",
    moduleSlugs: ["notebooklm-pdf-study"],
    badge: "6 modul",
  },
  {
    slug: "n8n",
    name: "n8n",
    category: "automation",
    logoPath: "/assets/tools/n8n.png",
    brandColor: "#ea4b71",
    summary:
      "Sambungkan apps, data dan AI dalam satu workflow visual tanpa coding.",
    officialUrl: "https://n8n.io",
    moduleSlugs: [
      "n8n-google-sheets",
      "n8n-whatsapp-autoreply",
      "n8n-weekly-report",
      "n8n-faq-assistant",
    ],
    badge: "10 modul",
    highlights: [
      {
        icon: "zap",
        title: "Mudah digunakan",
        description: "Drag & drop workflow",
      },
      {
        icon: "puzzle",
        title: "Sambung 400+ apps",
        description: "Tanpa coding",
      },
      {
        icon: "users",
        title: "Automasi kerja harian",
        description: "Jimat masa, lebih fokus",
      },
    ],
    prerequisites: [
      {
        icon: "user",
        title: "Akaun n8n",
        description: "Boleh guna n8n Cloud (percuma) atau self-hosted.",
      },
      {
        icon: "wifi",
        title: "Akaun apps yang berkaitan",
        description: "Contoh: Google, WhatsApp, Gmail, OpenAI, dll.",
      },
      {
        icon: "shield-check",
        title: "Akses & privasi",
        description: "Pastikan kau guna akaun sendiri dan jaga data sensitif.",
      },
      {
        icon: "laptop",
        title: "Asas penggunaan",
        description:
          "Tak perlu pandai coding. Modul ini sesuai untuk beginner.",
      },
    ],
  },
  {
    slug: "make",
    name: "Make",
    category: "automation",
    logoPath: "/assets/tools/make.svg",
    brandColor: "#6d28d9",
    summary:
      "Bina aliran automasi visual yang pantas antara ratusan servis awan.",
    officialUrl: "https://make.com",
    moduleSlugs: ["make-automasi-asas"],
    badge: "8 modul",
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "automation",
    logoPath: "/assets/tools/zapier.svg",
    brandColor: "#ff4a00",
    summary:
      "Automasi tugas harian dan sambungkan aplikasi perniagaan dengan mudah.",
    officialUrl: "https://zapier.com",
    moduleSlugs: ["zapier-lead-crm"],
    badge: "10 modul",
  },
  {
    slug: "hermes-agent",
    name: "Hermes Agent",
    category: "ai",
    logoPath: "/assets/tools/hermes-agent.png",
    brandColor: "#111827",
    summary:
      "Kenal asas, pasang dengan selamat, dan bina skills daripada tugasan sebenar.",
    officialUrl: "https://github.com/NousResearch/hermes-agent",
    moduleSlugs: [
      "pasang-hermes-agent",
      "hermes-memory-skills",
      "hermes-tools-integration",
    ],
    badge: "7 modul",
    highlights: [
      {
        icon: "book",
        title: "Fokus pada pembelajaran",
        description: "Langkah demi langkah",
      },
      {
        icon: "shield",
        title: "Selamat dan praktikal",
        description: "Kawalan peranti peribadi",
      },
      {
        icon: "users",
        title: "Sesuai untuk pemula",
        description: "Pemasangan tanpa pening",
      },
      {
        icon: "trending-up",
        title: "Bina skills sebenar",
        description: "Daripada tugasan harian",
      },
    ],
  },
  {
    slug: "codex",
    name: "Codex",
    category: "coding",
    logoPath: "/assets/tools/codex.svg",
    brandColor: "#000000",
    summary: "Guna Codex untuk tulis, baiki dan jelaskan kod dengan AI.",
    officialUrl: "https://openai.com",
    moduleSlugs: ["kuasai-codex"],
    badge: "6 modul",
  },
  {
    slug: "github",
    name: "GitHub",
    category: "coding",
    logoPath: "/assets/tools/github.svg",
    brandColor: "#24292f",
    summary:
      "Belajar version control dengan langkah mudah, simpan kod dan deploy ke live web.",
    officialUrl: "https://github.com",
    moduleSlugs: ["github-dari-kosong"],
    badge: "9 modul",
  },
  {
    slug: "cursor",
    name: "Cursor",
    category: "coding",
    logoPath: "/assets/tools/cursor.svg",
    brandColor: "#2d3748",
    summary:
      "AI code editor moden untuk kerja developer lebih laju dan produktif.",
    officialUrl: "https://cursor.com",
    moduleSlugs: ["cursor-ai-coding"],
    badge: "6 modul",
  },
  {
    slug: "vercel",
    name: "Vercel",
    category: "coding",
    logoPath: "/assets/tools/vercel.svg",
    brandColor: "#000000",
    summary:
      "Deploy website dan aplikasi pantas ke domain sendiri tanpa server headache.",
    officialUrl: "https://vercel.com",
    moduleSlugs: ["deploy-web-domain"],
    badge: "6 modul",
  },
  {
    slug: "canva",
    name: "Canva",
    category: "design",
    logoPath: "/assets/tools/canva.svg",
    brandColor: "#00c4cc",
    summary:
      "Reka grafik pemasaran, poster media sosial dan slide pembentangan profesional.",
    officialUrl: "https://canva.com",
    moduleSlugs: ["canva-poster-iklan"],
    badge: "8 modul",
  },
  {
    slug: "figma",
    name: "Figma",
    category: "design",
    logoPath: "/assets/tools/figma.svg",
    brandColor: "#f24e1e",
    summary:
      "Alat reka bentuk antaramuka moden untuk susun layout dan prototaip digital.",
    officialUrl: "https://figma.com",
    moduleSlugs: ["figma-wireframe-website"],
    badge: "7 modul",
  },
  {
    slug: "notion",
    name: "Notion",
    category: "productivity",
    logoPath: "/assets/tools/notion.svg",
    brandColor: "#000000",
    summary: "Atur kerja, nota, projek dan jadual dengan lebih sistematik.",
    officialUrl: "https://notion.so",
    moduleSlugs: ["7-hari-content"],
    badge: "8 modul",
  },
];

export const MODULES: Module[] = [
  {
    slug: "meta-ads-ai",
    title: "Meta Ads + AI",
    shortOutcome:
      "Buat iklan berkesan dengan kuasa AI. Dari asas sampai hasil.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 45,
    toolSlugs: ["meta"],
    tags: ["Strategi", "Iklan", "AI"],
    audience: ["bisnes"],
    featured: true,
    themeColor: "navy",
    prerequisites: ["Akaun Facebook / Meta Business Suite", "Bajet iklan asas"],
    nextModuleSlug: "n8n-google-sheets",
    lessons: [
      {
        id: "meta-1",
        stepNumber: 1,
        title: "Asas Struktur Kempen Meta Ads",
        body: "Fahami hierarki Kempen, Ad Set dan Iklan supaya bajet tidak dibazirkan.",
        officialLinks: [
          {
            label: "Meta Business Suite",
            href: "https://business.facebook.com",
          },
        ],
      },
    ],
  },
  {
    slug: "gemini-canvas",
    title: "Gemini Canvas",
    shortOutcome: "Tulis, reka, susun dan hasilkan kerja dengan lebih pantas.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 35,
    toolSlugs: ["gemini"],
    tags: ["Tulis", "Reka", "Produktiviti"],
    audience: ["kerja"],
    featured: true,
    themeColor: "crimson",
    prerequisites: ["Akaun Google percuma"],
    nextModuleSlug: "vibe-code-website",
    lessons: [
      {
        id: "gemini-1",
        stepNumber: 1,
        title: "Buka dan Guna Ruang Canvas",
        body: "Belajar mengaktifkan panel Canvas untuk menyunting dokumen secara langsung di sebelah AI prompt.",
        officialLinks: [
          { label: "Google Gemini", href: "https://gemini.google.com" },
        ],
      },
    ],
  },
  {
    slug: "vibe-code-website",
    title: "Vibe Code Website",
    shortOutcome: "Bina website moden tanpa perlu jadi programmer.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 45,
    toolSlugs: ["vibecode", "github"],
    tags: ["No-code", "Website", "AI"],
    audience: ["bina", "student"],
    featured: true,
    themeColor: "green",
    prerequisites: ["Pelayar web moden (Chrome / Edge / Safari)"],
    nextModuleSlug: "github-dari-kosong",
    lessons: [
      {
        id: "vibe-1",
        stepNumber: 1,
        title: "Huraikan Konsep Website kepada AI",
        body: "Tulis keperluan laman web anda dalam bahasa santai dan biarkan AI hasilkan kod antaramuka yang berfungsi.",
        officialLinks: [{ label: "GitHub", href: "https://github.com" }],
      },
    ],
  },
  {
    slug: "n8n-google-sheets",
    title: "Automasi Lead ke Google Sheets dengan n8n",
    shortOutcome:
      "Hasil: setiap borang baru terus masuk ke spreadsheet yang kemas.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 35,
    toolSlugs: ["n8n"],
    tags: ["Automation", "No-code", "Lead"],
    audience: ["bisnes", "kerja"],
    themeColor: "navy",
    prerequisites: [
      "Akaun Google Form & Google Sheets",
      "Akaun n8n Cloud atau self-hosted; semak kos pelan dan hosting",
    ],
    whatYouWillDo: [
      {
        step: 1,
        title: "Bina borang",
        description: "Sediakan Google Form untuk terima lead.",
      },
      {
        step: 2,
        title: "Setup n8n workflow",
        description: "Sambungkan Google Form ke Google Sheets.",
      },
      {
        step: 3,
        title: "Uji dan aktifkan",
        description: "Test dengan data sebenar.",
      },
      {
        step: 4,
        title: "Kemas dan guna",
        description: "Susun kolum, tambah rule asas dan mula guna.",
      },
    ],
    providedTemplates: [
      {
        title: "Mapping Sheet (Template)",
        description: "Contoh struktur kolum untuk kemas dan konsisten.",
        type: "spreadsheet",
      },
      {
        title: "Checklist Setup",
        description:
          "Senarai langkah demi langkah supaya tak terlepas apa-apa.",
        type: "checklist",
      },
    ],
    nextModuleSlug: "n8n-whatsapp-autoreply",
    lessons: [
      {
        id: "n8n-gs-1",
        stepNumber: 1,
        title: "Pengenalan",
        body: "Kenali bagaimana n8n menghubungkan data secara visual tanpa memerlukan sebarang skrip kod rumit.",
        officialLinks: [{ label: "Buka n8n.io", href: "https://n8n.io" }],
      },
      {
        id: "n8n-gs-2",
        stepNumber: 2,
        title: "Sediakan n8n",
        body: "Buka workspace n8n anda dan bina workflow ujian pertama. Semak kos pelan Cloud atau hosting sebelum mula.",
        actionTitle: "Bina workflow ujian",
        actionSubtitle:
          "Kenal Trigger, Node dan Execution melalui satu data contoh.",
        outcomeCallout:
          "Hasil langkah ini: workflow ujian boleh dijalankan dalam editor.",
        instructions: [
          {
            step: 1,
            title: "Buka workspace",
            detail:
              "Log masuk ke n8n Cloud atau instance sendiri. Buka workflow baharu.",
          },
          {
            step: 2,
            title: "Tambah Manual Trigger",
            detail:
              "Pilih trigger manual supaya ujian hanya berjalan apabila anda jalankan sendiri.",
          },
          {
            step: 3,
            title: "Tambah Edit Fields dan uji",
            detail:
              "Sediakan field nama dan emel dengan data contoh. Execute workflow dan semak output nod.",
          },
        ],
        template: "nama: Pelajar Demo\nemel: pelajar@example.com",
        task: "Jalankan workflow manual dan pastikan output mengandungi nama serta emel contoh. Jangan guna maklumat pelanggan sebenar.",
        officialLinks: [
          { label: "Daftar n8n Cloud", href: "https://n8n.io/cloud" },
        ],
      },
      {
        id: "n8n-gs-3",
        stepNumber: 3,
        title: "Sambungkan n8n ke Google Sheets",
        actionTitle: "Pilih action Google Sheets",
        actionSubtitle:
          "Sekarang kita tambah nod Google Sheets untuk simpan data yang masuk.",
        outcomeCallout: "Hasil langkah ini: data ujian masuk ke spreadsheet.",
        body: "Dalam langkah ini, kita sambungkan n8n ke Google Sheets supaya data yang masuk boleh terus disimpan secara automatik.",
        instructions: [
          {
            step: 1,
            title: "Tambah nod Google Sheets",
            detail:
              "Dalam editor n8n, klik ikon +, cari Google Sheets dan pilih nod tersebut.",
          },
          {
            step: 2,
            title: "Pilih operasi",
            detail:
              "Tetapkan operasi kepada Append Row supaya setiap data baru akan ditambah sebagai baris baharu.",
          },
          {
            step: 3,
            title: "Sambungkan dengan kredensial",
            detail:
              "Log masuk dengan akaun Google anda dan pilih spreadsheet serta nama sheet yang ingin digunakan.",
          },
        ],
        officialLinks: [
          { label: "Buka n8n (laman rasmi)", href: "https://n8n.io" },
        ],
        template: `{\n  "nodes": [\n    {\n      "name": "Google Sheets",\n      "type": "n8n-nodes-base.googleSheets",\n      "typeVersion": 4,\n      "position": [800, 300]\n    }\n  ]\n}`,
        templateLanguage: "json",
        task: "Sambungkan n8n ke Google Sheets anda dan hantar satu data ujian. Pastikan ia masuk sebagai baris baharu dalam spreadsheet.",
      },
      {
        id: "n8n-gs-4",
        stepNumber: 4,
        title: "Uji workflow",
        body: "Jalankan trigger ujian dan sahkan bahawa baris baharu muncul di Google Sheets dengan tepat.",
        officialLinks: [
          {
            label: "Panduan Nod Google Sheets",
            href: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/",
          },
        ],
      },
      {
        id: "n8n-gs-5",
        stepNumber: 5,
        title: "Tambah baik",
        body: "Formatkan nombor telefon kepada piawaian antarabangsa dan buang ruang kosong yang tidak diperlukan.",
        officialLinks: [
          {
            label: "Dokumentasi n8n Expressions",
            href: "https://docs.n8n.io/code/builtin/json/",
          },
        ],
      },
      {
        id: "n8n-gs-6",
        stepNumber: 6,
        title: "Siap dan seterusnya",
        body: "Tahniah! Borang anda kini disambungkan ke spreadsheet secara automatik. Teruskan ke modul auto-reply untuk langkah seterusnya.",
        officialLinks: [
          { label: "Komuniti n8n", href: "https://community.n8n.io" },
        ],
      },
    ],
  },
  {
    slug: "n8n-whatsapp-autoreply",
    title: "Balas Prospek WhatsApp",
    shortOutcome: "Automasi & skrip balas prospek yang convert.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 30,
    toolSlugs: ["n8n", "whatsapp"],
    tags: ["Bisnes", "Communication", "WhatsApp"],
    audience: ["bisnes"],
    themeColor: "orange",
    prerequisites: ["Akaun WhatsApp Business atau webhook gateway"],
    nextModuleSlug: "n8n-weekly-report",
    lessons: [
      {
        id: "n8n-wa-1",
        stepNumber: 1,
        title: "Struktur Mesej Selamat Datang",
        body: "Tulis skrip balasan segera yang mesra pelanggan dan membantu menapis prospek berkualiti.",
        officialLinks: [
          {
            label: "WhatsApp Business API Docs",
            href: "https://developers.facebook.com/docs/whatsapp",
          },
        ],
      },
    ],
  },
  {
    slug: "7-hari-content",
    title: "7 Hari Content",
    shortOutcome: "Rancang, hasilkan dan jadualkan content untuk 7 hari.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 35,
    toolSlugs: ["notion"],
    tags: ["Bisnes", "Content", "Notion"],
    audience: ["bisnes", "kerja"],
    prerequisites: ["Akaun Notion percuma"],
    lessons: [
      {
        id: "7hc-1",
        stepNumber: 1,
        title: "Setup Kalendar Content Notion",
        body: "Gunakan template papan Kanban untuk menyusun status idea, draf, semakan dan jadual siaran.",
        officialLinks: [{ label: "Notion", href: "https://notion.so" }],
      },
    ],
  },
  {
    slug: "notebooklm-pdf-study",
    title: "NotebookLM untuk PDF",
    shortOutcome: "Ringkaskan, analisis dan tanya dokumen dengan AI.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 30,
    toolSlugs: ["notebooklm"],
    tags: ["Kerja", "AI", "PDF"],
    audience: ["kerja", "student"],
    prerequisites: ["Akaun Google percuma", "Dokumen PDF untuk dianalisis"],
    lessons: [
      {
        id: "nlm-1",
        stepNumber: 1,
        title: "Muat Naik Dokumen & Jana Ringkasan Eksekutif",
        body: "Ketahui cara memuat naik fail PDF sehingga ratusan halaman dan bertanya soalan spesifik dengan sitasi tepat.",
        officialLinks: [
          { label: "Google NotebookLM", href: "https://notebooklm.google.com" },
        ],
      },
    ],
  },
  {
    slug: "github-dari-kosong",
    title: "GitHub dari Kosong",
    shortOutcome: "Belajar version control dengan langkah mudah dan praktikal.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 40,
    toolSlugs: ["github"],
    tags: ["Bina & Deploy", "Coding", "Git"],
    audience: ["bina", "student"],
    prerequisites: ["Komputer riba", "Akaun GitHub percuma"],
    lessons: [
      {
        id: "gh-1",
        stepNumber: 1,
        title: "Cipta Repositori Pertama",
        body: "Fahami apa itu repositori, commit mesej yang kemas dan cara berkongsi projek anda dengan orang lain.",
        officialLinks: [
          { label: "GitHub Docs", href: "https://docs.github.com" },
        ],
      },
    ],
  },
  {
    slug: "kuasai-codex",
    title: "Kuasai Codex",
    shortOutcome: "Guna Codex untuk tulis, baiki dan jelaskan kod dengan AI.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 35,
    toolSlugs: ["codex"],
    tags: ["AI Tools", "Coding", "Codex"],
    audience: ["bina", "student"],
    prerequisites: ["Asas konsep pengaturcaraan"],
    lessons: [
      {
        id: "cdx-1",
        stepNumber: 1,
        title: "Hasilkan Fungsi dengan Prompt Bahasa Melayu",
        body: "Lihat bagaimana menyatakan keperluan logik algoritma dalam ayat harian untuk menghasilkan kod yang berfungsi.",
        officialLinks: [
          { label: "OpenAI Codex Overview", href: "https://openai.com" },
        ],
      },
    ],
  },
  {
    slug: "antigravity-agent-ide",
    title: "Antigravity Agent IDE",
    shortOutcome: "Kenali AI agent IDE untuk kerja developer lebih laju.",
    priceMyr: 10,
    level: "intermediate",
    estimatedMinutes: 45,
    toolSlugs: ["antigravity"],
    tags: ["Bina & Deploy", "Agent", "IDE"],
    audience: ["bina"],
    prerequisites: ["Pengalaman pembangunan web asas"],
    lessons: [
      {
        id: "agy-1",
        stepNumber: 1,
        title: "Navigasi Antaramuka Antigravity",
        body: "Kuasai fungsi agentic coding, context injection, dan automasi arahan kerja berulang.",
        officialLinks: [{ label: "Antigravity Guide", href: "#" }],
      },
    ],
  },
  {
    slug: "gemini-slide-assignment",
    title: "Siapkan slide assignment dengan AI",
    shortOutcome: "8 slide yang jelas dan boleh dibentang.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 30,
    toolSlugs: ["gemini"],
    tags: ["Student", "Slide", "AI"],
    audience: ["student"],
    prerequisites: ["Akaun Google", "Topik tugasan universiti / kolej"],
    lessons: [
      {
        id: "gsa-1",
        stepNumber: 1,
        title: "Tentukan Objektif Pembentangan",
        body: "Kenal pasti siapa penilai anda dan mesej utama yang perlu disampaikan dalam masa terhad.",
        officialLinks: [
          { label: "Google Gemini", href: "https://gemini.google.com" },
        ],
      },
      {
        id: "gsa-2",
        stepNumber: 2,
        title: "Susun cerita sebelum design",
        outcomeCallout: "8 slide yang jelas dan boleh dibentang",
        body: "Sebelum minta AI hasilkan slide, sediakan rangka cerita yang jelas. Ini akan memastikan hasil lebih tersusun, relevan dan mudah difahami.",
        instructions: [
          {
            step: 1,
            title: "Objektif pembentangan",
            detail: "Tentukan objektif pembentangan dan siapa khalayak anda.",
          },
          {
            step: 2,
            title: "Turutan logik",
            detail: "Senaraikan isi utama dalam turutan yang logik.",
          },
          {
            step: 3,
            title: "Poin setiap slide",
            detail:
              "Ringkaskan poin bagi setiap slide (1 idea utama setiap slide).",
          },
        ],
        officialLinks: [
          {
            label: "Gemini — buka laman rasmi",
            href: "https://gemini.google.com",
          },
        ],
        template:
          "Saya perlukan rangka 8 slide untuk pembentangan tentang [topik anda].\nSasaran khalayak: [nyatakan, contoh: pensyarah / rakan sekelas].\nSila beri tajuk setiap slide dan poin utama bagi setiap slide.",
        task: "Salin prompt di atas, buka Gemini, tampal dan jana rangka 8 slide untuk topik anda.",
      },
    ],
  },
  {
    slug: "n8n-weekly-report",
    title: "Laporan mingguan automatik",
    shortOutcome:
      "Kumpul data, jana laporan mingguan dan hantar terus melalui email.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 45,
    toolSlugs: ["n8n"],
    tags: ["Productivity", "Automation", "Email"],
    audience: ["kerja", "bisnes"],
    prerequisites: ["Akaun n8n", "Akaun emel (Gmail / Outlook)"],
    lessons: [
      {
        id: "n8n-wr-1",
        stepNumber: 1,
        title: "Konfigurasi Cron Trigger Mingguan",
        body: "Tetapkan masa pengaktifan automatik pada setiap pagi Isnin jam 9:00 pagi.",
        officialLinks: [
          {
            label: "n8n Schedule Trigger",
            href: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.schedulemaybe/",
          },
        ],
      },
    ],
  },
  {
    slug: "n8n-faq-assistant",
    title: "AI FAQ Assistant",
    shortOutcome:
      "Guna AI untuk jawab soalan pelanggan secara automatik dari pelbagai platform.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 45,
    toolSlugs: ["n8n", "chatgpt"],
    tags: ["AI / LLM", "Automation", "Support"],
    audience: ["bisnes"],
    prerequisites: ["Akaun OpenAI API", "Akaun n8n"],
    lessons: [
      {
        id: "n8n-faq-1",
        stepNumber: 1,
        title: "Sambungkan LLM Chain dengan Dokumen FAQ",
        body: "Bekalkan set jawapan rasmi syarikat kepada model bahasa agar ia tidak mereka-reka maklumat palsu.",
        officialLinks: [
          {
            label: "n8n AI Agents Documentation",
            href: "https://docs.n8n.io/advanced-ai/",
          },
        ],
      },
    ],
  },
  {
    slug: "pasang-hermes-agent",
    title: "Pasang Hermes Agent",
    shortOutcome:
      "Ikut langkah demi langkah untuk pasang Hermes Agent dengan selamat di komputer anda.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 30,
    toolSlugs: ["hermes-agent"],
    tags: ["AI Agent", "Setup", "Beginner"],
    audience: ["bina"],
    prerequisites: ["Komputer (Windows / Mac / Linux)", "Python 3.10+"],
    lessons: [
      {
        id: "ha-setup-1",
        stepNumber: 1,
        title: "Klon dan Pasang Keperluan Asas",
        body: "Panduan terminal ringkas untuk setup persekitaran maya Python dan semak status keizinan sistem.",
        officialLinks: [
          {
            label: "Hermes Agent GitHub",
            href: "https://github.com/NousResearch/hermes-agent",
          },
        ],
      },
    ],
  },
  {
    slug: "hermes-memory-skills",
    title: "Faham memory & skills",
    shortOutcome:
      "Ketahui bagaimana Hermes Agent mengingat konteks, belajar daripada tugasan, dan guna skills dengan berkesan.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 35,
    toolSlugs: ["hermes-agent"],
    tags: ["AI Agent", "Memory", "Skills"],
    audience: ["bina"],
    prerequisites: ["Hermes Agent yang sudah dipasang"],
    lessons: [
      {
        id: "ha-mem-1",
        stepNumber: 1,
        title: "Struktur Simpanan Memori Jangka Panjang",
        body: "Cara menyemak fail memori tempatan dan memastikan maklumat penting diingati dalam sesi seterusnya.",
        officialLinks: [
          {
            label: "Hermes Agent Docs",
            href: "https://github.com/NousResearch/hermes-agent",
          },
        ],
      },
    ],
  },
  {
    slug: "hermes-tools-integration",
    title: "Hubungkan tools dengan selamat",
    shortOutcome:
      "Sambungkan Hermes Agent dengan tools seperti n8n, apps dan servis lain dengan cara yang selamat.",
    priceMyr: 10,
    level: "intermediate",
    estimatedMinutes: 45,
    toolSlugs: ["hermes-agent", "n8n"],
    tags: ["AI Agent", "Security", "Tools"],
    audience: ["bina"],
    prerequisites: ["Hermes Agent dipasang", "n8n webhook aktif"],
    lessons: [
      {
        id: "ha-sec-1",
        stepNumber: 1,
        title: "Hadkan Keizinan Akses Luar",
        body: "Amalan terbaik memastikan fail dan token API anda terlindung dengan keizinan minimum.",
        officialLinks: [
          {
            label: "Hermes Security Guide",
            href: "https://github.com/NousResearch/hermes-agent",
          },
        ],
      },
    ],
  },
  {
    slug: "n8n-asas-workflow",
    title: "Faham Asas Automation",
    shortOutcome: "Bina workflow pertama yang boleh jalan.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 45,
    toolSlugs: ["n8n"],
    tags: ["Automation", "Beginner", "Workflow"],
    audience: ["bisnes", "kerja"],
    prerequisites: ["Akaun n8n percuma"],
    lessons: [
      {
        id: "n8n-aw-1",
        stepNumber: 1,
        title: "Kenal Pasti Trigger & Action",
        body: "Kuasai logik asas automasi: apabila X berlaku, lakukan Y secara automatik.",
        officialLinks: [{ label: "n8n Primer", href: "https://docs.n8n.io" }],
      },
    ],
  },
  {
    slug: "n8n-deploy-monitor",
    title: "Deploy & Monitor",
    shortOutcome: "Workflow live, dengan notifikasi dan log pemantauan.",
    priceMyr: 10,
    level: "beginner",
    estimatedMinutes: 45,
    toolSlugs: ["n8n"],
    tags: ["Automation", "Deploy", "Monitoring"],
    audience: ["bisnes", "kerja"],
    prerequisites: ["Workflow n8n yang telah diuji"],
    lessons: [
      {
        id: "n8n-dm-1",
        stepNumber: 1,
        title: "Aktifkan Status Live dan Semak Error Log",
        body: "Konfigurasi notifikasi kecemasan ke Telegram atau emel jika sesebuah nod mengalami kegagalan sambungan.",
        officialLinks: [
          {
            label: "n8n Error Workflows",
            href: "https://docs.n8n.io/flow-logic/error-trigger/",
          },
        ],
      },
    ],
  },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    slug: "ai-automation",
    title: "Laluan AI Automation",
    headline: "Dari kerja manual, sampai workflow berjalan sendiri.",
    subheadline:
      "Belajar bina workflow automasi dengan n8n dan AI. Setiap modul ada hasil sebenar, ikut langkah demi langkah.",
    category: "Automation",
    durationMinutes: 180,
    level: "Beginner",
    regularPriceMyr: 40,
    bundlePriceMyr: 27,
    moduleSlugs: [
      "n8n-asas-workflow",
      "n8n-google-sheets",
      "n8n-faq-assistant",
      "n8n-deploy-monitor",
    ],
    finalOutcomes: [
      {
        title: "Form masuk Sheets",
        description:
          "Data dari form terus masuk ke Google Sheets secara automatik.",
        icon: "sheet",
      },
      {
        title: "Auto-reply terkawal",
        description: "Balas mesej atau emel secara automatik dengan AI.",
        icon: "mail",
      },
      {
        title: "Laporan dihantar",
        description: "Laporan ringkas dihantar ikut jadual (Emel / WhatsApp).",
        icon: "file-text",
      },
      {
        title: "Workflow boleh dipantau",
        description: "Semua workflow live dan boleh dipantau dengan mudah.",
        icon: "activity",
      },
    ],
    features: [
      {
        title: "Belajar ikut langkah",
        description: "Teks + gambar + template fail disediakan.",
        icon: "book-open",
      },
      {
        title: "Sokongan komuniti",
        description: "Tanya, kongsi dan dapatkan bantuan.",
        icon: "users",
      },
      {
        title: "Checklist hasil",
        description: "Semak hasil selepas lengkap semua modul.",
        icon: "award",
      },
    ],
  },
];

export const PROGRESS_TRACKS: ProgressTrack[] = [
  {
    id: "track-1",
    number: "01",
    title: "Jual lebih jelas",
    description:
      "Tarik pelanggan dengan mesej yang betul dan kempen yang berkesan.",
    color: "navy",
    steps: [
      {
        id: "p1-1",
        title: "WhatsApp Scripts",
        description:
          "10 skrip mesej siap guna untuk tarik dan layan pelanggan.",
        status: "siap",
        artifactPreview: {
          type: "script",
          label: "Skrip WhatsApp untuk pelanggan baru",
          items: [
            "Template salam pembuka",
            "Soalan kelayakan bajet",
            "Skrip susulan 24 jam",
          ],
        },
      },
      {
        id: "p1-2",
        title: "FAQ Pelanggan",
        description: "Satu dokumen FAQ lengkap dengan jawapan dan template.",
        status: "seterusnya",
        artifactPreview: {
          type: "faq",
          label: "FAQ Pelanggan (Template)",
          items: [
            "Jawapan harga & pakej",
            "Soalan teknikal biasa",
            "Polisi jaminan",
          ],
        },
      },
      {
        id: "p1-3",
        title: "Meta Ads",
        description:
          "Satu kempen iklan Meta siap dengan copy, gambar dan setting sasaran.",
        status: "akan_datang",
        artifactPreview: {
          type: "campaign",
          label: "Kempen Iklan Siap Dilancar",
          items: ["Audien sasaran Malaysia", "3 variasi teks iklan"],
        },
      },
    ],
  },
  {
    id: "track-2",
    number: "02",
    title: "Kerja lebih laju",
    description:
      "Guna AI untuk menulis, menyusun dan hasilkan kerja dengan lebih pantas.",
    color: "crimson",
    steps: [
      {
        id: "p2-1",
        title: "Gemini Canvas",
        description:
          "Satu dokumen kerja lengkap yang ditulis dan direka dengan Gemini Canvas.",
        status: "siap",
        artifactPreview: {
          type: "document",
          label: "Peluang Pasaran (Analisis + Pelan)",
          items: ["Rumusan pasaran sasaran", "Jadual perbandingan"],
        },
      },
      {
        id: "p2-2",
        title: "NotebookLM",
        description:
          "Satu notebook rujukan dengan nota tersusun dari bahan anda.",
        status: "dalam_progress",
        artifactPreview: {
          type: "notebook",
          label: "Notebook Perniagaan",
          items: ["Kompilasi SOP syarikat", "Panduan staf baru"],
        },
      },
      {
        id: "p2-3",
        title: "Automation",
        description:
          "Satu aliran kerja automasi untuk jimat masa kerja ulang-alik.",
        status: "akan_datang",
        artifactPreview: {
          type: "workflow",
          label: "Workflow Automasi",
          items: ["Notifikasi data automatik", "Penyelarasan fail"],
        },
      },
    ],
  },
  {
    id: "track-3",
    number: "03",
    title: "Bina & deploy",
    description: "Bina laman web moden tanpa perlu jadi programmer.",
    color: "green",
    steps: [
      {
        id: "p3-1",
        title: "GitHub",
        description:
          "Satu repositori projek dengan kod sumber dan fail lengkap.",
        status: "siap",
        artifactPreview: {
          type: "repo",
          label: "siapsatu-website",
          items: ["index.html", "style.css", "script.js", "README.md"],
        },
      },
      {
        id: "p3-2",
        title: "Vibe Code Website",
        description: "Satu laman web berfungsi dibina dengan Vibe Code.",
        status: "seterusnya",
        artifactPreview: {
          type: "website",
          label: "Laman Web Saya",
          items: ["Hero visual responsif", "Borang perhubungan"],
        },
      },
      {
        id: "p3-3",
        title: "Deploy",
        description: "Laman web live di internet dengan domain sendiri.",
        status: "akan_datang",
        artifactPreview: {
          type: "deployed",
          label: "https://domain-anda.my",
          items: ["Sijil SSL aktif", "Kelajuan global CDN"],
        },
      },
    ],
  },
];

export const INITIAL_USER_PROGRESS: UserProgress = {
  ownedModuleSlugs: [
    "n8n-google-sheets",
    "gemini-canvas",
    "vibe-code-website",
    "n8n-whatsapp-autoreply",
  ],
  completedModuleSlugs: ["gemini-canvas"],
  currentModuleSlug: "n8n-google-sheets",
  currentStepIndex: 3,
  completedSteps: {
    "n8n-google-sheets": [1, 2],
    "gemini-canvas": [1],
  },
  completedOutputs: [
    {
      id: "out-1",
      type: "SLIDE DECK",
      title: "Cadangan Content Plan 30 Hari (Slides)",
      date: "12 Sep 2024",
      moduleSlug: "gemini-canvas",
    },
    {
      id: "out-2",
      type: "TEMPLATE",
      title: "Skrip WhatsApp Balas Prospek",
      date: "8 Sep 2024",
      moduleSlug: "n8n-whatsapp-autoreply",
    },
  ],
};

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    author: {
      name: "Admin SiapSatu",
      role: "Admin",
      avatar: "/assets/avatars/avatar-admin.png",
    },
    timeAgo: "3 hari lepas",
    title: "Weekly Tools Digest #4: AI, No-code & Automation",
    body: "Senarai tools, tutorial ringkas dan sumber minggu ini untuk bantu korang belajar dengan lebih cepat dan siapkan kerja harian.",
    channel: "pengumuman",
    tags: ["AI", "No-code", "Produktiviti", "Automation"],
    reactions: {
      likes: 24,
      replies: 8,
    },
    isPinned: true,
    image: "/assets/illustrations/digest-thumbnail.png",
  },
  {
    id: "post-2",
    author: {
      name: "Ammar H.",
      role: "Student",
      avatar: "/assets/avatars/avatar-ammar.png",
    },
    timeAgo: "1 hari lepas",
    title: "Kongsi hasil: Website portfolio pertama saya! 🙌",
    body: "Terima kasih kepada modul Vibe Code Website! Akhirnya siap juga portfolio simple saya. Guna Canva + Vibe Code + sedikit AI untuk content.",
    channel: "kongsi",
    tags: ["Website", "Vibe Code", "AI"],
    reactions: {
      likes: 18,
      replies: 6,
    },
    image: "/assets/illustrations/portfolio-thumbnail.png",
  },
  {
    id: "post-3",
    author: {
      name: "Siti A.",
      role: "Student",
      avatar: "/assets/avatars/avatar-siti.png",
    },
    timeAgo: "6 jam lepas",
    title: "Tanya: n8n step 3 tak keluar data?",
    body: "Hai semua, saya ikut modul n8n tapi dekat step 3, output tak keluar data selepas klik test. Ini screenshot saya. Ada sesiapa pernah hadap masalah ni?",
    channel: "tanya",
    tags: ["n8n", "Automation", "Bantuan"],
    reactions: {
      likes: 5,
      replies: 12,
    },
    image: "/assets/illustrations/n8n-error-thumbnail.png",
  },
];
