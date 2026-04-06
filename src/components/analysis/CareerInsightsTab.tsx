import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, Lightbulb, Target } from "lucide-react";

const insights = {
  readiness: 72,
  missingSkills: ["Node.js", "System Design", "Docker", "CI/CD"],
  strengths: ["React", "TypeScript", "Tailwind CSS", "Java"],
  recommendations: [
    "Build 1 full-stack project using Node.js + React",
    "Learn Docker basics and containerize a project",
    "Add AWS or GCP certification",
    "Practice system design for interviews",
    "Contribute to an open-source project",
  ],
};

const CareerInsightsTab = () => {
  const readinessColor =
    insights.readiness >= 75 ? "text-success" : insights.readiness >= 50 ? "text-warning" : "text-error";

  return (
    <div className="space-y-6">
      {/* Readiness */}
      <Card className="shadow-card border-border">
        <CardContent className="py-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-col items-center">
              <Target className="h-8 w-8 text-primary mb-2" />
              <div className={`text-5xl font-heading font-bold ${readinessColor}`}>
                {insights.readiness}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">Job Ready</p>
            </div>
            <div className="flex-1 w-full">
              <Progress value={insights.readiness} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                You're on a good track! Focus on the gaps below to boost your score.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <Card className="shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-heading flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" /> Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.strengths.map((s) => (
                <span key={s} className="rounded-full bg-success/10 text-success px-3 py-1 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing */}
        <Card className="shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-heading flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" /> Skills to Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.missingSkills.map((s) => (
                <span key={s} className="rounded-full bg-warning/10 text-warning px-3 py-1 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-heading flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-warning" /> Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {insights.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerInsightsTab;
