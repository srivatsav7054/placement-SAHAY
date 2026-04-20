const Achievement = require("../models/Achievement");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const listAchievements = asyncHandler(async (req, res) => {
  const filter = req.query.userId ? { userId: req.query.userId } : {};
  const achievements = await Achievement.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: achievements });
});

const createAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.create(req.body);
  res.status(201).json({ success: true, data: achievement });
});

const getAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);
  if (!achievement) {
    throw new ApiError(404, "Achievement not found");
  }
  res.json({ success: true, data: achievement });
});

const updateAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!achievement) {
    throw new ApiError(404, "Achievement not found");
  }
  res.json({ success: true, data: achievement });
});

const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findByIdAndDelete(req.params.id);
  if (!achievement) {
    throw new ApiError(404, "Achievement not found");
  }
  res.json({ success: true, message: "Achievement deleted successfully" });
});

module.exports = {
  listAchievements,
  createAchievement,
  getAchievement,
  updateAchievement,
  deleteAchievement,
};
