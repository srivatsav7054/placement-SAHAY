import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  analyzeResumeVersion,
  createBlankResume,
  createResumeFromJobDescription,
  deleteResume,
  listResumes,
  updateResumeVersion,
  saveResume,
} from "@/services/resumeService";

const GUEST_USER_ID = "guest-user";

export const useResumeLibrary = () => {
  const queryClient = useQueryClient();

  const resumeQuery = useQuery({
    queryKey: ["resumes", GUEST_USER_ID],
    queryFn: () => listResumes(GUEST_USER_ID),
  });

  const refreshResumes = () =>
    queryClient.invalidateQueries({ queryKey: ["resumes", GUEST_USER_ID] });

  const createBlankMutation = useMutation({
    mutationFn: (title: string) => createBlankResume(GUEST_USER_ID, title),
    onSuccess: refreshResumes,
  });

  const createFromJobDescriptionMutation = useMutation({
    mutationFn: ({ title, jobDescription }: { title: string; jobDescription: string }) =>
      createResumeFromJobDescription(GUEST_USER_ID, title, jobDescription),
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
    mutationFn: ({ versionId, resumeJSON }: { versionId: string; resumeJSON: any }) =>
      saveResume(versionId, resumeJSON),
    onSuccess: refreshResumes,
  });

  const updateVersionMutation = useMutation({
    mutationFn: ({ versionId, data }: { versionId: string; data: any }) =>
      updateResumeVersion(versionId, data),
    onSuccess: refreshResumes,
  });

  return {
    ...resumeQuery,
    clerkUserId: GUEST_USER_ID,
    isAuthenticated: true,
    createBlankMutation,
    createFromJobDescriptionMutation,
    deleteResumeMutation,
    analyzeResumeMutation,
    saveResumeMutation,
    updateVersionMutation,
  };
};
