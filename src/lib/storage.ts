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
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return INITIAL_USER_PROGRESS;
    const candidate = value as Partial<UserProgress>;
    if (
      !Array.isArray(candidate.ownedModuleSlugs) ||
      !candidate.ownedModuleSlugs.every((s) => typeof s === "string") ||
      !Array.isArray(candidate.completedModuleSlugs) ||
      !candidate.completedModuleSlugs.every((s) => typeof s === "string") ||
      typeof candidate.currentModuleSlug !== "string" ||
      !Number.isInteger(candidate.currentStepIndex) ||
      !candidate.completedSteps ||
      typeof candidate.completedSteps !== "object" ||
      Array.isArray(candidate.completedSteps) ||
      !Object.values(candidate.completedSteps).every(
        (steps) =>
          Array.isArray(steps) &&
          steps.every((n) => Number.isInteger(n) && n > 0),
      ) ||
      !Array.isArray(candidate.completedOutputs) ||
      !candidate.completedOutputs.every(
        (o) =>
          o &&
          typeof o === "object" &&
          ["id", "type", "title", "date", "moduleSlug"].every(
            (key) => typeof o[key as keyof typeof o] === "string",
          ),
      )
    )
      return INITIAL_USER_PROGRESS;
    return candidate as UserProgress;
  } catch {
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

export function markStepCompleted(
  moduleSlug: string,
  stepNumber: number,
): UserProgress {
  const current = getStoredProgress();
  const currentCompleted = current.completedSteps[moduleSlug] || [];
  if (!currentCompleted.includes(stepNumber)) {
    const updated = {
      ...current,
      completedSteps: {
        ...current.completedSteps,
        [moduleSlug]: [...currentCompleted, stepNumber],
      },
    };
    saveStoredProgress(updated);
    return updated;
  }
  return current;
}
