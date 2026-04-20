import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Loader2, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { useResumeLibrary } from "@/hooks/useResumeLibrary";

const JobMatchTab = () => {
  const { data, analyzeResumeMutation } = useResumeLibrary();
  const [jobDescription, setJobDescription] = useState("");
  const [selectedVersionId, setSelectedVersionId] = useState("");

  const selectedResume = useMemo(
    () => (data || []).find((resume) => resume.latestVersionId?._id === selectedVersionId),
    [data, selectedVersionId]
  );

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !selectedVersionId) return;
    await analyzeResumeMutation.mutateAsync({
      versionId: selectedVersionId,
      jobDescription,
    });
  };

  const results = analyzeResumeMutation.data;

  const scoreColor = (score: number) =>
    score >= 75 ? "text-success" : score >= 50 ? "text-warning" : "text-error";

  const scoreBg = (score: number) =>
    score >= 75 ? "bg-success" : score >= 50 ? "bg-warning" : "bg-error";

  return (
    <div className="space-y-6">
      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-heading">Analyze Job Match</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Select Resume</label>
            <Select value={selectedVersionId} onValueChange={setSelectedVersionId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a resume version" />
              </SelectTrigger>
              <SelectContent>
                {(data || []).map((resume) =>
                  resume.latestVersionId?._id ? (
                    <SelectItem key={resume.latestVersionId._id} value={resume.latestVersionId._id}>
                      {resume.title} - v{resume.latestVersionId.versionNumber}
                    </SelectItem>
                  ) : null
                )}
              </SelectContent>
            </Select>
            {selectedResume && (
              <p className="mt-2 text-xs text-muted-foreground">
                Analyzing the latest version of {selectedResume.title}.
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Paste Job Description</label>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              className="min-h-[140px] resize-none"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={analyzeResumeMutation.isPending || !jobDescription.trim() || !selectedVersionId}
            className="w-full sm:w-auto"
          >
            {analyzeResumeMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {analyzeResumeMutation.isPending ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card border-border md:col-span-1">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className={`text-6xl font-heading font-bold ${scoreColor(results.jobMatchScore)}`}>
                {results.jobMatchScore}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">Match Score</p>
              <div className="w-full mt-4">
                <Progress value={results.jobMatchScore} className={`h-2 [&>div]:${scoreBg(results.jobMatchScore)}`} />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-heading">AI Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.comments.map((comment) => (
                <div key={comment} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-success shrink-0" />
                  <span>{comment}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-base font-heading flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-error" /> Errors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.errors.length > 0 ? (
                results.errors.map((error) => (
                  <p key={error} className="text-sm text-muted-foreground">{error}</p>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No critical issues flagged.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card border-border md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-heading flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" /> Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.warnings.map((warning) => (
                  <li key={warning} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {warning}
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
