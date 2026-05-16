import { apiRequest } from "@/services/api";
import type { CommunityPost } from "@/types/api";

export const listPosts = async () => {
  try {
    return await apiRequest<CommunityPost[]>("/posts");
  } catch (error) {
    console.error("Failed to fetch community posts:", error);
    throw error;
  }
};

export const createPost = async (text: string, imageUrl: string | undefined, userId: string) => {
  return apiRequest<CommunityPost>("/posts", {
    method: "POST",
    body: JSON.stringify({
      userId,
      text,
      imageUrl,
    }),
  });
};

export const togglePostLike = async (postId: string, userId: string) => {
  try {
    return await apiRequest<{ postId: string; likeCount: number; liked: boolean }>(`/posts/${postId}/like`, {
      method: "POST",
      body: JSON.stringify({
        userId,
      }),
    });
  } catch (error) {
    console.error("Failed to toggle like:", error);
    throw error;
  }
};
