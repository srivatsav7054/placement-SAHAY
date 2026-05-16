import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, listPosts, togglePostLike } from "@/services/communityService";

const GUEST_USER_ID = "guest-user";

export const useCommunityFeed = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["community-posts"],
    queryFn: listPosts,
  });

  const refreshPosts = () => queryClient.invalidateQueries({ queryKey: ["community-posts"] });

  return {
    ...postsQuery,
    createPostMutation: useMutation({
      mutationFn: ({ text, imageUrl }: { text: string; imageUrl?: string }) =>
        createPost(text, imageUrl, GUEST_USER_ID),
      onSuccess: refreshPosts,
    }),
    toggleLikeMutation: useMutation({
      mutationFn: (postId: string) => togglePostLike(postId, GUEST_USER_ID),
      onSuccess: refreshPosts,
    }),
  };
};
