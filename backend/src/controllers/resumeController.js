const Resume = require("../models/Resume");
const ResumeVersion = require("../models/ResumeVersion");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const createDefaultResumeJson = (payload = {}, userProfile = {}) => ({
  personalInfo: payload.personalInfo || {
    fullName: userProfile.firstName && userProfile.lastName 
      ? `${userProfile.firstName} ${userProfile.lastName}`
      : "Your Name",
    email: userProfile.email || "",
    phone: userProfile.phone || "",
    location: userProfile.location || "",
    headline: userProfile.headline || "",
    summary: userProfile.bio || "",
    links: userProfile.profileLinks || [],
  },
  education: payload.education || [],
  experience: payload.experience || [],
  projects: payload.projects || [],
  achievements: payload.achievements || [],
  certificates: payload.certificates || [],
  customSections: payload.customSections || [],
  template: payload.template || {
    layout: "single-column",
    stylingConfig: {
      accentColor: "#0f766e",
      fontFamily: "Georgia, serif",
    },
  },
});

const syncResumePointers = async (resumeId, userId) => {
  const [latestVersion, highestVersion] = await Promise.all([
    ResumeVersion.findOne({ resumeId, userId }).sort({ createdAt: -1 }),
    ResumeVersion.findOne({ resumeId, userId, "metadata.jobMatchScore": { $ne: null } }).sort({
      "metadata.jobMatchScore": -1,
      updatedAt: -1,
    }),
  ]);

  await Resume.findByIdAndUpdate(resumeId, {
    latestVersionId: latestVersion?._id || null,
    highestJobMatchVersionId: highestVersion?._id || null,
  });
};

const listResumes = asyncHandler(async (req, res) => {
  // SECURITY: userId is required - prevent access to all resumes
  const { userId } = req.query;

  if (!userId) {
    throw new ApiError(400, "userId query parameter is required");
  }

  const resumes = await Resume.find({ userId })
    .populate("latestVersionId")
    .populate("highestJobMatchVersionId")
    .sort({ updatedAt: -1 });

  res.json({ success: true, data: resumes });
});

const getResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id)
    .populate("latestVersionId")
    .populate("highestJobMatchVersionId");

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  // Verify user owns this resume
  if (resume.userId.toString() !== req.user?.userId && process.env.NODE_ENV === "production") {
    throw new ApiError(403, "You do not have permission to access this resume");
  }

  res.json({ success: true, data: resume });
});

const createResume = asyncHandler(async (req, res) => {
  const { userId, title, description, sourceType = "blank", resumeJSON, uploadedFile } = req.body;

  if (!userId || !title) {
    throw new ApiError(400, "userId and title are required");
  }

  // Fetch user profile to populate default resume data
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const resume = await Resume.create({
    userId,
    title,
    description,
    sourceType,
  });

  const version = await ResumeVersion.create({
    resumeId: resume._id,
    userId,
    versionNumber: 1,
    sourceType,
    uploadedFile,
    resumeJSON: createDefaultResumeJson(resumeJSON, user),
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      builtAt: sourceType === "blank" ? null : new Date(),
      jobMatchScore: null,
    },
  });

  await syncResumePointers(resume._id, userId);

  res.status(201).json({
    success: true,
    data: {
      resume,
      initialVersion: version,
    },
  });
});

const createResumeFromJobDescription = asyncHandler(async (req, res) => {
  const { jobDescription } = req.body;

  if (!jobDescription) {
    throw new ApiError(400, "jobDescription is required");
  }

  req.body.sourceType = "job-description";
  req.body.resumeJSON = createDefaultResumeJson({
    projects: [
      {
        title: "Job-targeted resume draft",
        description: `Generated from job description snippet: ${jobDescription.slice(0, 120)}`,
        techStack: ["React", "Node.js", "MongoDB"],
      },
    ],
  });

  return createResume(req, res);
});

const uploadResumePlaceholder = asyncHandler(async (req, res) => {
  const { file } = req.body;

  if (!file?.originalName) {
    throw new ApiError(400, "file.originalName is required");
  }

  req.body.sourceType = "upload";
  req.body.title = req.body.title || file.originalName;
  req.body.uploadedFile = {
    fileName: file.fileName || file.originalName,
    originalName: file.originalName,
    mimeType: file.mimeType,
    fileSize: file.fileSize,
    fileUrl: file.fileUrl,
  };
  req.body.resumeJSON = createDefaultResumeJson({
    experience: [
      {
        company: "Imported from uploaded file",
        role: "Placeholder parsing result",
        description: "Replace this stub with actual parser output.",
        bullets: ["File metadata stored successfully for later parsing."],
      },
    ],
  });

  return createResume(req, res);
});

const updateResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  // Verify user owns this resume
  if (resume.userId.toString() !== req.user?.userId && process.env.NODE_ENV === "production") {
    throw new ApiError(403, "You do not have permission to update this resume");
  }

  const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: updatedResume });
});

const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  // Verify user owns this resume
  if (resume.userId.toString() !== req.user?.userId && process.env.NODE_ENV === "production") {
    throw new ApiError(403, "You do not have permission to delete this resume");
  }

  await ResumeVersion.deleteMany({ resumeId: resume._id });
  await resume.deleteOne();

  res.json({ success: true, message: "Resume and all versions deleted successfully" });
});

const getResumeHighlights = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const [latestResume, highestVersion, resumes] = await Promise.all([
    Resume.findOne({ userId }).sort({ updatedAt: -1 }),
    ResumeVersion.findOne({ userId, "metadata.jobMatchScore": { $ne: null } })
      .sort({ "metadata.jobMatchScore": -1, updatedAt: -1 })
      .populate("resumeId", "title"),
    Resume.find({ userId }).sort({ updatedAt: -1 }).populate("latestVersionId"),
  ]);

  res.json({
    success: true,
    data: {
      allResumes: resumes,
      latestResume,
      highestJobMatchResume: highestVersion
        ? {
            resumeId: highestVersion.resumeId?._id || null,
            title: highestVersion.resumeId?.title || "Untitled Resume",
            versionId: highestVersion._id,
            jobMatchScore: highestVersion.metadata?.jobMatchScore || null,
          }
        : null,
    },
  });
});

module.exports = {
  listResumes,
  getResume,
  createResume,
  createResumeFromJobDescription,
  uploadResumePlaceholder,
  updateResume,
  deleteResume,
  getResumeHighlights,
  syncResumePointers,
};
