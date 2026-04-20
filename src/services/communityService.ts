import { apiRequest } from "@/services/api";
import { DEMO_USER_ID, mockCommunityPosts } from "@/services/mockData";
import type { CommunityPost } from "@/types/api";

export const listPosts = async () => {
  try {
    return await apiRequest<CommunityPost[]>("/posts");
  } catch (error) {
    return mockCommunityPosts;
  }
};

export const createPost = async (text: string, imageUrl?: string) => {
  return apiRequest<CommunityPost>("/posts", {
    method: "POST",
    body: JSON.stringify({
      userId: DEMO_USER_ID,
      text,
      imageUrl,
    }),
  });
};

export const togglePostLike = async (postId: string) => {
  try {
    return await apiRequest<{ postId: string; likeCount: number; liked: boolean }>(`/posts/${postId}/like`, {
      method: "POST",
      body: JSON.stringify({
        userId: DEMO_USER_ID,
      }),
    });
  } catch (error) {
    return { postId, likeCount: 0, liked: true };
  }
};
