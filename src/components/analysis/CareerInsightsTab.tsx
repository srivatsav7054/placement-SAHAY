import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, Lightbulb, Target } from "lucide-react";

import { useUserProfile } from "@/hooks/useUserProfile";

const CareerInsightsTab = () => {
  const { data: userProfile } = useUserProfile();
  
  const userSkills = userProfile?.skills || [];
  const requiredSkills = ["React", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB", "SQL", "Docker", "Git", "System Design"];
  
  const strengths = userSkills;
  const missingSkills = requiredSkills.filter(s => !userSkills.includes(s)).slice(0, 4);
  const readiness = Math.min(Math.round(((userSkills.length || 1) / (requiredSkills.length)) * 100), 100);

  const recommendations = [
    ...(missingSkills.length > 0 ? [`Master ${missingSkills[0]} to open up more roles`] : []),
    "Quantify your experience with specific metrics (e.g., 'Improved performance by 20%')",
    "Ensure your GitHub link is updated with your latest projects",
    "Tailor your resume for each specific job application using the ATS tool",
  ];

  const readinessColor =
    readiness >= 75 ? "text-success" : readiness >= 50 ? "text-warning" : "text-error";

  return (
    <div className="space-y-6">
      {/* Readiness */}
      <Card className="shadow-card border-border">
        <CardContent className="py-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-col items-center">
              <Target className="h-8 w-8 text-primary mb-2" />
              <div className={`text-5xl font-heading font-bold ${readinessColor}`}>
                {readiness}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">Job Ready</p>
            </div>
            <div className="flex-1 w-full">
              <Progress value={readiness} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {readiness > 70 ? "You're on a great track!" : "Keep adding skills and experience to your profile."}
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
              <TrendingUp className="h-4 w-4 text-success" /> Your Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {strengths.length > 0 ? strengths.map((s) => (
                <span key={s} className="rounded-full bg-success/10 text-success px-3 py-1 text-xs font-medium">
                  {s}
                </span>
              )) : (
                <p className="text-sm text-muted-foreground">No skills added yet.</p>
              )}
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
              {missingSkills.map((s) => (
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
            {recommendations.map((r, i) => (
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
