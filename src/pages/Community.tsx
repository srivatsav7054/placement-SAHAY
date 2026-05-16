import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Share2,
  ExternalLink,
  TrendingUp,
  Search,
  ImagePlus,
} from "lucide-react";
import DashboardSidebar, { MobileSidebarProvider } from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { useCommunityFeed } from "@/hooks/useCommunityFeed";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Community = () => {
  const { data, isLoading, isError, createPostMutation, toggleLikeMutation } = useCommunityFeed();
  const [searchTerm, setSearchTerm] = useState("");
  const [postDraft, setPostDraft] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return data || [];

    return (data || []).filter((post) => {
      const authorName = `${post.userId.firstName || ""} ${post.userId.lastName || ""}`.toLowerCase();
      return post.text.toLowerCase().includes(normalizedSearch) || authorName.includes(normalizedSearch);
    });
  }, [data, searchTerm]);

  return (
    <MobileSidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-3 md:py-4 space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
              <Card className="flex-1 p-5 shadow-sm">
                <h2 className="font-heading text-base font-semibold text-foreground mb-3">Create Post</h2>
                <Textarea
                  value={postDraft}
                  onChange={(event) => setPostDraft(event.target.value)}
                  placeholder="Share resume advice, job alerts, or placement wins..."
                  className="min-h-[120px] resize-none"
                />
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <ImagePlus className="h-4 w-4" />
                    Dummy image placeholder is attached automatically if needed.
                  </div>
                  <Button
                    onClick={async () => {
                      if (!postDraft.trim()) return;
                      await createPostMutation.mutateAsync({
                        text: postDraft.trim(),
                        imageUrl: "/placeholder.svg",
                      });
                      setPostDraft("");
                    }}
                    disabled={createPostMutation.isPending || !postDraft.trim()}
                  >
                    {createPostMutation.isPending ? "Posting..." : "Post"}
                  </Button>
                </div>
              </Card>

              <div className="relative group min-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-hover:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search discussions, jobs, people..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full bg-secondary border-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="rounded-xl border border-border bg-card shadow-sm p-5">
                  <h2 className="text-sm font-heading font-bold text-foreground mb-3">Popular Topics</h2>
                  <div className="space-y-1">
                    {["#InterviewTips", "#ResumeHack", "#JobAlert", "#SystemDesign", "#JavaSpecialist"].map((topic) => (
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
                    <h2 className="font-heading font-bold mb-1">Build Your Network</h2>
                    <p className="text-primary-foreground/70 text-xs mb-4">
                      Complete your profile to get matched with mentors and opportunities.
                    </p>
                    <button className="bg-white text-primary font-bold rounded-lg py-2 px-5 text-sm hover:bg-white/90 transition-all">
                      Update Profile
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-12 -translate-y-12" />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {isLoading && <Card className="p-5 text-sm text-muted-foreground shadow-sm">Loading community feed...</Card>}
                {isError && !data && <Card className="p-5 text-sm text-destructive shadow-sm">Community data could not be loaded.</Card>}

                {filteredPosts.map((post, index) => {
                  const fullName = `${post.userId.firstName || "Demo"} ${post.userId.lastName || "User"}`.trim();

                  return (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-xl border border-border bg-card shadow-sm p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-sm shrink-0 overflow-hidden">
                            {post.userId.imageUrl ? (
                              <img src={post.userId.imageUrl} alt={fullName} className="h-full w-full object-cover" />
                            ) : (
                              fullName[0]
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{fullName}</p>
                            <p className="text-xs text-muted-foreground">{post.userId.headline || "Community member"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                          <span className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground rounded-full">
                            Resume
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.text}</p>

                      {post.imageUrl && (
                        <div className="mb-4 overflow-hidden rounded-xl border border-border">
                          <img src={post.imageUrl} alt="Post placeholder" className="h-44 w-full object-cover" />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleLikeMutation.mutate(post._id)}
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm"
                          >
                            <TrendingUp className="w-4 h-4" />
                            <span className="font-medium">{post.likeCount}</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                            <MessageSquare className="w-4 h-4" />
                            <span className="font-medium">{post.commentCount}</span>
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
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </MobileSidebarProvider>
  );
};

export default Community;
