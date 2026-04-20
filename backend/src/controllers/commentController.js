const Comment = require("../models/Comment");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const listComments = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.postId) {
    filter.postId = req.query.postId;
  }

  const comments = await Comment.find(filter)
    .populate("userId", "firstName lastName imageUrl")
    .sort({ createdAt: 1 });

  res.json({ success: true, data: comments });
});

const createComment = asyncHandler(async (req, res) => {
  const comment = await Comment.create(req.body);
  const populatedComment = await Comment.findById(comment._id).populate(
    "userId",
    "firstName lastName imageUrl"
  );
  res.status(201).json({ success: true, data: populatedComment });
});

const getComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate(
    "userId",
    "firstName lastName imageUrl"
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  res.json({ success: true, data: comment });
});

const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("userId", "firstName lastName imageUrl");

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  res.json({ success: true, data: comment });
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  res.json({ success: true, message: "Comment deleted successfully" });
});

module.exports = {
  listComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
