import { cn } from "@/lib/utils";
import { ResumeData, mockProfile } from "./resumeTypes";
import { Badge } from "@/components/ui/badge";

interface ResumePreviewProps {
  resume: ResumeData;
}

const ResumePreview = ({ resume }: ResumePreviewProps) => {
  const { template, sections } = resume;
  const profile = mockProfile;
  const enabledSections = sections.filter((s) => s.enabled);

  const isSimple = template === "simple";
  const isModern = template === "modern";
  const isCompact = template === "compact";

  const renderSection = (id: string) => {
    switch (id) {
      case "summary":
        return (
          <div key={id}>
            <SectionHeading template={template}>Summary</SectionHeading>
            <p className={cn("text-muted-foreground", isCompact ? "text-[11px] leading-relaxed" : "text-xs leading-relaxed")}>{resume.summary || profile.summary}</p>
          </div>
        );
      case "education":
        return (
          <div key={id}>
            <SectionHeading template={template}>Education</SectionHeading>
            {profile.education.map((e, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <p className={cn("font-medium", isCompact ? "text-[11px]" : "text-xs")}>{e.degree} in {e.field}</p>
                  <p className="text-[11px] text-muted-foreground">{e.institution}</p>
                </div>
                <p className="text-[11px] text-muted-foreground shrink-0">{e.dates}</p>
              </div>
            ))}
          </div>
        );
      case "skills":
        return (
          <div key={id}>
            <SectionHeading template={template}>Skills</SectionHeading>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((s) => (
                <Badge key={s} variant="secondary" className="text-[10px] px-2 py-0.5">{s}</Badge>
              ))}
            </div>
          </div>
        );
      case "experience":
        return (
          <div key={id}>
            <SectionHeading template={template}>Experience</SectionHeading>
            {profile.experience.map((e, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <p className={cn("font-medium", isCompact ? "text-[11px]" : "text-xs")}>{e.role}</p>
                  <p className="text-[11px] text-muted-foreground shrink-0">{e.duration}</p>
                </div>
                <p className="text-[11px] text-muted-foreground">{e.company}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{e.description}</p>
              </div>
            ))}
          </div>
        );
      case "projects":
        return (
          <div key={id}>
            <SectionHeading template={template}>Projects</SectionHeading>
            <div className={cn(isCompact ? "space-y-1.5" : "space-y-2")}>
              {profile.projects.map((p, i) => (
                <div key={i}>
                  <p className={cn("font-medium", isCompact ? "text-[11px]" : "text-xs")}>{p.title}</p>
                  <p className="text-[11px] text-muted-foreground">{p.description}</p>
                  <div className="flex gap-1 mt-0.5">
                    {p.techStack.map((t) => (
                      <span key={t} className="text-[9px] text-primary font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "certifications":
        return (
          <div key={id}>
            <SectionHeading template={template}>Certifications</SectionHeading>
            {profile.certifications.map((c, i) => (
              <div key={i} className="flex justify-between">
                <p className={cn("font-medium", isCompact ? "text-[11px]" : "text-xs")}>{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{c.issuer} · {c.date}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-muted/50 p-6 flex justify-center">
      <div
        className={cn(
          "bg-card rounded-lg shadow-md w-full max-w-[600px] min-h-[800px]",
          isCompact ? "p-6" : "p-8"
        )}
      >
        {/* Header */}
        <div className={cn(
          "mb-4 pb-3",
          isModern ? "border-b-2 border-primary" : "border-b border-border"
        )}>
          <h2 className={cn(
            "font-heading font-bold text-foreground",
            isModern ? "text-2xl" : isCompact ? "text-lg" : "text-xl"
          )}>
            {profile.name}
          </h2>
          <div className={cn("flex flex-wrap gap-x-3 gap-y-0.5 mt-1", isCompact ? "text-[10px]" : "text-[11px]")}>
            <span className="text-muted-foreground">{profile.email}</span>
            <span className="text-muted-foreground">{profile.phone}</span>
            <span className="text-muted-foreground">{profile.location}</span>
          </div>
        </div>

        {/* Sections */}
        <div className={cn(isCompact ? "space-y-3" : "space-y-4")}>
          {enabledSections.map((s) => renderSection(s.id))}
        </div>
      </div>
    </div>
  );
};

const SectionHeading = ({ children, template }: { children: string; template: string }) => (
  <h3 className={cn(
    "font-heading font-semibold text-foreground mb-1.5",
    template === "modern" ? "text-sm text-primary uppercase tracking-wider" :
    template === "compact" ? "text-xs border-b border-border pb-0.5 mb-1" :
    "text-sm"
  )}>
    {children}
  </h3>
);

export default ResumePreview;
