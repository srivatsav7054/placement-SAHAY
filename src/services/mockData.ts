import type {
  CommunityPost,
  DashboardSummary,
  ResumeAnalysis,
  ResumeRecord,
  ResumeVersionRecord,
  TodoItem,
  WeatherSummary,
} from "@/types/api";

export const DEMO_USER_ID = "000000000000000000000001";

const buildDemoResumeVersion = (overrides: Partial<ResumeVersionRecord> = {}): ResumeVersionRecord => ({
  _id: overrides._id || `version-${Math.random().toString(36).slice(2, 8)}`,
  resumeId: overrides.resumeId || "resume-demo-1",
  userId: DEMO_USER_ID,
  versionNumber: overrides.versionNumber || 1,
  sourceType: overrides.sourceType || "blank",
  resumeJSON: overrides.resumeJSON || {
    personalInfo: {
      fullName: "Manyu Sharma",
      email: "manyu@example.com",
      phone: "+91 98765 43210",
      location: "Hyderabad, India",
      headline: "React + Node.js Developer",
      summary:
        "Full-stack developer focused on scalable React frontends and clean Express APIs.",
      links: [
        { label: "Portfolio", url: "https://example.com" },
        { label: "GitHub", url: "https://github.com/example" },
      ],
    },
    education: [
      {
        institution: "IIIT Hyderabad",
        degree: "B.Tech",
        fieldOfStudy: "Computer Science",
        grade: "8.7 CGPA",
        startDate: "2021",
        endDate: "2025",
      },
    ],
    experience: [
      {
        company: "TechCorp",
        role: "Frontend Intern",
        startDate: "May 2024",
        endDate: "Aug 2024",
        description: "Built responsive dashboard flows using React and Tailwind CSS.",
        bullets: [
          "Reduced interaction friction in the application flow.",
          "Worked with APIs and reusable component patterns.",
        ],
      },
    ],
    projects: [
      {
        title: "Placement SAHAY",
        description: "Resume repository, analysis, and community platform.",
        techStack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
      },
    ],
    achievements: [
      {
        title: "Top 5 Hackathon Finish",
        description: "Built an interview prep assistant for students.",
      },
    ],
    certificates: [
      {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon",
        driveLink: "https://drive.google.com/example",
      },
    ],
    customSections: [
      {
        title: "Leadership",
        limit: 3,
        items: [
          {
            heading: "Student Community Lead",
            description: "Organized peer resume review sessions.",
          },
        ],
      },
    ],
    template: {
      layout: "single-column",
      stylingConfig: {
        accentColor: "#0f766e",
        fontFamily: "Georgia, serif",
      },
    },
  },
  metadata: overrides.metadata || {
    createdAt: "2026-04-18T10:00:00.000Z",
    updatedAt: "2026-04-19T08:00:00.000Z",
    builtAt: "2026-04-19T08:00:00.000Z",
    jobMatchScore: 84,
  },
  createdAt: overrides.createdAt || "2026-04-18T10:00:00.000Z",
  updatedAt: overrides.updatedAt || "2026-04-19T08:00:00.000Z",
});

const demoVersionA = buildDemoResumeVersion({
  _id: "version-demo-1",
  resumeId: "resume-demo-1",
  versionNumber: 3,
  metadata: {
    createdAt: "2026-04-15T08:00:00.000Z",
    updatedAt: "2026-04-19T08:00:00.000Z",
    builtAt: "2026-04-19T08:00:00.000Z",
    jobMatchScore: 84,
  },
});

const demoVersionB = buildDemoResumeVersion({
  _id: "version-demo-2",
  resumeId: "resume-demo-2",
  versionNumber: 2,
  sourceType: "job-description",
  metadata: {
    createdAt: "2026-04-12T11:00:00.000Z",
    updatedAt: "2026-04-18T12:30:00.000Z",
    builtAt: "2026-04-18T12:30:00.000Z",
    jobMatchScore: 91,
  },
  resumeJSON: {
    ...demoVersionA.resumeJSON,
    personalInfo: {
      ...demoVersionA.resumeJSON.personalInfo,
      summary: "Targeted for product engineering and full-stack roles with stronger keyword coverage.",
    },
    template: {
      layout: "two-column",
      stylingConfig: {
        accentColor: "#0f172a",
        fontFamily: "Times New Roman, serif",
      },
    },
  },
});

export const mockResumes: ResumeRecord[] = [
  {
    _id: "resume-demo-1",
    userId: DEMO_USER_ID,
    title: "Frontend Resume",
    description: "Primary placement resume",
    latestVersionId: demoVersionA,
    highestJobMatchVersionId: demoVersionA,
    sourceType: "blank",
    createdAt: "2026-04-10T10:00:00.000Z",
    updatedAt: "2026-04-19T08:00:00.000Z",
  },
  {
    _id: "resume-demo-2",
    userId: DEMO_USER_ID,
    title: "SDE Resume",
    description: "Generated from JD stub",
    latestVersionId: demoVersionB,
    highestJobMatchVersionId: demoVersionB,
    sourceType: "job-description",
    createdAt: "2026-04-12T11:00:00.000Z",
    updatedAt: "2026-04-18T12:30:00.000Z",
  },
];

export const mockDashboardSummary: DashboardSummary = {
  totalResumes: mockResumes.length,
  profileCompletion: 86,
  latestResume: {
    id: mockResumes[0]._id,
    title: mockResumes[0].title,
    updatedAt: mockResumes[0].updatedAt,
  },
  highestJobMatchResume: {
    resumeId: mockResumes[1]._id,
    versionId: demoVersionB._id,
    title: mockResumes[1].title,
    jobMatchScore: 91,
  },
  recentActivity: [
    {
      id: "activity-1",
      action: "Updated resume version",
      target: "Frontend Resume",
      time: "2026-04-19T08:00:00.000Z",
    },
    {
      id: "activity-2",
      action: "Analyzed resume",
      target: "SDE Resume",
      time: "2026-04-18T12:30:00.000Z",
    },
    {
      id: "activity-3",
      action: "Completed profile section",
      target: "Certificates",
      time: "2026-04-17T07:00:00.000Z",
    },
  ],
  trendingNotifications: [
    { id: "n1", text: "Trending: resume review requests are up this week", trend: "up" },
    { id: "n2", text: "New community discussion on system design basics", trend: "up" },
  ],
  profileCardVisible: true,
};

export const mockCommunityPosts: CommunityPost[] = [
  {
    _id: "post-1",
    text: "Shared my latest frontend resume draft. Open to feedback on project bullets and impact metrics.",
    imageUrl: "/placeholder.svg",
    likes: [],
    likeCount: 42,
    commentCount: 12,
    createdAt: "2026-04-19T10:00:00.000Z",
    userId: {
      _id: DEMO_USER_ID,
      firstName: "Arjun",
      lastName: "Sharma",
      headline: "SDE @ Google",
    },
  },
  {
    _id: "post-2",
    text: "Microsoft applications opened today. I added the link and a short checklist for resume tailoring.",
    imageUrl: "/placeholder.svg",
    likes: [],
    likeCount: 128,
    commentCount: 45,
    createdAt: "2026-04-19T08:00:00.000Z",
    userId: {
      _id: "user-2",
      firstName: "Priya",
      lastName: "Patel",
      headline: "Placement Cell Head",
    },
  },
];

export const mockAnalysis: ResumeAnalysis = {
  jobMatchScore: 82,
  comments: [
    "React and TypeScript experience aligns well with the target role.",
    "Project descriptions are easy to scan and recruiter-friendly.",
  ],
  errors: [
    "One experience bullet is missing measurable impact.",
  ],
  warnings: [
    "Add Docker and AWS keywords if they appear in the job description.",
    "Custom sections should stay concise for ATS readability.",
  ],
};

export const mockWeather: WeatherSummary = {
  city: "Hyderabad",
  temperatureCelsius: 31,
  condition: "Partly Cloudy",
  humidity: 52,
  windKph: 14,
  updatedAt: "2026-04-19T09:00:00.000Z",
};

export const mockTodos: TodoItem[] = [
  {
    _id: "todo-1",
    userId: DEMO_USER_ID,
    title: "Tailor frontend resume for SDE role",
    description: "Update project bullets and achievements.",
    completed: false,
    dueDate: "2026-04-21T00:00:00.000Z",
    createdAt: "2026-04-19T07:00:00.000Z",
    updatedAt: "2026-04-19T07:00:00.000Z",
  },
  {
    _id: "todo-2",
    userId: DEMO_USER_ID,
    title: "Upload latest certificates",
    description: "Add drive links for AWS and Node.js certificates.",
    completed: true,
    dueDate: null,
    createdAt: "2026-04-18T05:00:00.000Z",
    updatedAt: "2026-04-18T09:00:00.000Z",
  },
];
