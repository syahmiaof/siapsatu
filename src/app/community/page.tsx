"use client";

import React, { useState, useRef } from "react";

import Image from "next/image";

import Link from "next/link";

import {
  MessageSquare,
  Heart,
  Send,
  Image as ImageIcon,
  Link2,
  Code2,
  Pin,
  CheckCircle2,
  Trophy,
  Sparkles,
  HelpCircle,
  Share2,
  Megaphone,
  Hash,
} from "lucide-react";

import { BrandScene } from "@/components/brand/BrandScene";

import styles from "./community.module.css";

import { COMMUNITY_POSTS } from "@/data/mockData";

import { CommunityPost } from "@/types";

import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

import { RevealSection } from "@/components/motion/RevealSection";

import { CommunityNotice } from "@/components/community/CommunityNotice";

const CHANNELS = [
  { id: "semua", label: "Semua Saluran", icon: Hash },

  { id: "pengumuman", label: "Pengumuman", icon: Megaphone },

  { id: "kongsi", label: "Kongsi Hasil", icon: Trophy },

  { id: "tanya", label: "Tanya Soalan", icon: HelpCircle },

  { id: "idea", label: "Cadang Modul", icon: Sparkles },
];

const COMMUNITY_RULES = [
  "Hormat sesama ahli dan bina budaya belajar yang positif.",

  "Tiada promosi skim cepat kaya, affiliate liar atau spam.",

  "Fokus konsep: Satu modul, satu hasil praktikal.",

  "Sertakan screenshot atau mesej ralat lengkap bila bertanya soalan.",

  "Kongsikan template dan kod yang selamat untuk komuniti.",
];

export default function CommunityPage() {
  const [notice, setNotice] = useState("");

  const composeRef = useRef<HTMLTextAreaElement>(null);

  function insertText(text: string) {
    setNewPostContent(
      (previous) => `${previous}${previous ? "\n" : ""}${text}`,
    );
    composeRef.current?.focus();
  }

  async function sharePost(post: CommunityPost) {
    try {
      await navigator.clipboard.writeText(`${post.title}\n${post.body}`);
      setNotice("Teks hantaran demo disalin.");
    } catch {
      setNotice(
        "Salinan automatik tidak tersedia. Pilih dan salin teks hantaran secara manual.",
      );
    }
  }

  const [activeChannel, setActiveChannel] = useState("semua");

  const [filterType, setFilterType] = useState<
    "terkini" | "popular" | "soalan"
  >("terkini");

  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);

  const [newPostContent, setNewPostContent] = useState("");

  const [newPostTitle, setNewPostTitle] = useState("");

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const handleLike = (postId: string) => {
    const liked = !!likedPosts[postId];

    setLikedPosts({ ...likedPosts, [postId]: !liked });

    setPosts(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              reactions: {
                ...p.reactions,
                likes: p.reactions.likes + (liked ? -1 : 1),
              },
            }
          : p,
      ),
    );
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPostContent.trim()) return;

    const postChannel: CommunityPost["channel"] =
      activeChannel === "pengumuman" ||
      activeChannel === "tanya" ||
      activeChannel === "kongsi" ||
      activeChannel === "idea"
        ? activeChannel
        : "kongsi";

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,

      author: {
        name: "Anda (Pelajar SiapSatu)",

        role: "Student",

        avatar: "/assets/avatars/avatar-ammar.png",
      },

      timeAgo: "Sebentar tadi",

      title: newPostTitle.trim() || "Perkongsian Komuniti",

      body: newPostContent.trim(),

      channel: postChannel,

      tags: ["Komuniti", "SiapSatu"],

      reactions: {
        likes: 0,

        replies: 0,
      },
    };

    setPosts([newPost, ...posts]);

    setNotice(
      "Hantaran demo ditambah pada halaman ini sahaja. Tiada mesej dihantar kepada orang lain.",
    );

    setNewPostContent("");

    setNewPostTitle("");
  };

  const filteredPosts = posts
    .filter((post) => {
      if (activeChannel !== "semua" && post.channel !== activeChannel)
        return false;

      if (filterType === "soalan" && post.channel !== "tanya") return false;

      return true;
    })
    .sort((a, b) =>
      filterType === "popular" ? b.reactions.likes - a.reactions.likes : 0,
    );

  return (
    <div className="container">
      <div className={styles.pageLayout}>
        {/* Left: Channels Sidebar */}

        <aside className={styles.channelsSidebar} aria-label="Saluran Komuniti">
          <div
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8rem",
              fontWeight: 800,
              color: "var(--ss-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Saluran
          </div>

          {CHANNELS.map((ch) => {
            const Icon = ch.icon;

            const isActive = activeChannel === ch.id;

            return (
              <button
                key={ch.id}
                className={`${styles.channelItem} ${isActive ? styles.channelActive : ""}`}
                onClick={() => setActiveChannel(ch.id)}
              >
                <Icon size={18} />

                <span>{ch.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Center: Main Feed */}

        <div className={styles.feedCol}>
          {/* Top Banner */}

          <section className={styles.communityBanner}>
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(255,255,255,0.15)",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "var(--ss-radius-pill)",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  marginBottom: "0.75rem",
                }}
              >
                <Sparkles size={14} color="var(--ss-yellow)" /> Komuniti demo ·
                hantaran contoh
              </div>

              <AnimatedHeading
                text="Belajar seorang, support ramai."
                highlightWords={["support", "ramai."]}
                as="h1"
                className={styles.bannerTitle}
              />

              <p className={styles.bannerSub}>
                Tanya, kongsi hasil dan belajar bersama. Semua hantaran di sini
                ialah contoh prototaip.
              </p>
            </div>

            <div>
              <BrandScene />
            </div>
          </section>

          {/* Create Post Form */}

          <section className={styles.createPostBox}>
            <form onSubmit={handlePublishPost}>
              <div className={styles.postTopRow}>
                <span className={styles.initialAvatar} aria-hidden="true">
                  S
                </span>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <textarea
                    placeholder="Kongsi hasil kerja, tanya soalan langkah demi langkah, atau cadang modul seterusnya..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className={styles.postInput}
                    rows={2}
                    ref={composeRef}
                    aria-label="Isi hantaran demo"
                    style={{ resize: "vertical" }}
                  />
                </div>
              </div>

              <div className={styles.postActionsBar}>
                <div className={styles.attachButtons}>
                  <details className={styles.optionalTitle}>
                    <summary>Tajuk</summary>

                    <input
                      type="text"
                      placeholder="Tajuk hantaran atau persoalan anda..."
                      aria-label="Tajuk hantaran demo"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className={styles.postInput}
                      style={{ fontWeight: 700 }}
                    />
                  </details>

                  <button
                    type="button"
                    onClick={() => insertText("Pautan imej: ")}
                    className={styles.attachBtn}
                    title="Tambah pautan imej"
                  >
                    <ImageIcon size={16} /> Imej
                  </button>

                  <button
                    type="button"
                    onClick={() => insertText("Pautan: https://")}
                    className={styles.attachBtn}
                    title="Kongsi pautan"
                  >
                    <Link2 size={16} /> Pautan
                  </button>

                  <button
                    type="button"
                    onClick={() => insertText("Kod contoh:\n")}
                    className={styles.attachBtn}
                    title="Snippet kod"
                  >
                    <Code2 size={16} /> Kod
                  </button>
                </div>

                <button
                  type="submit"
                  className={styles.publishBtn}
                  disabled={!newPostContent.trim()}
                >
                  <Send size={15} /> Tambah hantaran demo
                </button>
              </div>
            </form>
          </section>

          <p role="status" className={notice ? "prototype-note" : "sr-only"}>
            {notice}
          </p>

          {/* Filter Bar */}

          <div className={styles.feedFiltersRow}>
            <div className={styles.filterPills}>
              <button
                className={`${styles.filterPill} ${filterType === "terkini" ? styles.filterActive : ""}`}
                onClick={() => setFilterType("terkini")}
              >
                Terkini
              </button>

              <button
                className={`${styles.filterPill} ${filterType === "popular" ? styles.filterActive : ""}`}
                onClick={() => setFilterType("popular")}
              >
                Popular
              </button>

              <button
                className={`${styles.filterPill} ${filterType === "soalan" ? styles.filterActive : ""}`}
                onClick={() => setFilterType("soalan")}
              >
                Tanya Soalan
              </button>
            </div>

            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--ss-muted)",
                fontWeight: 600,
              }}
            >
              Menunjukkan {filteredPosts.length} hantaran
            </div>
          </div>

          {/* Posts Feed */}

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {filteredPosts.length === 0 && (
              <p className={styles.postCard}>
                Belum ada hantaran contoh dalam saluran ini. Tambah satu
                hantaran demo di atas.
              </p>
            )}

            {filteredPosts.map((post) => {
              const isLiked = !!likedPosts[post.id];

              return (
                <article key={post.id} className={styles.postCard} id={post.id}>
                  {post.isPinned && (
                    <div className={styles.pinnedBadge}>
                      <Pin size={14} /> Contoh hantaran disematkan
                    </div>
                  )}

                  <div className={styles.postHeader}>
                    <div className={styles.authorGroup}>
                      <span className={styles.initialAvatar} aria-hidden="true">
                        {post.author.name.charAt(0)}
                      </span>

                      <div>
                        <div className={styles.authorMeta}>
                          <span className={styles.authorName}>
                            {post.author.name}
                          </span>

                          <span
                            className={`${styles.roleBadge} ${post.author.role === "Admin" ? styles.roleAdmin : styles.roleStudent}`}
                          >
                            {post.author.role}
                          </span>
                        </div>

                        <div className={styles.postTime}>
                          {post.timeAgo} · #{post.channel}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className={styles.postTitle}>{post.title}</h2>

                    <p className={styles.postBody}>{post.body}</p>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className={styles.tagsRow}>
                      {post.tags.map((t) => (
                        <span key={t} className={styles.tagPill}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={styles.reactionsBar}>
                    <button
                      className={`${styles.reactionBtn} ${isLiked ? styles.liked : ""}`}
                      onClick={() => handleLike(post.id)}
                      aria-label="Suka hantaran"
                    >
                      <Heart
                        size={18}
                        fill={isLiked ? "currentColor" : "none"}
                      />

                      <span>{post.reactions.likes} Suka</span>
                    </button>

                    <button
                      onClick={() =>
                        insertText(`Balasan untuk ${post.author.name}: `)
                      }
                      className={styles.reactionBtn}
                      aria-label="Balas hantaran"
                    >
                      <MessageSquare size={18} />

                      <span>{post.reactions.replies} Balasan</span>
                    </button>

                    <button
                      onClick={() => sharePost(post)}
                      className={styles.reactionBtn}
                      aria-label="Kongsi hantaran"
                    >
                      <Share2 size={18} />

                      <span>Kongsi</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: WhatsApp & Community Rules */}

        <aside className={styles.rightSidebar}>
          {/* WhatsApp Broadcast Notice */}

          <div className={styles.whatsappSidebarCard}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Image
                src="/assets/tools/whatsapp.svg"
                alt="WhatsApp"
                width={28}
                height={28}
              />

              <div
                style={{
                  fontFamily: "var(--font-display, inherit)",
                  fontWeight: 900,
                  fontSize: "1.15rem",
                  color: "var(--ss-navy-950)",
                }}
              >
                Saluran WhatsApp SiapSatu
              </div>
            </div>

            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--ss-navy-950)",
                lineHeight: 1.4,
              }}
            >
              Jemputan WhatsApp belum dibuka. Lihat format modul dan contoh
              hasil sementara menunggu pelancaran.
            </p>

            <a
              href="/modules"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--ss-green-dark)",

                color: "#ffffff",

                padding: "0.65rem 1.25rem",

                borderRadius: "var(--ss-radius-pill)",

                textAlign: "center",

                fontWeight: 800,

                fontSize: "0.9rem",

                textDecoration: "none",

                display: "inline-block",
              }}
            >
              Teroka modul RM10
            </a>
          </div>

          {/* Weekly Challenge */}

          <div className={styles.challengeCard}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--ss-orange)",
              }}
            >
              <Trophy size={20} />

              <span
                style={{
                  fontFamily: "var(--font-display, inherit)",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "var(--ss-navy-950)",
                }}
              >
                Cadangan latihan
              </span>
            </div>

            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--ss-navy-900)",
                lineHeight: 1.45,
              }}
            >
              <strong>Bina Google Sheets CRM Pertama:</strong> Siapkan modul n8n
              dan kongsikan screenshot spreadsheet terisi anda dalam hantaran
              demo #kongsi.
            </p>

            <Link
              href="/modules/n8n-google-sheets"
              style={{
                fontSize: "0.85rem",

                fontWeight: 800,

                color: "var(--ss-orange)",

                textDecoration: "underline",
              }}
            >
              Buka Modul n8n →
            </Link>
          </div>

          {/* Community Guidelines */}

          <div className={styles.rulesCard}>
            <h3 className={styles.rulesTitle}>
              <CheckCircle2 size={20} color="var(--ss-green)" />
              Peraturan Komuniti
            </h3>

            <ul className={styles.rulesList}>
              {COMMUNITY_RULES.map((rule, idx) => (
                <li key={idx} className={styles.ruleItem}>
                  <span style={{ color: "var(--ss-orange)", fontWeight: 900 }}>
                    ·
                  </span>

                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
