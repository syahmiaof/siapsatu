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
  BarChart3,
  Pin,
  CheckCircle2,
  Trophy,
  Sparkles,
  Share2,
  Bookmark,
  MoreHorizontal,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { CommunityArtwork } from "@/components/brand/CommunityArtwork";
import { DemoThumbnail } from "@/components/community/DemoThumbnail";
import styles from "./community.module.css";
import { COMMUNITY_POSTS } from "@/data/mockData";
import { CommunityPost } from "@/types";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

const CHANNELS = [
  {
    id: "semua",
    label: "Semua Saluran",
    iconPath: "/assets/illustrations/ui-v4/channel-semua.svg",
  },
  {
    id: "pengumuman",
    label: "Pengumuman",
    iconPath: "/assets/illustrations/ui-v4/channel-pengumuman.svg",
  },
  {
    id: "kongsi",
    label: "Kongsi Hasil",
    iconPath: "/assets/illustrations/ui-v4/channel-kongsi.svg",
  },
  {
    id: "tanya",
    label: "Tanya Soalan",
    iconPath: "/assets/illustrations/ui-v4/channel-tanya.svg",
  },
  {
    id: "idea",
    label: "Cadang Modul",
    iconPath: "/assets/illustrations/ui-v4/channel-idea.svg",
  },
];

const COMMUNITY_RULES = [
  "Bersikap baik dan saling menghormati.",
  "Fokus pada topik berkaitan SiapSatu.",
  "__BOLD__Jangan kongsi API key atau data pelanggan__BOLD__",
  "Tiada spam atau promosi melampau.",
  "Kongsi pengalaman yang membina.",
  "Bantu rakan lain dengan ikhlas.",
];

export default function CommunityPage() {
  const [notice, setNotice] = useState("");
  const composeRef = useRef<HTMLTextAreaElement>(null);

  const [activeChannel, setActiveChannel] = useState("semua");
  const [filterType, setFilterType] = useState<"semua" | "pengumuman" | "tanya" | "kongsi" | "idea">("semua");
  const [sortBy, setSortBy] = useState<"terkini" | "popular">("terkini");
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});

  function insertText(text: string) {
    setNewPostContent((prev) => `${prev}${prev ? "\n" : ""}${text}`);
    composeRef.current?.focus();
  }

  async function sharePost(post: CommunityPost) {
    try {
      await navigator.clipboard.writeText(`${post.title}\n${post.body}`);
      setNotice("Teks hantaran demo disalin.");
    } catch {
      setNotice("Salinan automatik tidak tersedia. Salin teks hantaran secara manual.");
    }
  }

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

  const handleSave = (postId: string) => {
    const saved = !!savedPosts[postId];
    setSavedPosts({ ...savedPosts, [postId]: !saved });
    setNotice(saved ? "Hantaran dikeluarkan daripada simpanan." : "Hantaran demo disimpan.");
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
        avatar: "/assets/avatars/avatar-user.png",
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
    setNotice("Hantaran demo ditambah pada halaman ini sahaja. Tiada mesej dihantar kepada orang lain.");
    setNewPostContent("");
    setNewPostTitle("");
  };

  // Filter and sort logic
  const filteredPosts = posts
    .filter((post) => {
      // Channel rail filter
      if (activeChannel !== "semua" && post.channel !== activeChannel) return false;
      // Filter tab pill filter
      if (filterType !== "semua" && post.channel !== filterType) return false;
      return true;
    })
    .sort((a, b) => (sortBy === "popular" ? b.reactions.likes - a.reactions.likes : 0));

  return (
    <div className="container">
      <div className={styles.pageLayout}>
        {/* ================================================================= */}
        {/* Header Hero Banner (Spans Center & Right Columns)                */}
        {/* ================================================================= */}
        <section className={styles.communityBanner} aria-label="Hero Komuniti SiapSatu">
          <div className={styles.bannerContent}>
            <div className={styles.bannerTag}>
              <Sparkles size={14} color="var(--ss-orange)" />
              Komuniti demo · hantaran contoh
            </div>

            <AnimatedHeading
              steadyEntrance
              text="Belajar seorang, support ramai."
              highlightWords={["support", "ramai."]}
              as="h1"
              className={styles.bannerTitle}
            />

            <p className={styles.bannerSub}>
              Tanya, kongsi, belajar bersama komuniti SiapSatu.
            </p>
          </div>

          <div className={styles.bannerArtworkWrapper}>
            <CommunityArtwork />
          </div>
        </section>

        {/* ================================================================= */}
        {/* Left Column: Channels Sidebar Rail                                */}
        {/* ================================================================= */}
        <aside className={styles.channelsSidebar} aria-label="Saluran Komuniti">
          <div className={styles.channelHeader}>Saluran</div>

          {CHANNELS.map((ch) => {
            const isActive = activeChannel === ch.id;
            return (
              <button
                key={ch.id}
                className={`${styles.channelItem} ${isActive ? styles.channelActive : ""}`}
                onClick={() => {
                  setActiveChannel(ch.id);
                  if (ch.id === "semua") {
                    setFilterType("semua");
                  } else {
                    setFilterType(ch.id as "pengumuman" | "tanya" | "kongsi" | "idea");
                  }
                }}
              >
                <span className={styles.channelIcon}>
                  <Image src={ch.iconPath} alt="" width={20} height={20} unoptimized />
                </span>
                <span>{ch.label}</span>
              </button>
            );
          })}
        </aside>

        {/* ================================================================= */}
        {/* Center Column: Post Creator, Filters & Posts Feed                 */}
        {/* ================================================================= */}
        <div className={styles.feedCol}>
          {/* Post Creator Box */}
          <section className={styles.createPostBox} aria-label="Cipta Hantaran Demo">
            <form onSubmit={handlePublishPost}>
              <div className={styles.postTopRow}>
                <span className={styles.userAvatar} aria-hidden="true">
                  <Image
                    src="/assets/avatars/avatar-user.png"
                    alt="Anda"
                    width={42}
                    height={42}
                  />
                </span>

                <textarea
                  placeholder="Tulis sesuatu untuk komuniti..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className={styles.postInput}
                  rows={2}
                  ref={composeRef}
                  aria-label="Isi hantaran demo"
                  style={{ resize: "vertical" }}
                />
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
                      className={styles.titleInputFloating}
                    />
                  </details>

                  <button
                    type="button"
                    onClick={() => insertText("Pautan imej: https://")}
                    className={styles.attachBtn}
                    title="Tambah pautan imej"
                  >
                    <ImageIcon size={16} color="var(--ss-red)" />
                    <span>Gambar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertText("Pautan: https://")}
                    className={styles.attachBtn}
                    title="Kongsi pautan"
                  >
                    <Link2 size={16} />
                    <span>Pautan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertText("Undian: [Pilihan A / Pilihan B]")}
                    className={styles.attachBtn}
                    title="Buat poll undian"
                  >
                    <BarChart3 size={16} />
                    <span>Poll</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertText("```javascript\n// Kod contoh anda di sini\n```")}
                    className={styles.attachBtn}
                    title="Snippet kod"
                  >
                    <Code2 size={16} />
                    <span>Kod</span>
                  </button>
                </div>

                <button
                  type="submit"
                  className={styles.publishBtn}
                  disabled={!newPostContent.trim()}
                  aria-label="Tambah hantaran demo"
                >
                  <Send size={15} />
                  <span>Pos</span>
                </button>
              </div>
            </form>
          </section>

          {/* Prototype Notice Alert */}
          {notice && (
            <p role="status" className="prototype-note">
              {notice}
            </p>
          )}

          {/* Filter Pills Bar & Sort */}
          <div className={styles.feedFiltersRow}>
            <div className={styles.filterPills}>
              <button
                className={`${styles.filterPill} ${filterType === "semua" ? styles.filterActive : ""}`}
                onClick={() => {
                  setFilterType("semua");
                  setActiveChannel("semua");
                }}
              >
                Semua
              </button>

              <button
                className={`${styles.filterPill} ${filterType === "pengumuman" ? styles.filterActive : ""}`}
                onClick={() => {
                  setFilterType("pengumuman");
                  setActiveChannel("pengumuman");
                }}
              >
                Pengumuman
              </button>

              <button
                className={`${styles.filterPill} ${filterType === "tanya" ? styles.filterActive : ""}`}
                onClick={() => {
                  setFilterType("tanya");
                  setActiveChannel("tanya");
                }}
              >
                Tanya Modul
              </button>

              <button
                className={`${styles.filterPill} ${filterType === "kongsi" ? styles.filterActive : ""}`}
                onClick={() => {
                  setFilterType("kongsi");
                  setActiveChannel("kongsi");
                }}
              >
                Kongsi Hasil
              </button>

              <button
                className={`${styles.filterPill} ${filterType === "idea" ? styles.filterActive : ""}`}
                onClick={() => {
                  setFilterType("idea");
                  setActiveChannel("idea");
                }}
              >
                Idea &amp; Tools
              </button>
            </div>

            <div className={styles.sortDropdownWrapper}>
              <select
                className={styles.sortDropdown}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "terkini" | "popular")}
                aria-label="Susunan suapan"
              >
                <option value="terkini">Terkini ▼</option>
                <option value="popular">Popular ▼</option>
              </select>
            </div>
          </div>

          {/* Posts Feed List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {filteredPosts.length === 0 && (
              <p className={styles.postCard}>
                Belum ada hantaran contoh dalam saluran ini. Tambah satu hantaran demo di atas.
              </p>
            )}

            {filteredPosts.map((post) => {
              const isLiked = !!likedPosts[post.id];
              const isSaved = !!savedPosts[post.id];
              const hasMedia = ["post-1", "post-2", "post-3"].includes(post.id) || !!post.image;

              return (
                <article key={post.id} className={styles.postCard} id={post.id}>
                  {post.isPinned && (
                    <div className={styles.pinnedBadge}>
                      <Pin size={12} />
                      <span>Disematkan</span>
                    </div>
                  )}

                  {/* Header Row: Author info and More menu */}
                  <div className={styles.postHeader}>
                    <div className={styles.authorGroup}>
                      <span className={styles.authorAvatar} aria-hidden="true">
                        {post.id === "post-1" ? (
                          <Image
                            src="/assets/illustrations/parity-v2/portrait-male-500.webp"
                            alt="Admin SiapSatu"
                            width={44}
                            height={62}
                          />
                        ) : post.id === "post-2" ? (
                          <Image
                            src="/assets/illustrations/parity-v2/portrait-coder-500.webp"
                            alt="Ammar H."
                            width={44}
                            height={62}
                          />
                        ) : post.id === "post-3" ? (
                          <Image
                            src="/assets/illustrations/parity-v2/portrait-woman-500.webp"
                            alt="Siti A."
                            width={44}
                            height={62}
                          />
                        ) : (
                          post.author.name.charAt(0)
                        )}
                      </span>

                      <div>
                        <div className={styles.authorMeta}>
                          <span className={styles.authorName}>{post.author.name}</span>
                          <span
                            className={`${styles.roleBadge} ${
                              post.author.role === "Admin" ? styles.roleAdmin : styles.roleStudent
                            }`}
                          >
                            {post.author.role}
                          </span>
                          <span className={styles.postTime}>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className={styles.moreBtn}
                      aria-label="Pilihan hantaran"
                      onClick={() => setNotice("Pilihan hantaran adalah ciri demo prototaip.")}
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  {/* Main Content Area (Text + Rich DemoThumbnail Preview) */}
                  <div className={hasMedia ? styles.postContent : styles.postContentNoMedia}>
                    <div>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postBody}>{post.body}</p>

                      {post.tags && post.tags.length > 0 && (
                        <div className={styles.tagsRow}>
                          {post.tags.map((t) => (
                            <span key={t} className={styles.tagPill}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {hasMedia && <DemoThumbnail postId={post.id} />}
                  </div>

                  {/* Reactions Action Bar */}
                  <div className={styles.reactionsBar}>
                    <button
                      className={`${styles.reactionBtn} ${isLiked ? styles.liked : ""}`}
                      onClick={() => handleLike(post.id)}
                      aria-label="Suka hantaran"
                    >
                      <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                      <span>{post.reactions.likes} Suka demo</span>
                    </button>

                    <button
                      onClick={() => insertText(`Balasan untuk ${post.author.name}: `)}
                      className={styles.reactionBtn}
                      aria-label="Balas hantaran"
                    >
                      <MessageSquare size={16} />
                      <span>{post.reactions.replies}</span>
                    </button>

                    <button
                      onClick={() => handleSave(post.id)}
                      className={`${styles.reactionBtn} ${isSaved ? styles.liked : ""}`}
                      aria-label="Simpan hantaran"
                    >
                      <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                      <span>Simpan</span>
                    </button>

                    <button
                      onClick={() => sharePost(post)}
                      className={styles.reactionBtn}
                      aria-label="Kongsi hantaran"
                    >
                      <Share2 size={16} />
                      <span>Kongsi</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* Right Column: WhatsApp, Guidelines & Challenge Cards              */}
        {/* ================================================================= */}
        <aside className={styles.rightSidebar} aria-label="Maklumat Sampingan Komuniti">
          {/* Card 1: WhatsApp Community Coming-Soon */}
          <div className={styles.whatsappSidebarCard}>
            <div className={styles.whatsappHeader}>
              <Image
                src="/assets/tools/whatsapp.svg"
                alt="WhatsApp"
                width={28}
                height={28}
              />
              <div className={styles.whatsappTitle}>WhatsApp Community</div>
            </div>

            <p className={styles.whatsappSub}>
              Bergabung dengan komuniti di WhatsApp untuk diskusi harian, perkongsian dan sokongan.
            </p>

            <button
              type="button"
              className={styles.whatsappBtn}
              onClick={() =>
                setNotice(
                  "Saluran WhatsApp SiapSatu: Jemputan WhatsApp belum dibuka. Komuniti rasmi akan dilancarkan selepas fasa pra-pelancaran selesai.",
                )
              }
            >
              <span>Sertai WhatsApp Community</span>
              <ArrowRight size={16} />
            </button>

            <div className={styles.socialProofRow}>
              <div className={styles.avatarStack} aria-hidden="true">
                <span className={styles.stackAvatar}>
                  <Image
                    src="/assets/illustrations/parity-v2/portrait-male-500.webp"
                    alt=""
                    width={24}
                    height={34}
                  />
                </span>
                <span className={styles.stackAvatar}>
                  <Image
                    src="/assets/illustrations/parity-v2/portrait-coder-500.webp"
                    alt=""
                    width={24}
                    height={34}
                  />
                </span>
                <span className={styles.stackAvatar}>
                  <Image
                    src="/assets/illustrations/parity-v2/portrait-woman-500.webp"
                    alt=""
                    width={24}
                    height={34}
                  />
                </span>
              </div>
              <span className={styles.socialProofText}>
                Ratusan learners saling bantu setiap hari.
              </span>
            </div>
          </div>

          {/* Card 2: Guidelines Card ("Peraturan Komuniti") */}
          <div className={styles.rulesCard}>
            <h3 className={styles.rulesTitle}>
              <ShieldCheck size={20} color="var(--ss-navy-950)" />
              <span>Peraturan Komuniti</span>
            </h3>

            <ul className={styles.rulesList}>
              {COMMUNITY_RULES.map((rule, idx) => {
                const isEmphasized = rule.includes("__BOLD__");
                const text = rule.replace(/__BOLD__/g, "");
                return (
                  <li key={idx} className={styles.ruleItem}>
                    <CheckCircle2 size={16} className={styles.ruleCheck} />
                    <span>{isEmphasized ? <strong>{text}</strong> : text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Card 3: Practice Challenge Card ("Cadangan latihan") */}
          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <div className={styles.challengeTitleGroup}>
                <Trophy size={18} />
                <span className={styles.challengeCategory}>Cabaran minggu ini</span>
              </div>
              <span className={styles.challengeBadge}>
                <Clock size={12} />
                <span>1 minggu lagi</span>
              </span>
            </div>

            <p className={styles.challengePrompt}>
              <strong>Siapkan satu automation</strong>
              <br />
              Guna mana-mana tools (n8n / Make / lain-lain) untuk bina satu automation yang berguna.
            </p>

            <Link href="/modules/n8n-google-sheets" className={styles.challengeBtn}>
              <span>Sertai cabaran</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
