import { apiRequest } from "@/services/api";
import { mockAnalysis, mockResumes } from "@/services/mockData";
import type { ResumeAnalysis, ResumeRecord, ResumeVersionRecord } from "@/types/api";

export const listResumes = async (clerkUserId: string) => {
  try {
    return await apiRequest<ResumeRecord[]>(`/resumes?userId=${clerkUserId}`);
  } catch (error) {
    console.error("Failed to list resumes:", error);
    return [];
  }
};

export const createBlankResume = async (clerkUserId: string, title: string) => {
  try {
    const response = await apiRequest<{ resume: ResumeRecord; initialVersion: ResumeVersionRecord }>(
      "/resumes",
      {
        method: "POST",
        body: JSON.stringify({
          userId: clerkUserId,
          name: title,
          sourceType: "blank",
        }),
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to create resume:", error);
    throw error;
  }
};

export const createResumeFromJobDescription = async (
  clerkUserId: string,
  title: string,
  jobDescription: string
) => {
  try {
    const response = await apiRequest<{ resume: ResumeRecord; initialVersion: ResumeVersionRecord }>(
      "/resumes/generate-from-job-description",
      {
        method: "POST",
        body: JSON.stringify({
          userId: clerkUserId,
          name: title,
          jobDescription,
        }),
      }
    );

    return response;
  } catch (error) {
    console.error("Failed to create resume from job description:", error);
    throw error;
  }
};

export const deleteResume = async (resumeId: string) => {
  try {
    await apiRequest<{ message: string }>(`/resumes/${resumeId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to delete resume:", error);
    throw error;
  }
};

export const analyzeResumeVersion = async (versionId: string, jobDescription: string) => {
  try {
    const response = await apiRequest<{ versionId: string; analysis: ResumeAnalysis }>(
      `/resume-versions/${versionId}/analyze`,
      {
        method: "POST",
        body: JSON.stringify({ jobDescription }),
      }
    );

    return response.analysis;
  } catch (error) {
    console.error("Failed to analyze resume:", error);
    throw error;
  }
};

export const saveResume = async (versionId: string, resumeJSON: any) => {
  try {
    const response = await apiRequest<{ data: ResumeVersionRecord }>(
      `/resume-versions/${versionId}`,
      {
        method: "PUT",
        body: JSON.stringify({ resumeJSON }),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to save resume:", error);
    throw error;
  }
};

export const updateResumeVersion = async (versionId: string, data: any) => {
  try {
    const response = await apiRequest<{ data: ResumeVersionRecord }>(
      `/resume-versions/${versionId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to update resume version:", error);
    throw error;
  }
};

export const downloadResumeAsPDF = async (versionId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/resume-versions/${versionId}/download-pdf`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download PDF");
    }

    return response;
  } catch (error) {
    console.error("Failed to download resume as PDF:", error);
    throw error;
  }
};
