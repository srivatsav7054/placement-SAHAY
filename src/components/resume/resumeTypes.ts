export interface ResumeSection {
  id: string;
  label: string;
  enabled: boolean;
}

export interface ResumeData {
  id: number;
  name: string;
  updatedAt: string;
  template: "simple" | "modern" | "compact";
  summary: string;
  sections: ResumeSection[];
}

export const defaultSections: ResumeSection[] = [
  { id: "summary", label: "Summary", enabled: true },
  { id: "education", label: "Education", enabled: true },
  { id: "skills", label: "Skills", enabled: true },
  { id: "experience", label: "Experience", enabled: true },
  { id: "projects", label: "Projects", enabled: true },
  { id: "certifications", label: "Certifications", enabled: false },
];

export const mockProfile = {
  name: "Manyu",
  email: "manyu@example.com",
  phone: "+91 98765 43210",
  location: "Hyderabad, India",
  summary: "Passionate software developer with experience in full-stack web development, seeking placement opportunities to apply my skills in a dynamic environment.",
  skills: ["React", "Java", "Python", "TypeScript", "Tailwind CSS", "Node.js"],
  education: [
    { institution: "IIIT Hyderabad", degree: "B.Tech", field: "Computer Science", dates: "2021 – 2025" },
  ],
  experience: [
    { company: "TechCorp", role: "Frontend Intern", duration: "May 2024 – Aug 2024", description: "Built dashboard UI with React and Tailwind CSS." },
  ],
  projects: [
    { title: "Placement-Sahay", description: "AI-powered placement preparation platform", techStack: ["React", "Tailwind", "Supabase"], link: "#" },
    { title: "Portfolio Website", description: "Personal portfolio with dark theme", techStack: ["Next.js", "Framer Motion"], link: "#" },
  ],
  certifications: [
    { name: "AWS Cloud Practitioner", issuer: "Amazon", date: "2024" },
  ],
};
