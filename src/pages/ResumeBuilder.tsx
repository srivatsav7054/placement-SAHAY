import { useEffect, useMemo, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import ResumeList from "@/components/resume/ResumeList";
import BuilderControls from "@/components/resume/BuilderControls";
import ResumePreview from "@/components/resume/ResumePreview";
import { ResumeData, defaultSections, type ResumeSection } from "@/components/resume/resumeTypes";
import { useResumeLibrary } from "@/hooks/useResumeLibrary";
import { useUserProfile } from "@/hooks/useUserProfile";
import { formatApiDate } from "@/services/api";
import { downloadResumeAsPDF } from "@/services/resumeService";
import { Card } from "@/components/ui/card";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import { toast } from "sonner";

const toBuilderTemplate = (layout?: string): ResumeData["template"] => {
  if (layout === "two-column") return "modern";
  if (layout === "compact") return "compact";
  return "simple";
};

const buildSections = (resume: {
  resumeJSON?: {
    education?: unknown[];
    experience?: unknown[];
    projects?: unknown[];
    certificates?: unknown[];
    personalInfo?: { summary?: string };
    settings?: { sections?: ResumeSection[] };
  };
}): ResumeSection[] => {
  if (resume.resumeJSON?.settings?.sections && Array.isArray(resume.resumeJSON.settings.sections) && resume.resumeJSON.settings.sections.length > 0) {
    return resume.resumeJSON.settings.sections;
  }

  return defaultSections.map((section) => {
    if (section.id === "summary") {
      return { ...section, enabled: Boolean(resume.resumeJSON?.personalInfo?.summary) };
    }

    if (section.id === "education") {
      return { ...section, enabled: Boolean(resume.resumeJSON?.education?.length) };
    }

    if (section.id === "experience") {
      return { ...section, enabled: Boolean(resume.resumeJSON?.experience?.length) };
    }

    if (section.id === "projects") {
      return { ...section, enabled: Boolean(resume.resumeJSON?.projects?.length) };
    }

    if (section.id === "certifications") {
      return { ...section, enabled: Boolean(resume.resumeJSON?.certificates?.length) };
    }

    return section;
  });
};

const ResumeBuilder = () => {
  const { data, isLoading, isError, createBlankMutation, deleteResumeMutation, saveResumeMutation } = useResumeLibrary();
  const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ResumeData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);

  const mappedResumes = useMemo<ResumeData[]>(
    () =>
      (data || []).map((resume) => ({
        id: resume._id,
        name: resume.title,
        updatedAt: formatApiDate(resume.updatedAt),
        template: toBuilderTemplate(resume.latestVersionId?.resumeJSON?.template?.layout),
        summary: resume.latestVersionId?.resumeJSON?.personalInfo?.summary || "",
        sections: buildSections(resume.latestVersionId || {}),
        versionId: resume.latestVersionId?._id,
        resumeJSON: resume.latestVersionId?.resumeJSON,
      })),
    [data]
  );

  useEffect(() => {
    setResumes(mappedResumes);
  }, [mappedResumes]);

  useEffect(() => {
    if (!activeId && mappedResumes.length > 0) {
      setActiveId(mappedResumes[0].id);
      setActiveVersionId(mappedResumes[0].versionId || null);
    }
  }, [mappedResumes, activeId]);

  const activeResume = resumes.find((resume) => resume.id === activeId) || null;

  const handleCreate = async () => {
    try {
      const title = `Resume ${mappedResumes.length + 1}`;
      const response = await createBlankMutation.mutateAsync(title);
      setActiveId(response.resume._id);
      setActiveVersionId(response.initialVersion._id);
    } catch (error) {
      const localResume: ResumeData = {
        id: `local-${Date.now()}`,
        name: `Resume ${resumes.length + 1}`,
        updatedAt: formatApiDate(new Date().toISOString()),
        template: "simple",
        summary: "Draft summary placeholder for a new resume.",
        sections: defaultSections.map((section) => ({ ...section })),
      };
      setResumes((current) => [localResume, ...current]);
      setActiveId(localResume.id);
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;

    try {
      await deleteResumeMutation.mutateAsync(pendingDelete.id);
    } catch (error) {
      setResumes((current) => current.filter((resume) => resume.id !== pendingDelete.id));
    }

    if (activeId === pendingDelete.id) {
      const nextResume = resumes.find((resume) => resume.id !== pendingDelete.id);
      setActiveId(nextResume?.id || null);
      setActiveVersionId(nextResume?.versionId || null);
    }
  };

  const handleUpdate = (nextData: Partial<ResumeData>) => {
    if (!activeId) return;

    setResumes((current) =>
      current.map((resume) => {
        if (resume.id !== activeId) return resume;
        
        const updated = { ...resume, ...nextData };
        
        // Ensure manual edits (like summary) are synced into the resumeJSON object
        if (updated.resumeJSON) {
          const nextJson = { ...updated.resumeJSON };
          
          if (updated.summary !== undefined) {
             nextJson.personalInfo = {
               ...(nextJson.personalInfo || {}),
               summary: updated.summary
             };
          }
          
          if (updated.template !== undefined) {
            nextJson.template = {
              ...(nextJson.template || {}),
              layout: updated.template
            };
          }

          if (updated.sections !== undefined) {
            nextJson.settings = {
              ...(nextJson.settings || {}),
              sections: updated.sections
            };
          }
          
          updated.resumeJSON = nextJson;
        }
        
        return updated;
      })
    );
  };

  const handleSave = async () => {
    if (!activeVersionId || !activeResume?.resumeJSON) return;

    try {
      setIsSaving(true);
      await saveResumeMutation.mutateAsync({
        versionId: activeVersionId,
        resumeJSON: activeResume.resumeJSON,
      });
      toast.success("Resume saved successfully");
    } catch (error: any) {
      console.error("Failed to save resume:", error);
      toast.error(error?.message || "Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    if (!activeVersionId) return;

    try {
      const response = await downloadResumeAsPDF(activeVersionId);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeResume?.name || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <div className="flex flex-col lg:flex-row flex-1 overflow-auto lg:overflow-hidden pt-0">
            <div className="w-full lg:w-56 shrink-0">
              <ResumeList
                resumes={resumes}
                activeId={activeId}
                onSelect={(id) => {
                  setActiveId(id);
                  const resume = resumes.find((r) => r.id === id);
                  setActiveVersionId(resume?.versionId || null);
                }}
                onCreate={handleCreate}
                onDelete={(id) => {
                  const resume = resumes.find((item) => item.id === id) || null;
                  setPendingDelete(resume);
                }}
              />
            </div>

            {isLoading && (
              <div className="flex-1 p-6">
                <Card className="p-5 text-sm text-muted-foreground shadow-card">
                  Loading resume library...
                </Card>
              </div>
            )}

            {isError && !activeResume && !isLoading && (
              <div className="flex-1 p-6">
                <Card className="p-5 text-sm text-destructive shadow-card">
                  Resume data could not be loaded. Local placeholders will still work.
                </Card>
              </div>
            )}

            {!isLoading && activeResume ? (
              <>
                <div className="w-full lg:w-72 shrink-0 overflow-hidden flex flex-col">
                  <BuilderControls
                    resume={activeResume}
                    onUpdate={handleUpdate}
                    onSave={handleSave}
                    onDownload={handleDownload}
                    isSaving={isSaving}
                  />
                </div>
                <ResumePreview resume={activeResume} clerkUserId="guest-user" />
              </>
            ) : null}

            {!isLoading && !activeResume && (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Select or create a resume to get started.
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDeleteDialog
        isOpen={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        title="Delete Resume"
        description="This removes the resume and its versions from your drive-style library."
        itemName={pendingDelete?.name}
      />
    </MobileSidebarProvider>
  );
};

export default ResumeBuilder;
