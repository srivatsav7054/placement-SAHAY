const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true },
    url: { type: String, trim: true },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, trim: true },
    fieldOfStudy: { type: String, trim: true },
    grade: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, trim: true },
    bullets: [{ type: String, trim: true }],
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    description: { type: String, trim: true },
    techStack: [{ type: String, trim: true }],
    link: { type: String, trim: true },
    repositoryUrl: { type: String, trim: true },
    bullets: [{ type: String, trim: true }],
  },
  { _id: false }
);

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    date: { type: String, trim: true },
  },
  { _id: false }
);

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, trim: true },
    driveLink: { type: String, trim: true },
    issueDate: { type: String, trim: true },
  },
  { _id: false }
);

const customSectionItemSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true },
    subheading: { type: String, trim: true },
    description: { type: String, trim: true },
    bullets: [{ type: String, trim: true }],
    link: { type: String, trim: true },
  },
  { _id: false }
);

const customSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    limit: { type: Number, default: 5, min: 1, max: 10 },
    items: [customSectionItemSchema],
  },
  { _id: false }
);

const resumeJsonSchema = new mongoose.Schema(
  {
    personalInfo: {
      fullName: { type: String, trim: true },
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
      location: { type: String, trim: true },
      headline: { type: String, trim: true },
      summary: { type: String, trim: true },
      links: [linkSchema],
    },
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    achievements: [achievementSchema],
    certificates: [certificateSchema],
    customSections: [customSectionSchema],
    skills: [mongoose.Schema.Types.Mixed],
    settings: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    template: {
      layout: { type: String, default: "single-column", trim: true },
      stylingConfig: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
  },
  { _id: false, strict: false }
);

const resumeVersionSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    versionNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    sourceType: {
      type: String,
      enum: ["blank", "job-description", "upload"],
      default: "blank",
    },
    uploadedFile: {
      fileName: { type: String, trim: true },
      originalName: { type: String, trim: true },
      mimeType: { type: String, trim: true },
      fileSize: { type: Number, min: 0 },
      fileUrl: { type: String, trim: true },
    },
    resumeJSON: {
      type: resumeJsonSchema,
      required: true,
      default: () => ({}),
    },
    metadata: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      builtAt: { type: Date, default: null },
      jobMatchScore: { type: Number, min: 0, max: 100, default: null },
    },
  },
  {
    timestamps: true,
  }
);

resumeVersionSchema.pre("save", async function () {
  this.metadata = {
    createdAt: this.metadata?.createdAt || new Date(),
    updatedAt: new Date(),
    builtAt: this.metadata?.builtAt || null,
    jobMatchScore:
      typeof this.metadata?.jobMatchScore === "number"
        ? this.metadata.jobMatchScore
        : null,
  };
});

module.exports = mongoose.model("ResumeVersion", resumeVersionSchema);
