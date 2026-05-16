import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ResumeData } from "./resumeTypes";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/services/api";

interface ResumePreviewProps {
  resume: ResumeData;
  clerkUserId?: string;
}

interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  profileLinks?: Array<{ label: string; url: string }>;
  headline?: string;
  education?: any[];
  experience?: any[];
  skills?: any[];
  projects?: any[];
  certifications?: any[];
}

const defaultProfile = {
  firstName: "Demo",
  lastName: "User",
  email: "demo@example.com",
  phone: "+91 98765 43210",
  location: "Hyderabad, India",
  headline: "Full-stack Developer",
};

const ResumePreview = ({ resume, clerkUserId }: ResumePreviewProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(!!clerkUserId);

  const { template, sections } = resume;
  const enabledSections = sections.filter((s) => s.enabled);

  const isSimple = template === "simple";
  const isModern = template === "modern";
  const isCompact = template === "compact";

  // Fetch user profile data from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!clerkUserId) return;

      try {
        setIsLoading(true);
        const response = await apiRequest<any>(`/users/by-clerk-id/${clerkUserId}`, {
          method: "GET",
        });

        setUserProfile({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          phone: response.phone,
          location: response.location,
          bio: response.bio,
          profileLinks: response.profileLinks || [],
          headline: response.headline,
          education: response.education || [],
          experience: response.experience || [],
          skills: response.skills || [],
          projects: response.projects || [],
          certifications: response.certifications || [],
        });
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Use default profile if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [clerkUserId]);

  // Get profile data from resume JSON if available, fallback to fetched data
  const profileData = resume.resumeJSON?.personalInfo || userProfile;
  const fullName = profileData.fullName || `${userProfile.firstName || ""} ${userProfile.lastName || ""}`.trim() || "Professional";
  const education = (resume.resumeJSON?.education?.length ? resume.resumeJSON.education : userProfile.education) || [];
  const skills = (resume.resumeJSON?.skills?.length ? resume.resumeJSON.skills : userProfile.skills) || [];
  const experience = (resume.resumeJSON?.experience?.length ? resume.resumeJSON.experience : userProfile.experience) || [];
  const projects = (resume.resumeJSON?.projects?.length ? resume.resumeJSON.projects : userProfile.projects) || [];
  const certificates = (resume.resumeJSON?.certificates?.length ? resume.resumeJSON.certificates : userProfile.certifications) || [];
  const profileLinks = resume.resumeJSON?.links || userProfile.profileLinks || [];

  const renderSection = (id: string) => {
    switch (id) {
      case "summary":
        return (
          <div key={id}>
            <SectionHeading template={template}>Summary</SectionHeading>
            <p className={cn("text-muted-foreground", isCompact ? "text-[11px] leading-relaxed" : "text-xs leading-relaxed")}>
              {resume.summary || profileData.summary || profileData.bio || "Professional summary goes here."}
            </p>
          </div>
        );
      case "education":
        return (
          <div key={id}>
            <SectionHeading template={template}>Education</SectionHeading>
            {education.length > 0 ? (
              education.map((e: any, i: number) => (
                <div key={i} className="flex justify-between mb-2">
                  <div>
                    <p className={cn("font-medium", isCompact ? "text-[11px]" : "text-xs")}>
                      {e.degree} in {e.fieldOfStudy || e.field}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{e.institution}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground shrink-0">{e.dates || (e.startDate ? `${e.startDate} - ${e.endDate || 'Present'}` : '')}</p>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-muted-foreground italic">Add education to your profile to display it here.</p>
            )}
          </div>
        );
      case "skills":
        return (
          <div key={id}>
            <SectionHeading template={template}>Skills</SectionHeading>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s: any, i: number) => (
                  <Badge key={i} variant="secondary" className="text-[10px] px-2 py-0.5">
                    {typeof s === "string" ? s : s.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-muted-foreground italic">Add skills to your profile to display them here.</p>
            )}
          </div>
        );
      case "experience":
        return (
          <div key={id}>
            <SectionHeading template={template}>Experience</SectionHeading>
            {experience.length > 0 ? (
              experience.map((e: any, i: number) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between">
                    <p className={cn("font-medium", isCompact ? "text-[11px]" : "text-xs")}>{e.role}</p>
                    <p className="text-[11px] text-muted-foreground shrink-0">{e.duration || (e.startDate ? `${e.startDate} - ${e.endDate || 'Present'}` : '')}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{e.company}</p>
                  {e.description && <p className="text-[11px] text-muted-foreground mt-0.5">{e.description}</p>}
                </div>
              ))
            ) : (
              <p className="text-[11px] text-muted-foreground italic">Add experience to your profile to display it here.</p>
            )}
          </div>
        );
      case "projects":
        return (
          <div key={id}>
            <SectionHeading template={template}>Projects</SectionHeading>
            {projects.length > 0 ? (
              <div className={cn(isCompact ? "space-y-1.5" : "space-y-2")}>
                {projects.map((p: any, i: number) => (
                  <div key={i}>
                    <p className={cn("font-medium", isCompact ? "text-[11px]" : "text-xs")}>{p.title}</p>
                    {p.description && <p className="text-[11px] text-muted-foreground">{p.description}</p>}
                    {p.techStack && p.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {p.techStack.map((t: any, idx: number) => (
                          <span key={idx} className="text-[9px] text-primary font-medium">
                            {typeof t === "string" ? t : t.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-muted-foreground italic">Add projects to your profile to display them here.</p>
            )}
          </div>
        );
      case "certifications":
        return (
          <div key={id}>
            <SectionHeading template={template}>Certifications</SectionHeading>
            {certificates.length > 0 ? (
              certificates.map((c: any, i: number) => (
                <div key={i} className="flex justify-between mb-1">
                  <p className={cn("font-medium", isCompact ? "text-[11px]" : "text-xs")}>{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">{c.issuer} {c.date ? `· ${c.date}` : ''}</p>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-muted-foreground italic">Add certifications to your profile to display them here.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-muted/50 p-6 flex justify-center">
      {isLoading && (
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          Loading profile data...
        </div>
      )}
      {!isLoading && (
        <div
          className={cn(
            "bg-card rounded-lg shadow-md w-full max-w-[600px] min-h-[800px]",
            isCompact ? "p-6" : "p-8"
          )}
        >
          {/* Header */}
          <div
            className={cn(
              "mb-4 pb-3",
              isModern ? "border-b-2 border-primary" : "border-b border-border"
            )}
          >
            <h2
              className={cn(
                "font-heading font-bold text-foreground",
                isModern ? "text-2xl" : isCompact ? "text-lg" : "text-xl"
              )}
            >
              {fullName}
            </h2>
            <p className={cn("text-muted-foreground mb-2", isCompact ? "text-[10px]" : "text-xs")}>
              {profileData.headline || userProfile.headline || "Professional"}
            </p>
            <div className={cn("flex flex-wrap gap-x-3 gap-y-0.5", isCompact ? "text-[10px]" : "text-[11px]")}>
              {profileData.email && <span className="text-muted-foreground">{profileData.email}</span>}
              {profileData.phone && <span className="text-muted-foreground">{profileData.phone}</span>}
              {profileData.location && <span className="text-muted-foreground">{profileData.location}</span>}
            </div>
            {/* Profile Links */}
            {profileLinks.length > 0 && (
              <div className={cn("flex flex-wrap gap-2 mt-2", isCompact ? "text-[9px]" : "text-[10px]")}>
                {profileLinks.map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sections */}
          <div className={cn(isCompact ? "space-y-3" : "space-y-4")}>
            {enabledSections.map((s) => renderSection(s.id))}
          </div>
        </div>
      )}
    </div>
  );
};

const SectionHeading = ({ children, template }: { children: string; template: string }) => (
  <h3
    className={cn(
      "font-heading font-semibold text-foreground mb-1.5",
      template === "modern"
        ? "text-sm text-primary uppercase tracking-wider"
        : template === "compact"
          ? "text-xs border-b border-border pb-0.5 mb-1"
          : "text-sm"
    )}
  >
    {children}
  </h3>
);

export default ResumePreview;
