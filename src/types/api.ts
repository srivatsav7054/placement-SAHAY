export interface DashboardActivity {
  id: string;
  action: string;
  target: string;
  time: string;
}

export interface DashboardNotification {
  id: string;
  text: string;
  trend: "up" | "neutral";
}

export interface DashboardSummary {
  totalResumes: number;
  profileCompletion: number;
  latestResume: {
    id: string;
    title: string;
    updatedAt: string;
  } | null;
  highestJobMatchResume: {
    resumeId: string | null;
    versionId: string;
    title: string;
    jobMatchScore: number | null;
  } | null;
  recentActivity: DashboardActivity[];
  trendingNotifications: DashboardNotification[];
  profileCardVisible: boolean;
}

export interface ResumeSectionItem {
  heading?: string;
  subheading?: string;
  description?: string;
  bullets?: string[];
  link?: string;
}

export interface ResumeJson {
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    headline?: string;
    summary?: string;
    links?: Array<{ label?: string; url?: string }>;
  };
  education?: Array<{
    institution: string;
    degree?: string;
    fieldOfStudy?: string;
    grade?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  experience?: Array<{
    company: string;
    role?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    description?: string;
    bullets?: string[];
  }>;
  projects?: Array<{
    title: string;
    role?: string;
    description?: string;
    techStack?: string[];
    link?: string;
    repositoryUrl?: string;
    bullets?: string[];
  }>;
  achievements?: Array<{
    title: string;
    description?: string;
    date?: string;
  }>;
  certificates?: Array<{
    title: string;
    issuer?: string;
    driveLink?: string;
    issueDate?: string;
  }>;
  customSections?: Array<{
    title: string;
    limit?: number;
    items?: ResumeSectionItem[];
  }>;
  template?: {
    layout?: string;
    stylingConfig?: Record<string, unknown>;
  };
}

export interface ResumeVersionRecord {
  _id: string;
  resumeId: string;
  userId: string;
  versionNumber: number;
  sourceType: "blank" | "job-description" | "upload";
  uploadedFile?: {
    fileName?: string;
    originalName?: string;
    mimeType?: string;
    fileSize?: number;
    fileUrl?: string;
  };
  resumeJSON: ResumeJson;
  metadata: {
    createdAt: string;
    updatedAt: string;
    builtAt: string | null;
    jobMatchScore: number | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ResumeRecord {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  latestVersionId?: ResumeVersionRecord | null;
  highestJobMatchVersionId?: ResumeVersionRecord | null;
  sourceType: "blank" | "job-description" | "upload";
  createdAt: string;
  updatedAt: string;
}

export interface ResumeAnalysis {
  jobMatchScore: number;
  comments: string[];
  errors: string[];
  warnings: string[];
}

export interface CommunityPost {
  _id: string;
  text: string;
  imageUrl?: string;
  likes: string[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
  userId: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    headline?: string;
  };
}

export interface TodoItem {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WeatherSummary {
  city: string;
  temperatureCelsius: number;
  condition: string;
  humidity: number;
  windKph: number;
  updatedAt: string;
}
