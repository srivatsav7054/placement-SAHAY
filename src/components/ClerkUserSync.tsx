import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { syncClerkUser } from "@/services/userService";

const ClerkUserSync = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id || !user.primaryEmailAddress?.emailAddress) {
      return;
    }

    void syncClerkUser({
      clerkUserId: user.id,
      email: user.primaryEmailAddress.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    });
  }, [isLoaded, isSignedIn, user]);

  return null;
};

export default ClerkUserSync;
