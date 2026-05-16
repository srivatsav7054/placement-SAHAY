const User = require("../models/User");
const Resume = require("../models/Resume");
const ResumeVersion = require("../models/ResumeVersion");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { calculateProfileCompletion } = require("../utils/profileCompletion");
const { resolveUserId } = require("../utils/userResolver");

const listUsers = asyncHandler(async (req, res) => {
  console.log(`[UserController] listUsers called`);
  const users = await User.find().sort({ createdAt: -1 });

  res.json({ success: true, data: users });
});

const createUser = asyncHandler(async (req, res) => {
  console.log(`[UserController] createUser called`);
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

const syncClerkUser = asyncHandler(async (req, res) => {
  console.log(`[UserController] syncClerkUser called for clerkUserId: ${req.body.clerkUserId}`);
  const { clerkUserId, email, firstName, lastName, imageUrl } = req.body;

  if (!clerkUserId || !email) {
    throw new ApiError(400, "clerkUserId and email are required for sync");
  }

  const user = await User.findOneAndUpdate(
    { clerkUserId },
    { clerkUserId, email, firstName, lastName, imageUrl },
    {
      returnDocument: "after",
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  user.profileCompletion = calculateProfileCompletion(user);
  await user.save();

  res.json({ success: true, data: user });
});

const getUser = asyncHandler(async (req, res) => {
  console.log(`[UserController] getUser called with id: ${req.params.id}`);
  const userId = await resolveUserId(req.params.id);
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.json({ success: true, data: user });
});

const updateUser = asyncHandler(async (req, res) => {
  console.log(`[UserController] updateUser called with id: ${req.params.id}`);
  const userId = await resolveUserId(req.params.id);
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  Object.assign(user, req.body);
  user.profileCompletion = calculateProfileCompletion(user);
  await user.save();

  res.json({ success: true, data: user });
});

const deleteUser = asyncHandler(async (req, res) => {
  console.log(`[UserController] deleteUser called with id: ${req.params.id}`);
  const userId = await resolveUserId(req.params.id);
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.json({ success: true, message: "User deleted successfully" });
});

const getDashboardSummary = asyncHandler(async (req, res) => {
  console.log(`[UserController] getDashboardSummary called for userId: ${req.params.userId}`);
  const userId = await resolveUserId(req.params.userId);

  const [user, resumeCount, latestResume, bestVersion, recentVersions] = await Promise.all([
    User.findById(userId),
    Resume.countDocuments({ userId }),
    Resume.findOne({ userId }).sort({ updatedAt: -1 }),
    ResumeVersion.findOne({ userId, "metadata.jobMatchScore": { $ne: null } })
      .sort({ "metadata.jobMatchScore": -1, updatedAt: -1 })
      .populate("resumeId", "title"),
    ResumeVersion.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate("resumeId", "title"),
  ]);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const profileCompletion = calculateProfileCompletion(user);

  res.json({
    success: true,
    data: {
      totalResumes: resumeCount,
      profileCompletion,
      latestResume: latestResume
        ? { id: latestResume._id, title: latestResume.title, updatedAt: latestResume.updatedAt }
        : null,
      highestJobMatchResume: bestVersion
        ? {
            versionId: bestVersion._id,
            resumeId: bestVersion.resumeId?._id || null,
            title: bestVersion.resumeId?.title || "Untitled Resume",
            jobMatchScore: bestVersion.metadata?.jobMatchScore ?? null,
          }
        : null,
      trendingNotifications: [
        { id: "trend-1", text: "Campus hiring spike this week", trend: "up" },
        { id: "trend-2", text: "3 new resume templates available", trend: "up" },
      ],
      recentActivity: recentVersions.map((version) => ({
        id: version._id,
        action: "Updated resume version",
        target: version.resumeId?.title || `Resume ${version.versionNumber}`,
        time: version.updatedAt,
      })),
      profileCardVisible: profileCompletion < 100,
    },
  });
});

const getUserByClerkId = asyncHandler(async (req, res) => {
  console.log(`[UserController] getUserByClerkId called for: ${req.params.clerkUserId}`);
  const { clerkUserId } = req.params;

  let user = await User.findOne({ clerkUserId });
  
  // Auto-create guest user if it doesn't exist
  if (!user && clerkUserId === "guest-user") {
    console.log("[UserController] Creating default guest user");
    user = await User.create({
      clerkUserId: "guest-user",
      email: "guest@sahay.com",
      firstName: "Guest",
      lastName: "User",
      bio: "Welcome to SAHAY! This is your guest profile.",
      headline: "Placement Aspirant",
    });
  }

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.json({ success: true, data: user });
});

const updateUserByClerkId = asyncHandler(async (req, res) => {
  console.log(`[UserController] updateUserByClerkId called for: ${req.params.clerkUserId}`);
  const { clerkUserId } = req.params;

  let user = await User.findOne({ clerkUserId });

  // Auto-create guest user if it doesn't exist during update
  if (!user && clerkUserId === "guest-user") {
    console.log("[UserController] Creating default guest user for update");
    user = await User.create({
      clerkUserId: "guest-user",
      email: "guest@sahay.com",
      firstName: "Guest",
      lastName: "User",
    });
  }

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Explicitly handle fields to ensure Mongoose tracks changes
  const updateFields = ["firstName", "lastName", "phone", "location", "bio", "headline", "profileLinks", "experience", "education", "skills", "projects", "certifications", "preferences"];
  
  updateFields.forEach(field => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
      if (Array.isArray(req.body[field])) {
        user.markModified(field);
      }
    }
  });

  user.profileCompletion = calculateProfileCompletion(user);
  await user.save();

  res.json({ success: true, data: user });
});

module.exports = {
  listUsers,
  createUser,
  syncClerkUser,
  getUser,
  updateUser,
  deleteUser,
  getDashboardSummary,
  getUserByClerkId,
  updateUserByClerkId,
};
