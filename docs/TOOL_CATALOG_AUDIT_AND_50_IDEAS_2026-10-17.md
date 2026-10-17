# SiapSatu — audit logo & 50 calon tools

Tarikh semakan: 17 Oktober 2026. Ini ialah *shortlist editorial*, bukan ranking jualan Malaysia atau bukti semua 50 tools sedang meningkat. Nama produk, fungsi dan link rasmi boleh berubah; semak semula sebelum modul diterbitkan. 50 item di bawah tidak mengulang 16 tools yang sudah ada dalam `src/data/mockData.ts`.

## Audit katalog semasa

- Katalog sekarang mengandungi 16 tools: ChatGPT, Gemini, Claude, Perplexity, NotebookLM, n8n, Make, Zapier, Hermes Agent, Codex, GitHub, Cursor, Vercel, Canva, Figma dan Notion.
- `Codex`, `NotebookLM` dan `Antigravity` menggunakan SVG label teks neutral, **bukan logo rasmi**. Antigravity hanya digunakan sebagai aset modul. `Vibe Code` ialah ikon topik generik, bukan jenama software. Komponen `ToolLogoTile` memang memberi alt yang membezakan tiga label neutral itu.
- Hermes Agent menggunakan PNG sumber 48×48; ia diisi ke tile 86×86 dan 146×146, jadi kelihatan lembut/pixelated. Fail ini ialah salinan byte-identical daripada sumber yang diberi. Ganti hanya apabila aset rasmi resolusi lebih tinggi diperoleh; jangan upsample dan dakwa ia lebih tajam.
- Gemini menggunakan multicolour asset daripada Google static. ChatGPT, Claude, Perplexity, Make, Zapier, GitHub, Cursor, Vercel, Canva, Figma, Notion, Meta dan WhatsApp menggunakan geometri Simple Icons dengan beberapa warna tempatan. Simple Icons ialah library komuniti, bukan brand kit rasmi. n8n dan Hermes berasal daripada fail yang diberi. Provenance terperinci ada dalam `docs/ASSET_SOURCES.md`.
- Logo tool juga muncul pada laman modul melalui `primaryTool.logoPath`; jadi label Codex/NotebookLM turut kelihatan di modul. Sebelum tambah 50 kad baru, sediakan `logoStatus: official | community | neutral | topic` atau manifest aset supaya UI dan alt text tidak tersalah dakwa.
- `ToolCard` memaparkan kiraan modul terbit daripada `modulesForTool()`, bukannya `badge` dalam mock data. Tetapi `badge` seperti `12 modul` masih disimpan sebagai data lama dan boleh disalahguna kemudian; buang atau tandakan deprecated. Paparkan `Modul akan datang` bagi tool yang belum ada modul, seperti kelakuan semasa.

## 50 calon tools tambahan

`P1` = layak diuji sebagai modul awal; `P2` = tambah selepas respons awal. Kategori MCP mengandungi server/alat protokol, bukan aplikasi pengguna biasa. Link ialah laman produk atau dokumentasi rasmi penerbit.

| # | Tool | Kegunaan / hasil modul RM10 | Segmen | Fasa | Sumber rasmi |
|---:|---|---|---|---|---|
| 1 | Adobe Firefly | Visual iklan dengan brand kit | Bisnes/kreator | P1 | [Adobe](https://www.adobe.com/products/firefly.html) |
| 2 | Midjourney | Moodboard kempen dan prompt imej | Kreator | P2 | [Midjourney](https://docs.midjourney.com/hc/en-us/articles/33329261836941-Getting-Started-Guide) |
| 3 | Ideogram | Poster produk dengan teks visual | Bisnes/kreator | P1 | [Ideogram](https://ideogram.ai/) |
| 4 | Recraft | Set grafik kempen konsisten | Designer/kreator | P2 | [Recraft](https://www.recraft.ai/generate) |
| 5 | Runway | Video pendek promosi daripada shotlist | Kreator | P2 | [Runway](https://help.runwayml.com/hc/en-us/articles/37425232841875-Getting-Started-with-Generative-Video) |
| 6 | Pika | Video hook pendek untuk sosial | Kreator | P2 | [Pika](https://pika.art/blog/welcome-to-the-new-pika) |
| 7 | Luma | Konsep video produk ringkas dengan model Ray | Kreator | P2 | [Luma](https://lumalabs.ai/) |
| 8 | Kling AI | B-roll dan klip produk | Kreator | P2 | [Kling](https://app.klingai.com/global/) |
| 9 | HeyGen | Presenter/avatar untuk video penerangan | Bisnes/kreator | P2 | [HeyGen](https://www.heygen.com/) |
| 10 | ElevenLabs | Voice-over BM/English dan semakan sebutan | Kreator | P1 | [ElevenLabs](https://elevenlabs.io/) |
| 11 | Suno | Jingle draf untuk kempen | Kreator | P2 | [Suno](https://suno.com/) |
| 12 | Descript | Edit video/podcast berasaskan transkrip | Kreator | P2 | [Descript](https://www.descript.com/) |
| 13 | CapCut AI | Video TikTok dengan subtitle dan potongan | Bisnes/kreator | P1 | [CapCut](https://www.capcut.com/) |
| 14 | Adobe Express | Konten jenama dan resize pelbagai format | Bisnes/kreator | P2 | [Adobe](https://www.adobe.com/express/) |
| 15 | OpusClip | Pecahkan video panjang kepada klip pendek | Kreator | P1 | [OpusClip](https://www.opus.pro/) |
| 16 | Gamma | Deck pitching/assignment daripada outline | Student/bisnes | P1 | [Gamma](https://gamma.app/) |
| 17 | Napkin AI | Infografik proses daripada teks | Student/bisnes | P1 | [Napkin](https://www.napkin.ai/) |
| 18 | Elicit | Cari dan banding kertas penyelidikan | Student | P2 | [Elicit](https://elicit.com/) |
| 19 | Granola | Nota mesyuarat dan action items | Kerja/bisnes | P2 | [Granola](https://www.granola.ai/) |
| 20 | Otter.ai | Transkrip mesyuarat dan ringkasan | Kerja/bisnes | P2 | [Otter](https://otter.ai/) |
| 21 | Genspark | Research → slides/sheets berstruktur | Student/bisnes | P2 | [Genspark](https://www.genspark.ai/helpcenter) |
| 22 | Manus | Tugasan research/slide dengan agent | Student/bisnes | P2 | [Manus](https://manus.im/) |
| 23 | GitHub Copilot | Refactor kod dan terangkan pull request | CS student/dev | P1 | [GitHub](https://github.com/features/copilot) |
| 24 | Windsurf | Coding dalam AI IDE dengan review diff | CS student/dev | P2 | [Windsurf](https://windsurf.com/editor) |
| 25 | Replit Agent | Bina demo app daripada brief | Student/founder | P1 | [Replit](https://replit.com/products/agent) |
| 26 | Bolt.new | Prototype web app dan preview | Student/founder | P2 | [Bolt](https://bolt.new/) |
| 27 | Lovable | Landing page/app dan iterasi UI | Founder/student | P1 | [Lovable](https://lovable.dev/) |
| 28 | v0 | UI React daripada prompt dan reference | Dev/designer | P2 | [v0](https://v0.app/) |
| 29 | Aider | Coding AI dalam terminal berasaskan Git | Developer | P2 | [Aider](https://aider.chat/docs/) |
| 30 | Cline | Agent coding dalam editor dan approval diff | Developer | P2 | [Cline](https://cline.bot/) |
| 31 | Devin | Delegasi tugasan coding terhad | Developer | P2 | [Devin](https://devin.ai/) |
| 32 | Kilo | AI coding agent IDE/CLI | Developer | P2 | [Kilo](https://kilo.ai/) |
| 33 | Dify | FAQ/RAG bot berasaskan dokumen | Bisnes/dev | P1 | [Dify](https://docs.dify.ai/) |
| 34 | Flowise | Visual agent untuk FAQ dan tools | Bisnes/dev | P2 | [Flowise](https://docs.flowiseai.com/) |
| 35 | Langflow | Visual workflow AI dan MCP | Developer | P2 | [Langflow](https://docs.langflow.org/) |
| 36 | LangGraph | Agent stateful dengan checkpoint | Developer | P2 | [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview) |
| 37 | CrewAI | Kerja berpasukan beberapa agent | Developer | P2 | [CrewAI](https://docs.crewai.com/) |
| 38 | OpenAI Agents SDK | Agent dengan tools, guardrails dan trace | Developer | P2 | [OpenAI](https://openai.github.io/openai-agents-python/) |
| 39 | Google ADK | Agent Gemini dengan tools dan deploy | Developer | P2 | [Google](https://google.github.io/adk-docs/) |
| 40 | Microsoft Agent Framework | Agent/workflow Python atau .NET | Developer | P2 | [Microsoft](https://learn.microsoft.com/en-us/agent-framework/) |
| 41 | PydanticAI | Agent Python dengan validasi berjenis | Developer | P2 | [Pydantic](https://ai.pydantic.dev/) |
| 42 | Mastra | Agent dan workflow TypeScript | Developer | P2 | [Mastra](https://mastra.ai/docs) |
| 43 | MCP Inspector | Test server MCP dan semak tools | Developer | P1 | [MCP](https://modelcontextprotocol.io/docs/tools/inspector) |
| 44 | GitHub MCP Server | Agent baca repo, issue dan PR dengan izin | Developer | P1 | [GitHub](https://github.com/github/github-mcp-server) |
| 45 | Playwright MCP | Agent kendalikan browser untuk QA | Developer | P2 | [Microsoft](https://github.com/microsoft/playwright-mcp) |
| 46 | Context7 MCP | Agent rujuk docs library terkini | Developer | P1 | [Upstash](https://github.com/upstash/context7) |
| 47 | Supabase MCP | Agent kerja dengan projek Supabase | Developer | P2 | [Supabase](https://supabase.com/docs/guides/ai-tools/mcp) |
| 48 | Cloudflare Documentation MCP | Agent cari docs Cloudflare | Developer | P2 | [Cloudflare](https://developers.cloudflare.com/docs-for-agents/) |
| 49 | MCP Filesystem Server | Agent baca/tulis folder terhad untuk demo | Developer | P1 | [MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) |
| 50 | MCP Memory Server | Demo memori knowledge graph tempatan | Developer | P2 | [MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/memory) |

**Nota nama:** Luma memasarkan model/produk semasa sebagai Ray/Luma; jangan jual modul baharu dengan nama lama “Dream Machine” tanpa semakan. Nama dan ciri produk AI berubah cepat. “MCP” ialah protokol sambungan; `MCP server` mendedahkan tools/resources kepada agent, manakala agent framework mengurus aliran tugas. Jangan campur ketiga-tiganya sebagai satu produk.

## Modul pertama yang lebih kuat daripada senarai nama

| Susunan | Tajuk berasaskan hasil | Persona | Bukti siap yang pembeli bawa pulang |
|---:|---|---|---|
| 1 | 5 video TikTok daripada 1 video panjang (OpusClip + CapCut) | Owner/creator | 5 klip dengan subtitle dan hook |
| 2 | Slide assignment daripada nota sendiri (Gamma + Napkin AI) | Student | Deck 8–10 slide dan 1 infografik, fakta disemak |
| 3 | 7 visual produk konsisten (Firefly/Ideogram) | Owner | Set grafik siap untuk posting |
| 4 | Website pertama dari brief ke live (Replit Agent/Lovable + GitHub) | CS student/owner | URL live, repo dan checklist semakan |
| 5 | FAQ bisnes yang jawab daripada dokumen (Dify) | Owner | Bot demo dengan sumber jawapan |
| 6 | Agent coding dengan docs yang betul (Context7 MCP) | Developer | Setup MCP, satu task, diff yang disemak |
| 7 | Sambung agent ke GitHub tanpa beri akses berlebihan (GitHub MCP) | Developer | Agent membaca issue dan draf PR; scope izin jelas |
| 8 | Bina MCP server pertama (Filesystem + Inspector) | CS student/dev | Server lokal dan hasil test tools/list, tools/call |

Untuk RM10, setiap modul patut ada hasil tunggal, 3–8 langkah, link rasmi, template/input contoh, kos akaun/API, had percuma yang *disemak semasa publish*, screenshot hasil, dan troubleshooting ringkas. Bagi modul agent/MCP, sediakan langkah permission, data privasi, dan rollback. Jangan janjikan video AI/agent kompleks “percuma” tanpa semakan harga semasa.

## Ujian demand sebelum penuhkan katalog

- Uji 8 modul awal melalui halaman senarai tunggu atau modul pilot; bagi tool lain status `Akan datang` yang jujur.
- Track per kategori: impressions → klik kad (CTR), klik “lihat modul” → pembelian (conversion), kos pemerolehan pelanggan (CAC), dan pembelian modul kedua dalam 30 hari (repeat purchase). Sasaran awal ialah **hipotesis**, bukan angka pasaran yang dibuktikan.
- A/B test tajuk “Nama tool” melawan “Hasil siap” pada kad modul. Contoh `CapCut AI` vs `5 video TikTok daripada 1 video panjang`. Prioritikan yang menghasilkan pembelian, bukan sekadar klik.
- Hanya tambah logo selepas cek asal usul, lesen/brand guidance, kontras light/dark dan paparan mobile. Letakkan kredit/penafian jenama dalam dokumentasi, bukan logo yang diubah sesuka hati.

## Sumber untuk arah pasaran

- [Stack Overflow 2025 Developer Survey — AI](https://survey.stackoverflow.co/2025/ai): penggunaan dan kebimbangan developer terhadap agent; ini data global developer, **bukan ukuran demand Malaysia**.
- [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/): aktiviti projek AI sebagai petunjuk kategori developer.
- [MCP overview](https://developers.cloudflare.com/agents/model-context-protocol/) dan [official reference servers](https://github.com/modelcontextprotocol/servers): takrif protokol serta contoh server.
