import { useQuery } from "@tanstack/react-query";
import { getUserProfile, type UserProfile } from "@/services/userService";

// Using a static guest user ID since Clerk is removed
const GUEST_USER_ID = "guest-user";

export const useUserProfile = () => {
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", GUEST_USER_ID],
    queryFn: () => getUserProfile(GUEST_USER_ID),
  });
};
