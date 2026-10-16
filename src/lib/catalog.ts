import { MODULES, TOOLS } from "@/data/mockData";

// The published catalog is the source of availability, never planned moduleSlugs/badges.
export const modulesForTool = (slug: string) =>
  MODULES.filter((module) => module.toolSlugs.includes(slug));

const featuredTools = [
  "chatgpt",
  "gemini",
  "claude",
  "perplexity",
  "notebooklm",
  "n8n",
  "make",
  "zapier",
  "hermes-agent",
  "codex",
  "github",
  "cursor",
  "vercel",
  "canva",
  "figma",
  "notion",
];
export const directoryTools = [...TOOLS].sort((a, b) => {
  const availability =
    Number(modulesForTool(b.slug).length > 0) -
    Number(modulesForTool(a.slug).length > 0);
  if (availability) return availability;
  const rank = (slug: string) => {
    const index = featuredTools.indexOf(slug);
    return index < 0 ? featuredTools.length : index;
  };
  return rank(a.slug) - rank(b.slug);
});
