export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  dates: string;
  grade: string;
}

export interface Certification {
  _id?: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Todo {
  _id?: string;
  id: string; // client-side id if needed
  title: string;
  completed: boolean;
  dueDate: string | null;
  createdAt: number;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  link: string;
}

export interface Achievement {
  _id?: string;
  title: string;
  description: string;
  date: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || res.statusText);
  }
  return res.json();
};

export const api = {
  // User Profile
  getUser: (clerkId: string) => 
    fetch(`${API_URL}/users/${clerkId}`).then(handleResponse),
    
  updateUser: (clerkId: string, data: any) =>
    fetch(`${API_URL}/users/${clerkId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),

  // Education
  getEducation: (clerkId: string) =>
    fetch(`${API_URL}/users/${clerkId}/education`).then(handleResponse),

  addEducation: (clerkId: string, edu: Omit<Education, "_id">) =>
    fetch(`${API_URL}/users/${clerkId}/education`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edu),
    }).then(handleResponse),

  deleteEducation: (clerkId: string, eduId: string) =>
    fetch(`${API_URL}/users/${clerkId}/education/${eduId}`, {
      method: "DELETE",
    }).then(handleResponse),

  // Certifications
  getCertifications: (clerkId: string) =>
    fetch(`${API_URL}/users/${clerkId}/certifications`).then(handleResponse),

  addCertification: (clerkId: string, cert: Omit<Certification, "_id">) =>
    fetch(`${API_URL}/users/${clerkId}/certifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cert),
    }).then(handleResponse),

  deleteCertification: (clerkId: string, certId: string) =>
    fetch(`${API_URL}/users/${clerkId}/certifications/${certId}`, {
      method: "DELETE",
    }).then(handleResponse),

  // Projects
  getProjects: (clerkId: string) =>
    fetch(`${API_URL}/users/${clerkId}/projects`).then(handleResponse),

  addProject: (clerkId: string, project: Omit<Project, "_id">) =>
    fetch(`${API_URL}/users/${clerkId}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    }).then(handleResponse),

  updateProject: (clerkId: string, projectId: string, data: Partial<Project>) =>
    fetch(`${API_URL}/users/${clerkId}/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),

  deleteProject: (clerkId: string, projectId: string) =>
    fetch(`${API_URL}/users/${clerkId}/projects/${projectId}`, {
      method: "DELETE",
    }).then(handleResponse),

  // Achievements
  getAchievements: (clerkId: string) =>
    fetch(`${API_URL}/users/${clerkId}/achievements`).then(handleResponse),

  addAchievement: (clerkId: string, achievement: Omit<Achievement, "_id">) =>
    fetch(`${API_URL}/users/${clerkId}/achievements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(achievement),
    }).then(handleResponse),

  updateAchievement: (clerkId: string, achId: string, data: Partial<Achievement>) =>
    fetch(`${API_URL}/users/${clerkId}/achievements/${achId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),

  deleteAchievement: (clerkId: string, achId: string) =>
    fetch(`${API_URL}/users/${clerkId}/achievements/${achId}`, {
      method: "DELETE",
    }).then(handleResponse),

  // Todos
  getTodos: (clerkId: string) =>
    fetch(`${API_URL}/users/${clerkId}/todos`).then(handleResponse),

  addTodo: (clerkId: string, todo: Omit<Todo, "_id">) =>
    fetch(`${API_URL}/users/${clerkId}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    }).then(handleResponse),

  updateTodo: (clerkId: string, todoId: string, data: Partial<Todo>) =>
    fetch(`${API_URL}/users/${clerkId}/todos/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse),

  deleteTodo: (clerkId: string, todoId: string) =>
    fetch(`${API_URL}/users/${clerkId}/todos/${todoId}`, {
      method: "DELETE",
    }).then(handleResponse),
};
