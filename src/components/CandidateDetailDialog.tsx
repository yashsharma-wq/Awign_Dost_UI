import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Edit2, X } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

interface AEXCandidate {
  id: number;
  created_at: string;
  "Application ID": string | null;
  "Role Code": string | null;
  "Candidate Name": string | null;
  "Candidate Email ID": string | null;
  "Candidate Contact Number": string | null;
  "Candidate years of experience": string | null;
  "Candidate relevant years of experience": string | null;
  "Notice Period": string | null;
  "Current CTC": string | null;
  "Candidate Salary Expectation": string | null;
  "Current Location": string | null;
  "Candidate Resume": string | null;
  "Job Applied": string | null;
  Skills: string | null;
  Documents: string | null;
}

interface CandidateDetailDialogProps {
  candidate: AEXCandidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

type Job = Tables<"AEX_Job_Data">;

export function CandidateDetailDialog({
  candidate,
  open,
  onOpenChange,
  onUpdated,
}: CandidateDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    applicationId: "",
    roleCode: "",
    candidateName: "",
    candidateEmail: "",
    candidateContactNumber: "",
    candidateExperienceYears: "",
    candidateRelevantYears: "",
    noticePeriod: "",
    currentCtc: "",
    salaryExpectation: "",
    currentLocation: "",
    candidateResume: "",
    jobApplied: "",
    skills: "",
    documents: "",
  });

  useEffect(() => {
    const fetchActiveJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("AEX_Job_Data")
          .select("*")
          .eq("Status", "active")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setJobs(data || []);
      } catch (error: any) {
        console.error("Error fetching active jobs:", error);
      }
    };

    if (open) {
      fetchActiveJobs();
    }
  }, [open]);

  useEffect(() => {
    if (candidate) {
      setFormData({
        applicationId: candidate["Application ID"] || "",
        roleCode: candidate["Role Code"] || "",
        candidateName: candidate["Candidate Name"] || "",
        candidateEmail: candidate["Candidate Email ID"] || "",
        candidateContactNumber: candidate["Candidate Contact Number"] || "",
        candidateExperienceYears: candidate["Candidate years of experience"] || "",
        candidateRelevantYears: candidate["Candidate relevant years of experience"] || "",
        noticePeriod: candidate["Notice Period"] || "",
        currentCtc: candidate["Current CTC"] || "",
        salaryExpectation: candidate["Candidate Salary Expectation"] || "",
        currentLocation: candidate["Current Location"] || "",
        candidateResume: candidate["Candidate Resume"] || "",
        jobApplied: candidate["Job Applied"] || "",
        skills: candidate.Skills || "",
        documents: candidate.Documents || "",
      });
      setIsEditing(false);
    }
  }, [candidate]);

  const handleSave = async () => {
    if (!candidate) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from("AEX_Candidate_Data")
        .update({
          "Application ID": formData.applicationId || null,
          "Role Code": formData.roleCode || null,
          "Candidate Name": formData.candidateName || null,
          "Candidate Email ID": formData.candidateEmail || null,
          "Candidate Contact Number": formData.candidateContactNumber || null,
          "Candidate years of experience": formData.candidateExperienceYears || null,
          "Candidate relevant years of experience": formData.candidateRelevantYears || null,
          "Notice Period": formData.noticePeriod || null,
          "Current CTC": formData.currentCtc || null,
          "Candidate Salary Expectation": formData.salaryExpectation || null,
          "Current Location": formData.currentLocation || null,
          "Candidate Resume": formData.candidateResume || null,
          "Job Applied": formData.jobApplied || null,
          Skills: formData.skills || null,
          Documents: formData.documents || null,
        } as any)
        .eq("id", candidate.id);

      if (error) throw error;

      toast({ title: "Success", description: "Candidate updated successfully" });
      setIsEditing(false);
      onUpdated();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{candidate["Candidate Name"] || "Candidate Details"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Edit candidate information" : "View candidate details"}
              </DialogDescription>
            </div>
            <Button
              variant={isEditing ? "outline" : "default"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <X className="h-4 w-4 mr-1" /> : <Edit2 className="h-4 w-4 mr-1" />}
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Application ID</Label>
              {isEditing ? (
                <Input
                  value={formData.applicationId}
                  onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Application ID"] || "—"}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Candidate Name</Label>
              {isEditing ? (
                <Input
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Candidate Name"] || "—"}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email ID</Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.candidateEmail}
                  onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Candidate Email ID"] || "—"}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Contact Number</Label>
              {isEditing ? (
                <Input
                  value={formData.candidateContactNumber}
                  onChange={(e) => setFormData({ ...formData, candidateContactNumber: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Candidate Contact Number"] || "—"}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Role Code</Label>
              {isEditing ? (
                <Select
                  value={formData.roleCode}
                  onValueChange={(value) => {
                    const selectedJob = jobs.find(j => j["Role Code"] === value);
                    setFormData({
                      ...formData,
                      roleCode: value,
                      jobApplied: selectedJob?.["Role Name"] || "",
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job["Role Code"] || ""}>
                        {job["Role Code"]} - {job["Role Name"]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Role Code"] || "—"}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Job Applied</Label>
              {isEditing ? (
                <Input
                  value={formData.jobApplied}
                  onChange={(e) => setFormData({ ...formData, jobApplied: e.target.value })}
                  readOnly
                  className="bg-muted"
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Job Applied"] || "—"}</p>
              )}
              {isEditing && (
                <p className="text-xs text-muted-foreground">Auto-filled from selected Role Code</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Years of Experience</Label>
              {isEditing ? (
                <Input
                  value={formData.candidateExperienceYears}
                  onChange={(e) => setFormData({ ...formData, candidateExperienceYears: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Candidate years of experience"] || "—"}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Relevant Experience</Label>
              {isEditing ? (
                <Input
                  value={formData.candidateRelevantYears}
                  onChange={(e) => setFormData({ ...formData, candidateRelevantYears: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Candidate relevant years of experience"] || "—"}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Notice Period</Label>
              {isEditing ? (
                <Input
                  value={formData.noticePeriod}
                  onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Notice Period"] || "—"}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Current Location</Label>
              {isEditing ? (
                <Input
                  value={formData.currentLocation}
                  onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Current Location"] || "—"}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current CTC</Label>
              {isEditing ? (
                <Input
                  value={formData.currentCtc}
                  onChange={(e) => setFormData({ ...formData, currentCtc: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Current CTC"] || "—"}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Salary Expectation</Label>
              {isEditing ? (
                <Input
                  value={formData.salaryExpectation}
                  onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate["Candidate Salary Expectation"] || "—"}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            {isEditing ? (
              <Input
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            ) : (
              <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate.Skills || "—"}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Resume URL</Label>
            {isEditing ? (
              <Input
                value={formData.candidateResume}
                onChange={(e) => setFormData({ ...formData, candidateResume: e.target.value })}
              />
            ) : (
              <p className="text-sm text-muted-foreground p-2 bg-muted rounded break-all">{candidate["Candidate Resume"] || "—"}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Documents</Label>
            {isEditing ? (
              <Input
                value={formData.documents}
                onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
              />
            ) : (
              <p className="text-sm text-muted-foreground p-2 bg-muted rounded">{candidate.Documents || "—"}</p>
            )}
          </div>

          {isEditing && (
            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
