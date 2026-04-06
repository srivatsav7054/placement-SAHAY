import { motion } from "framer-motion";
import {
  MessageSquare,
  Share2,
  ExternalLink,
  TrendingUp,
  Search,
} from "lucide-react";
import DashboardSidebar, { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Arjun Sharma",
    role: "SDE @ Google",
    content:
      "Just shared my interview experience for the Google Step intern program. Check the PDF in resources! #Google #InterviewTips",
    category: "Interview",
    time: "2h ago",
    likes: 42,
    comments: 12,
  },
  {
    id: 2,
    author: "Priya Patel",
    role: "Placement Cell Head",
    content:
      "Urgent: Microsoft has just opened applications for its Fullstack Developer role. Deadline is tomorrow. Apply now! #JobAlert #Microsoft",
    category: "Job Alert",
    time: "4h ago",
    likes: 128,
    comments: 45,
  },
  {
    id: 3,
    author: "Rahul Mehta",
    role: "Data Scientist @ Meta",
    content:
      "Transitioned from SDE to Data Science. AMA (Ask Me Anything) session starting at 6 PM today on Zoom. #DataScience #CareerShift",
    category: "Event",
    time: "6h ago",
    likes: 89,
    comments: 67,
  },
];

const Community = () => {
  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Community Hub
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect, learn, and grow with your network of professionals.
                </p>
              </div>

              <div className="relative group min-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-hover:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search discussions, jobs, people..."
                  className="w-full bg-secondary border-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar: Topics & CTA */}
              <div className="lg:col-span-1 space-y-4">
                <div className="rounded-xl border border-border bg-card shadow-sm p-5">
                  <h2 className="text-sm font-heading font-bold text-foreground mb-3">
                    Popular Topics
                  </h2>
                  <div className="space-y-1">
                    {[
                      "#InterviewTips",
                      "#ResumeHack",
                      "#JobAlert",
                      "#SystemDesign",
                      "#JavaSpecialist",
                    ].map((topic) => (
                      <button
                        key={topic}
                        className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                        <span>{topic}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-primary p-5 text-primary-foreground overflow-hidden relative">
                  <div className="relative z-10">
                    <h2 className="font-heading font-bold mb-1">
                      Build Your Network
                    </h2>
                    <p className="text-primary-foreground/70 text-xs mb-4">
                      Complete your profile to get matched with potential
                      mentors and job opportunities.
                    </p>
                    <button className="bg-white text-primary font-bold rounded-lg py-2 px-5 text-sm hover:bg-white/90 transition-all">
                      Update Profile
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-12 -translate-y-12" />
                </div>
              </div>

              {/* Feed */}
              <div className="lg:col-span-2 space-y-4">
                {INITIAL_POSTS.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="rounded-xl border border-border bg-card shadow-sm p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {post.author[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {post.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {post.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {post.time}
                        </span>
                        <span className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                          <MessageSquare className="w-4 h-4" />
                          <span className="font-medium">{post.comments}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-all">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
};

export default Community;
