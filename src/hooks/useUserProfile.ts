import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { getUserProfile, type UserProfile } from "@/services/userService";

export const useUserProfile = () => {
  const { user, isLoaded } = useUser();
  const clerkUserId = user?.id;

  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", clerkUserId],
    queryFn: () => {
      if (!clerkUserId) return null;
      return getUserProfile(clerkUserId);
    },
    enabled: isLoaded && !!clerkUserId,
  });
};
