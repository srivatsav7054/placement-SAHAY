import { apiRequest } from "@/services/api";

export interface ClerkSyncPayload {
  clerkUserId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}

export interface UserProfile {
  _id?: string;
  clerkUserId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  headline?: string;
  phone?: string;
  location?: string;
  bio?: string;
  imageUrl?: string;
  profileLinks?: Array<{ _id?: string; label: string; url: string }>;
  experience?: Array<any>;
  education?: Array<any>;
  skills?: Array<any>;
  projects?: Array<any>;
  certifications?: Array<any>;
  profileCompletion?: number;
}

export const syncClerkUser = async (payload: ClerkSyncPayload) => {
  try {
    return await apiRequest("/users/sync-clerk", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    return null;
  }
};

export const getUserProfile = async (clerkUserId: string): Promise<UserProfile | null> => {
  try {
    return await apiRequest<UserProfile>(`/users/by-clerk-id/${clerkUserId}`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (clerkUserId: string, data: Partial<UserProfile>) => {
  try {
    return await apiRequest<UserProfile>(`/users/by-clerk-id/${clerkUserId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};
