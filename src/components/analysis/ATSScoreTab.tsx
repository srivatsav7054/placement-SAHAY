import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Loader2, FileSearch, CheckCircle2, AlertTriangle, XCircle, Lightbulb } from "lucide-react";

const mockATS = {
  score: 85,
  breakdown: [
    { label: "Formatting", score: 90, status: "good" as const },
    { label: "Keywords", score: 65, status: "medium" as const },
    { label: "Structure", score: 92, status: "good" as const },
    { label: "Readability", score: 88, status: "good" as const },
  ],
  suggestions: [
    "Add more industry-specific keywords",
    "Avoid complex multi-column layouts",
    "Use standard section headings (Experience, Education, Skills)",
    "Quantify achievements with numbers and metrics",
  ],
};

const statusConfig = {
  good: { icon: CheckCircle2, color: "text-success", bg: "bg-success" },
  medium: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning" },
  poor: { icon: XCircle, color: "text-error", bg: "bg-error" },
};

const ATSScoreTab = () => {
  const [selectedResume, setSelectedResume] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<typeof mockATS | null>(null);

  const handleAnalyze = () => {
    if (!selectedResume) return;
    setAnalyzing(true);
    setResults(null);
    setTimeout(() => {
      setResults(mockATS);
      setAnalyzing(false);
    }, 1800);
  };

  const scoreColor = (score: number) =>
    score >= 75 ? "text-success" : score >= 50 ? "text-warning" : "text-error";

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-heading">ATS Compatibility Check</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Select Resume</label>
            <Select value={selectedResume} onValueChange={setSelectedResume}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a resume" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Resume</SelectItem>
                <SelectItem value="tech">Tech Resume</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAnalyze} disabled={analyzing || !selectedResume} className="w-full sm:w-auto">
            {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileSearch className="h-4 w-4" />}
            {analyzing ? "Scanning..." : "Check ATS Score"}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Big Score */}
          <Card className="shadow-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className={`text-6xl font-heading font-bold ${scoreColor(results.score)}`}>
                {results.score}
              </div>
              <p className="text-sm text-muted-foreground mt-1">/ 100</p>
              <p className="text-xs text-muted-foreground mt-2">ATS Score</p>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card className="shadow-card border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-heading">Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.breakdown.map((item) => {
                const cfg = statusConfig[item.status];
                const Icon = cfg.icon;
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${cfg.color}`} />
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                      </div>
                      <span className={`text-sm font-semibold ${cfg.color}`}>{item.score}%</span>
                    </div>
                    <Progress value={item.score} className={`h-1.5 [&>div]:${cfg.bg}`} />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="shadow-card border-border md:col-span-3">
            <CardHeader>
              <CardTitle className="text-base font-heading flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" /> Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ATSScoreTab;
