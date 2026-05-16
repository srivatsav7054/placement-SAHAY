const Post = require("../models/Post");
const Comment = require("../models/Comment");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { resolveUserId } = require("../utils/userResolver");

const listPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("userId", "firstName lastName imageUrl headline")
    .sort({ createdAt: -1 })
    .lean();

  const postIds = posts.map((post) => post._id);
  const comments = await Comment.find({ postId: { $in: postIds } }).sort({ createdAt: 1 }).lean();

  const commentCountMap = comments.reduce((acc, comment) => {
    const key = String(comment.postId);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: posts.map((post) => ({
      ...post,
      likeCount: post.likes.length,
      commentCount: commentCountMap[String(post._id)] || 0,
    })),
  });
});

const createPost = asyncHandler(async (req, res) => {
  const userId = await resolveUserId(req.body.userId);
  const post = await Post.create({ ...req.body, userId });
  const populatedPost = await Post.findById(post._id).populate(
    "userId",
    "firstName lastName imageUrl headline"
  );
  res.status(201).json({ success: true, data: populatedPost });
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "userId",
    "firstName lastName imageUrl headline"
  );
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  res.json({ success: true, data: post });
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("userId", "firstName lastName imageUrl headline");

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  res.json({ success: true, data: post });
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  await Comment.deleteMany({ postId: req.params.id });
  res.json({ success: true, message: "Post deleted successfully" });
});

const toggleLike = asyncHandler(async (req, res) => {
  const userId = await resolveUserId(req.body.userId);
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const userObjectId = userId.toString();
  const likeIndex = post.likes.indexOf(userObjectId);

  if (likeIndex === -1) {
    post.likes.push(userObjectId);
  } else {
    post.likes.splice(likeIndex, 1);
  }

  await post.save();

  res.json({
    success: true,
    data: {
      postId: post._id,
      likeCount: post.likes.length,
      liked: likeIndex === -1,
    },
  });
});

module.exports = {
  listPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  toggleLike,
};
