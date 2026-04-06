import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import ResumeList from "@/components/resume/ResumeList";
import BuilderControls from "@/components/resume/BuilderControls";
import ResumePreview from "@/components/resume/ResumePreview";
import { ResumeData, defaultSections, mockProfile } from "@/components/resume/resumeTypes";

const ResumeBuilder = () => {
  const [resumes, setResumes] = useState<ResumeData[]>([
    {
      id: 1,
      name: "My First Resume",
      updatedAt: "Mar 30, 2026",
      template: "simple",
      summary: mockProfile.summary,
      sections: [...defaultSections],
    },
  ]);
  const [activeId, setActiveId] = useState<number | null>(1);

  const activeResume = resumes.find((r) => r.id === activeId) || null;

  const handleCreate = () => {
    const newResume: ResumeData = {
      id: Date.now(),
      name: `Resume ${resumes.length + 1}`,
      updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      template: "simple",
      summary: mockProfile.summary,
      sections: [...defaultSections.map((s) => ({ ...s }))],
    };
    setResumes((p) => [...p, newResume]);
    setActiveId(newResume.id);
  };

  const handleDelete = (id: number) => {
    setResumes((p) => p.filter((r) => r.id !== id));
    if (activeId === id) setActiveId(resumes.length > 1 ? resumes.find((r) => r.id !== id)?.id || null : null);
  };

  const handleUpdate = (data: Partial<ResumeData>) => {
    if (!activeId) return;
    setResumes((p) =>
      p.map((r) => (r.id === activeId ? { ...r, ...data } : r))
    );
  };

  return (
    <MobileSidebarProvider>
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar />
        <div className="flex flex-col lg:flex-row flex-1 overflow-auto lg:overflow-hidden">
          {/* Left — Resume List */}
          <div className="w-full lg:w-56 shrink-0">
            <ResumeList
              resumes={resumes}
              activeId={activeId}
              onSelect={setActiveId}
              onCreate={handleCreate}
              onDelete={handleDelete}
            />
          </div>

          {activeResume ? (
            <>
              {/* Center — Controls */}
              <div className="w-full lg:w-72 shrink-0 overflow-hidden flex flex-col">
                <BuilderControls resume={activeResume} onUpdate={handleUpdate} />
              </div>

              {/* Right — Preview */}
              <ResumePreview resume={activeResume} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Select or create a resume to get started.
            </div>
          )}
        </div>
      </div>
    </div>
    </MobileSidebarProvider>
  );
};

export default ResumeBuilder;
