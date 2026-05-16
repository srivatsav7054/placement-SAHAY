const mongoose = require("mongoose");
const User = require("../models/User");
const ApiError = require("./ApiError");

/**
 * Resolves a User ID from either a MongoDB ObjectId or a Clerk User ID string.
 * This ensures that controllers can handle both formats transparently.
 * 
 * @param {string} id - The ID to resolve (could be Mongo _id or Clerk clerkUserId)
 * @returns {Promise<mongoose.Types.ObjectId>} - The resolved MongoDB ObjectId
 */
const resolveUserId = async (id) => {
  if (!id || id === "undefined" || id === "null") {
    throw new ApiError(400, "User identifier is missing or invalid");
  }

  console.log(`[resolveUserId] Resolving: "${id}"`);
  
  // 1. If it's already a valid MongoDB ObjectId hex string
  if (mongoose.Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id)) {
    console.log(`[resolveUserId] Found valid hex: "${id}"`);
    return id;
  }

  // 2. Otherwise assume it's a Clerk User ID (string like 'user_...')
  const user = await User.findOne({ clerkUserId: id });
  
  if (!user) {
    console.warn(`[resolveUserId] No user found for: "${id}"`);
    throw new ApiError(404, `User profile not found for identifier: ${id}`);
  }

  console.log(`[resolveUserId] Resolved to Mongo ID: "${user._id.toString()}"`);
  return user._id.toString();
};

module.exports = { resolveUserId };
