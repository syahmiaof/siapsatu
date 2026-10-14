import { UserProgress } from "@/types";
import { INITIAL_USER_PROGRESS } from "@/data/mockData";

const STORAGE_KEY = "siapsatu_user_progress_v1";

export function getStoredProgress(): UserProgress {
  if (typeof window === "undefined") {
    return INITIAL_USER_PROGRESS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_USER_PROGRESS;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read user progress from localStorage", e);
    return INITIAL_USER_PROGRESS;
  }
}

export function saveStoredProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save user progress to localStorage", e);
  }
}

export function markStepCompleted(moduleSlug: string, stepNumber: number): UserProgress {
  const current = getStoredProgress();
  const currentCompleted = current.completedSteps[moduleSlug] || [];
  if (!currentCompleted.includes(stepNumber)) {
    const updated = {
      ...current,
      completedSteps: {
        ...current.completedSteps,
        [moduleSlug]: [...currentCompleted, stepNumber]
      }
    };
    saveStoredProgress(updated);
    return updated;
  }
  return current;
}
