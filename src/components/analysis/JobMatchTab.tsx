import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Loader2, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

const mockResults = {
  score: 82,
  matched: ["React", "TypeScript", "Tailwind CSS", "Java", "Node.js"],
  missing: ["Docker", "AWS", "GraphQL"],
  suggestions: [
    "Add Docker experience to your projects section",
    "Mention REST API development explicitly",
    "Include cloud deployment experience (AWS/GCP)",
    "Improve project descriptions with measurable impact",
  ],
};

const JobMatchTab = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<typeof mockResults | null>(null);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    setResults(null);
    setTimeout(() => {
      setResults(mockResults);
      setAnalyzing(false);
    }, 2000);
  };

  const scoreColor = (score: number) =>
    score >= 75 ? "text-success" : score >= 50 ? "text-warning" : "text-error";

  const scoreBg = (score: number) =>
    score >= 75 ? "bg-success" : score >= 50 ? "bg-warning" : "bg-error";

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-heading">Analyze Job Match</CardTitle>
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
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Paste Job Description</label>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[140px] resize-none"
            />
          </div>
          <Button onClick={handleAnalyze} disabled={analyzing || !jobDescription.trim()} className="w-full sm:w-auto">
            {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {analyzing ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Score */}
          <Card className="shadow-card border-border md:col-span-1">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className={`text-6xl font-heading font-bold ${scoreColor(results.score)}`}>
                {results.score}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">Match Score</p>
              <div className="w-full mt-4">
                <Progress value={results.score} className={`h-2 [&>div]:${scoreBg(results.score)}`} />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="shadow-card border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-heading">Skills Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-foreground">Matched Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.matched.map((s) => (
                    <span key={s} className="rounded-full bg-success/10 text-success px-3 py-1 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium text-foreground">Missing Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.missing.map((s) => (
                    <span key={s} className="rounded-full bg-error/10 text-error px-3 py-1 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="shadow-card border-border md:col-span-3">
            <CardHeader>
              <CardTitle className="text-base font-heading flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" /> Suggestions
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

export default JobMatchTab;
