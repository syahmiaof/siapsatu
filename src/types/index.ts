export type ToolCategory =
  | "ai"
  | "automation"
  | "coding"
  | "design"
  | "productivity";

export interface Tool {
  slug: string;
  name: string;
  category: ToolCategory;
  logoPath: string;
  brandColor: string;
  summary: string;
  officialUrl: string;
  moduleSlugs: string[];
  badge?: string;
  highlights?: {
    icon: string;
    title: string;
    description: string;
  }[];
  prerequisites?: {
    icon: string;
    title: string;
    description: string;
  }[];
  workflowSteps?: {
    step: string;
    title: string;
    description: string;
  }[];
}

export interface LessonLink {
  label: string;
  href: string;
}

export interface Lesson {
  id: string;
  stepNumber: number;
  title: string;
  actionTitle?: string;
  actionSubtitle?: string;
  body: string;
  outcomeCallout?: string;
  instructions?: {
    step: number;
    title: string;
    detail: string;
  }[];
  officialLinks: LessonLink[];
  template?: string;
  templateLanguage?: string;
  task?: string;
  diagramSvg?: string;
  imagePath?: string;
}

export interface Module {
  slug: string;
  title: string;
  eyebrow?: string;
  shortOutcome: string;
  priceMyr: 10;
  level: "beginner" | "intermediate";
  estimatedMinutes: number;
  toolSlugs: string[];
  tags: string[];
  audience?: ("bisnes" | "kerja" | "student" | "bina")[];
  prerequisites: string[];
  lessons: Lesson[];
  featured?: boolean;
  themeColor?: string; // e.g. navy, crimson, green, orange
  heroIllustration?: string;
  whatYouWillDo?: {
    step: number;
    title: string;
    description: string;
  }[];
  providedTemplates?: {
    title: string;
    description: string;
    type: string;
  }[];
  nextModuleSlug?: string;
}

export interface LearningPath {
  slug: string;
  title: string;
  headline: string;
  subheadline: string;
  category: string;
  durationMinutes: number;
  level: "Beginner" | "Intermediate";
  regularPriceMyr: number;
  bundlePriceMyr: number;
  moduleSlugs: string[];
  finalOutcomes: {
    title: string;
    description: string;
    icon: string;
  }[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface UserProgress {
  ownedModuleSlugs: string[];
  completedModuleSlugs: string[];
  currentModuleSlug: string;
  currentStepIndex: number;
  completedSteps: Record<string, number[]>; // moduleSlug -> step numbers
  completedOutputs: {
    id: string;
    type: string;
    title: string;
    date: string;
    moduleSlug: string;
    url?: string;
  }[];
}

export interface ProgressStepNode {
  id: string;
  title: string;
  description: string;
  status: "siap" | "seterusnya" | "dalam_progress" | "akan_datang";
  moduleSlug?: string;
  badgeLabel?: string;
  artifactPreview?: {
    type: "script" | "faq" | "campaign" | "document" | "notebook" | "workflow" | "repo" | "website" | "deployed";
    label: string;
    items?: string[];
  };
}

export interface ProgressTrack {
  id: string;
  number: string;
  title: string;
  description: string;
  color: "navy" | "crimson" | "green";
  steps: ProgressStepNode[];
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    role: "Admin" | "Student" | "Owner";
    avatar: string;
  };
  timeAgo: string;
  title: string;
  body: string;
  channel: "pengumuman" | "tanya" | "kongsi" | "idea";
  tags: string[];
  reactions: {
    likes: number;
    replies: number;
  };
  isPinned?: boolean;
  image?: string;
}
