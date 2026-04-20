const User = require("../models/User");
const Resume = require("../models/Resume");
const ResumeVersion = require("../models/ResumeVersion");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { calculateProfileCompletion } = require("../utils/profileCompletion");

const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.json({ success: true, data: users });
});

const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

const syncClerkUser = asyncHandler(async (req, res) => {
  const { clerkUserId, email, firstName, lastName, imageUrl } = req.body;

  if (!clerkUserId || !email) {
    throw new ApiError(400, "clerkUserId and email are required for sync");
  }

  const user = await User.findOneAndUpdate(
    { clerkUserId },
    { clerkUserId, email, firstName, lastName, imageUrl },
    {
      new: true,
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
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.json({ success: true, data: user });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  Object.assign(user, req.body);
  user.profileCompletion = calculateProfileCompletion(user);
  await user.save();

  res.json({ success: true, data: user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.json({ success: true, message: "User deleted successfully" });
});

const getDashboardSummary = asyncHandler(async (req, res) => {
  const { userId } = req.params;

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
  const { clerkUserId } = req.params;

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.json({ success: true, data: user });
});

const updateUserByClerkId = asyncHandler(async (req, res) => {
  const { clerkUserId } = req.params;

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  Object.assign(user, req.body);
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
