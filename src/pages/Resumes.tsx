import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { Card } from "@/components/ui/card";
import { FileText, Download, MoreVertical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data to represent uploaded resumes
const mockResumes = [
  { id: 1, name: "Software_Engineer_Resume.pdf", date: "2024-03-15", status: "ATS Optimized" },
  { id: 2, name: "Data_Analyst_Resume_v2.pdf", date: "2024-03-10", status: "Draft" },
  { id: 3, name: "Frontend_Dev_Old.pdf", date: "2024-02-28", status: "Needs Review" },
];

const Resumes = () => {
  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">My Resumes</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage and track all your uploaded resumes.
                </p>
              </div>
              <Button>Upload New Resume</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockResumes.map((resume) => (
                <Card key={resume.id} className="p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold text-foreground truncate" title={resume.name}>
                    {resume.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Uploaded {resume.date}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      resume.status === 'ATS Optimized' ? 'bg-green-100 text-green-700' :
                      resume.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {resume.status}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                    <Button variant="outline" size="sm" className="gap-1.5 w-full mr-2">
                      <Eye className="h-4 w-4" /> View
                    </Button>
                    <Button variant="secondary" size="sm" className="gap-1.5 w-full ml-2">
                      <Download className="h-4 w-4" /> Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
};

export default Resumes;
