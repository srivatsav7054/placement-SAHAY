import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import {
  analyzeResumeVersion,
  createBlankResume,
  createResumeFromJobDescription,
  deleteResume,
  listResumes,
  updateResumeVersion,
  saveResume,
} from "@/services/resumeService";

export const useResumeLibrary = () => {
  const queryClient = useQueryClient();
  const { user, isLoaded } = useUser();

  // Get the Clerk user ID - this is the authenticated user
  const clerkUserId = user?.id;

  const resumeQuery = useQuery({
    queryKey: ["resumes", clerkUserId],
    queryFn: () => {
      if (!clerkUserId) throw new Error("User not authenticated");
      return listResumes(clerkUserId);
    },
    enabled: isLoaded && !!clerkUserId,
  });

  const refreshResumes = () => 
    queryClient.invalidateQueries({ queryKey: ["resumes", clerkUserId] });

  const createBlankMutation = useMutation({
    mutationFn: (title: string) => {
      if (!clerkUserId) throw new Error("User not authenticated");
      return createBlankResume(clerkUserId, title);
    },
    onSuccess: refreshResumes,
  });

  const createFromJobDescriptionMutation = useMutation({
    mutationFn: ({ title, jobDescription }: { title: string; jobDescription: string }) => {
      if (!clerkUserId) throw new Error("User not authenticated");
      return createResumeFromJobDescription(clerkUserId, title, jobDescription);
    },
    onSuccess: refreshResumes,
  });

  const deleteResumeMutation = useMutation({
    mutationFn: (resumeId: string) => deleteResume(resumeId),
    onSuccess: refreshResumes,
  });

  const analyzeResumeMutation = useMutation({
    mutationFn: ({ versionId, jobDescription }: { versionId: string; jobDescription: string }) =>
      analyzeResumeVersion(versionId, jobDescription),
    onSuccess: refreshResumes,
  });

  const saveResumeMutation = useMutation({
    mutationFn: ({ versionId, resumeJSON }: { versionId: string; resumeJSON: any }) => {
      if (!clerkUserId) throw new Error("User not authenticated");
      return saveResume(versionId, resumeJSON);
    },
    onSuccess: refreshResumes,
  });

  const updateVersionMutation = useMutation({
    mutationFn: ({ versionId, data }: { versionId: string; data: any }) =>
      updateResumeVersion(versionId, data),
    onSuccess: refreshResumes,
  });

  return {
    ...resumeQuery,
    clerkUserId,
    isAuthenticated: !!clerkUserId,
    createBlankMutation,
    createFromJobDescriptionMutation,
    deleteResumeMutation,
    analyzeResumeMutation,
    saveResumeMutation,
    updateVersionMutation,
  };
};
