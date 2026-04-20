import { motion } from "framer-motion";
import { Newspaper, ExternalLink, TrendingUp, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

/* ─── News data ──────────────────────────────────────────────────────────── */
interface NewsItem {
  id: number;
  category: string;
  title: string;
  source: string;
  timeAgo: string;
  url: string;
  icon: React.ElementType;
  iconColor: string;
}

const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "Hiring",
    title: "Google, Microsoft ramp up campus hiring for 2025 batch",
    source: "Economic Times",
    timeAgo: "2h ago",
    url: "#",
    icon: Building2,
    iconColor: "text-primary",
  },
  {
    id: 2,
    category: "Salary",
    title: "Average software engineer package up 18% — NASSCOM report",
    source: "NASSCOM",
    timeAgo: "5h ago",
    url: "#",
    icon: TrendingUp,
    iconColor: "text-success",
  },
  {
    id: 3,
    category: "Off-Campus",
    title: "Amazon opens off-campus drive for 2024 & 2025 graduates",
    source: "Careers360",
    timeAgo: "1d ago",
    url: "#",
    icon: Briefcase,
    iconColor: "text-warning",
  },
  {
    id: 4,
    category: "Internship",
    title: "Top 10 summer internships still open — apply before April 30",
    source: "InternShala Blog",
    timeAgo: "1d ago",
    url: "#",
    icon: GraduationCap,
    iconColor: "text-primary",
  },
  {
    id: 5,
    category: "Skills",
    title: "LinkedIn: Python, Gen-AI, and SQL top demanded skills in India",
    source: "LinkedIn Insights",
    timeAgo: "2d ago",
    url: "#",
    icon: TrendingUp,
    iconColor: "text-success",
  },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
const TrendingNews = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.6 }}
  >
    <Card className="p-5 shadow-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-4 w-4 text-primary" />
        <h3 className="font-heading text-base font-semibold text-foreground">
          Trending in Placements
        </h3>
      </div>

      {/* News list */}
      <ul className="space-y-3 overflow-y-auto max-h-[340px] flex-1 pr-0.5">
        {NEWS.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + i * 0.07 }}
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
            >
              {/* Icon badge */}
              <div className="shrink-0 rounded-lg bg-secondary p-2 mt-0.5">
                <item.icon className={`h-3.5 w-3.5 ${item.iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
                </div>
                <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {item.source}
                </span>
              </div>

              {/* Arrow */}
              <ExternalLink className="shrink-0 h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-border">
        <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
          View all placement news →
        </button>
      </div>
    </Card>
  </motion.div>
);

export default TrendingNews;
