"use client";

import { useSearchParams } from "next/navigation";

/** Search replaces the current entry; category choices remain reversible with Back. */
export function useDirectoryFilters() {
  const params = useSearchParams();
  const goal = params.get("goal");
  const searchQuery = params.get("search") || "";
  const selectedCategory =
    params.get("category") || (goal === "jual" ? "bisnes" : goal) || "semua";
  const selectedTool = params.get("tool");

  function update(key: "search" | "category", value: string) {
    const next = new URLSearchParams(window.location.search);
    if (value && value !== "semua") next.set(key, value);
    else next.delete(key);
    if (key === "category") next.delete("goal");
    const query = next.toString();
    const url = window.location.pathname + (query ? `?${query}` : "");
    if (key === "search") window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
  }

  return {
    searchQuery,
    selectedCategory,
    selectedTool,
    setSearchQuery: (value: string) => update("search", value),
    setSelectedCategory: (value: string) => update("category", value),
    resetFilters: () =>
      window.history.pushState(null, "", window.location.pathname),
  };
}
