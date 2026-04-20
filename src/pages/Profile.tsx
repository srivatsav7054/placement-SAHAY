import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
<<<<<<< HEAD
import { User, GraduationCap, Code2, Building2, FolderGit2, Award, Trophy } from "lucide-react";
=======
import { User, GraduationCap, Code2, Building2, FolderGit2, Award, Link2 } from "lucide-react";
>>>>>>> a8ce0f73241742663a3408809d1249ce577c31d8
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import PersonalTab from "@/components/profile/PersonalTab";
import EducationTab from "@/components/profile/EducationTab";
import SkillsTab from "@/components/profile/SkillsTab";
import ExperienceTab from "@/components/profile/ExperienceTab";
import ProjectsTab from "@/components/profile/ProjectsTab";
import CertificationsTab from "@/components/profile/CertificationsTab";
<<<<<<< HEAD
import AchievementsTab from "@/components/profile/AchievementsTab";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "personal", label: "Personal", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: Building2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "achievements", label: "Achievements", icon: Trophy },
=======
import LinksTab from "@/components/profile/LinksTab";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "personal",       label: "Personal",        icon: User },
  { id: "education",      label: "Education",        icon: GraduationCap },
  { id: "skills",         label: "Skills",           icon: Code2 },
  { id: "experience",     label: "Experience",       icon: Building2 },
  { id: "projects",       label: "Projects",         icon: FolderGit2 },
  { id: "certifications", label: "Certifications",   icon: Award },
  { id: "links",          label: "Links & Profiles", icon: Link2 },
>>>>>>> a8ce0f73241742663a3408809d1249ce577c31d8
];

const Profile = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "personal");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tabs.some((t) => t.id === tab)) setActiveTab(tab);
  }, [searchParams]);

  const renderTab = () => {
    switch (activeTab) {
      case "personal":       return <PersonalTab />;
      case "education":      return <EducationTab />;
      case "skills":         return <SkillsTab />;
      case "experience":     return <ExperienceTab />;
      case "projects":       return <ProjectsTab />;
      case "certifications": return <CertificationsTab />;
<<<<<<< HEAD
      case "achievements": return <AchievementsTab />;
      default: return null;
=======
      case "links":          return <LinksTab />;
      default:               return null;
>>>>>>> a8ce0f73241742663a3408809d1249ce577c31d8
    }
  };

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-3 md:py-4">
            {/* Tab bar – horizontally scrollable on mobile */}
            <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-muted/50 p-1.5 mb-6 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all",
                    activeTab === tab.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  )}
                >
                  <tab.icon className="h-4 w-4 flex-shrink-0" />
                  {tab.label}
                </button>
              ))}
            </div>

            {renderTab()}
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
};

export default Profile;
