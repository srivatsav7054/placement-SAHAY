const ResumeVersion = require("../models/ResumeVersion");
const Resume = require("../models/Resume");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { analyzeResume } = require("../services/aiService");
const { syncResumePointers } = require("./resumeController");

const listVersions = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.resumeId) {
    filter.resumeId = req.query.resumeId;
  }

  if (req.query.userId) {
    filter.userId = req.query.userId;
  }

  const versions = await ResumeVersion.find(filter).sort({ versionNumber: -1, updatedAt: -1 });

  res.json({ success: true, data: versions });
});

const getVersion = asyncHandler(async (req, res) => {
  const version = await ResumeVersion.findById(req.params.id);

  if (!version) {
    throw new ApiError(404, "Resume version not found");
  }

  // Verify user owns this version
  if (version.userId.toString() !== req.user?.userId && process.env.NODE_ENV === "production") {
    throw new ApiError(403, "You do not have permission to access this resume version");
  }

  res.json({ success: true, data: version });
});

const createVersion = asyncHandler(async (req, res) => {
  const { resumeId, userId, resumeJSON, sourceType = "blank", uploadedFile } = req.body;

  if (!resumeId || !userId || !resumeJSON) {
    throw new ApiError(400, "resumeId, userId and resumeJSON are required");
  }

  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new ApiError(404, "Parent resume not found");
  }

  const latestVersion = await ResumeVersion.findOne({ resumeId }).sort({ versionNumber: -1 });
  const version = await ResumeVersion.create({
    resumeId,
    userId,
    versionNumber: latestVersion ? latestVersion.versionNumber + 1 : 1,
    sourceType,
    uploadedFile,
    resumeJSON,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      builtAt: new Date(),
      jobMatchScore: req.body.metadata?.jobMatchScore ?? null,
    },
  });

  await syncResumePointers(resumeId, userId);

  res.status(201).json({ success: true, data: version });
});

const updateVersion = asyncHandler(async (req, res) => {
  const version = await ResumeVersion.findById(req.params.id);

  if (!version) {
    throw new ApiError(404, "Resume version not found");
  }

  // Verify user owns this version
  if (version.userId.toString() !== req.user?.userId && process.env.NODE_ENV === "production") {
    throw new ApiError(403, "You do not have permission to update this resume version");
  }

  Object.assign(version, req.body);
  version.metadata = {
    ...version.metadata,
    ...(req.body.metadata || {}),
    updatedAt: new Date(),
  };

  await version.save();
  await syncResumePointers(version.resumeId, version.userId);

  res.json({ success: true, data: version });
});

const deleteVersion = asyncHandler(async (req, res) => {
  const version = await ResumeVersion.findById(req.params.id);

  if (!version) {
    throw new ApiError(404, "Resume version not found");
  }

  // Verify user owns this version
  if (version.userId.toString() !== req.user?.userId && process.env.NODE_ENV === "production") {
    throw new ApiError(403, "You do not have permission to delete this resume version");
  }

  await version.deleteOne();
  await syncResumePointers(version.resumeId, version.userId);

  res.json({ success: true, message: "Resume version deleted successfully" });
});

const analyzeVersion = asyncHandler(async (req, res) => {
  const { jobDescription } = req.body;
  const version = await ResumeVersion.findById(req.params.id);

  if (!version) {
    throw new ApiError(404, "Resume version not found");
  }

  if (!jobDescription) {
    throw new ApiError(400, "jobDescription is required");
  }

  const analysis = await analyzeResume(version.resumeJSON, jobDescription);

  version.metadata = {
    ...version.metadata,
    updatedAt: new Date(),
    builtAt: new Date(),
    jobMatchScore: analysis.jobMatchScore,
  };
  await version.save();
  await syncResumePointers(version.resumeId, version.userId);

  res.json({
    success: true,
    data: {
      versionId: version._id,
      analysis,
    },
  });
});

const downloadPDF = asyncHandler(async (req, res) => {
  const version = await ResumeVersion.findById(req.params.id);

  if (!version) {
    throw new ApiError(404, "Resume version not found");
  }

  // Verify user owns this version
  if (version.userId.toString() !== req.user?.userId && process.env.NODE_ENV === "production") {
    throw new ApiError(403, "You do not have permission to download this resume");
  }

  const resumeData = version.resumeJSON || {};
  const personalInfo = resumeData.personalInfo || {};

  // Generate simple text-based resume content
  let pdfContent = "";

  // Header with name
  if (personalInfo.fullName) {
    pdfContent += `${personalInfo.fullName}\n`;
  }

  // Contact information
  const contactInfo = [];
  if (personalInfo.email) contactInfo.push(personalInfo.email);
  if (personalInfo.phone) contactInfo.push(personalInfo.phone);
  if (personalInfo.location) contactInfo.push(personalInfo.location);
  if (contactInfo.length > 0) {
    pdfContent += contactInfo.join(" | ") + "\n\n";
  }

  // Summary
  if (resumeData.summary) {
    pdfContent += "PROFESSIONAL SUMMARY\n";
    pdfContent += resumeData.summary + "\n\n";
  }

  // Experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    pdfContent += "PROFESSIONAL EXPERIENCE\n";
    resumeData.experience.forEach((exp: any) => {
      pdfContent += `${exp.role} at ${exp.company}\n`;
      pdfContent += `${exp.startDate} - ${exp.endDate}\n`;
      if (exp.description) {
        pdfContent += exp.description + "\n";
      }
      pdfContent += "\n";
    });
    pdfContent += "\n";
  }

  // Education
  if (resumeData.education && resumeData.education.length > 0) {
    pdfContent += "EDUCATION\n";
    resumeData.education.forEach((edu: any) => {
      pdfContent += `${edu.degree} in ${edu.fieldOfStudy}\n`;
      pdfContent += `${edu.institution} - ${edu.endDate}\n\n`;
    });
    pdfContent += "\n";
  }

  // Skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    pdfContent += "SKILLS\n";
    const skillsText = resumeData.skills
      .map((s: any) => (typeof s === "string" ? s : s.name || s.skillName))
      .join(", ");
    pdfContent += skillsText + "\n\n";
  }

  // Projects
  if (resumeData.projects && resumeData.projects.length > 0) {
    pdfContent += "PROJECTS\n";
    resumeData.projects.forEach((proj: any) => {
      pdfContent += `${proj.title}\n`;
      if (proj.description) pdfContent += `${proj.description}\n`;
      if (proj.techStack && proj.techStack.length > 0) {
        const techText = proj.techStack
          .map((t: any) => (typeof t === "string" ? t : t.name))
          .join(", ");
        pdfContent += `Technologies: ${techText}\n`;
      }
      pdfContent += "\n";
    });
  }

  // For now, return as text file with PDF extension
  // In production, you'd want to use a proper PDF library like pdfkit or puppeteer
  const fileName = `resume_${version.versionNumber}_${Date.now()}.txt`;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.send(pdfContent);
});

module.exports = {
  listVersions,
  getVersion,
  createVersion,
  updateVersion,
  deleteVersion,
  analyzeVersion,
  downloadPDF,
};
