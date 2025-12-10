import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, RefreshCw, Download, ExternalLink } from "lucide-react";
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
  "Skills": string | null;
  "Documents": string | null;
}

const Applications = () => {
  const [applications, setApplications] = useState<AEXCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("AEX_Candidate_Data")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications((data as AEXCandidate[]) || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResumeClick = (url: string | null) => {
    if (!url) {
      toast({
        title: "No Resume",
        description: "Resume URL not available",
        variant: "destructive",
      });
      return;
    }

    // Open in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Applications</h2>
          <p className="text-muted-foreground mt-1">View all candidate applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Card>
            <CardContent className="px-4 py-2">
              <div className="text-sm text-muted-foreground">Total: <span className="font-semibold text-foreground">{applications.length}</span></div>
            </CardContent>
          </Card>
          <Button onClick={fetchApplications} variant="outline" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      {applications.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role Code</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Notice Period</TableHead>
                    <TableHead>Current CTC</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>CV/Resume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        {new Date(app.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {app["Application ID"] || "—"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {app["Candidate Name"] || "—"}
                      </TableCell>
                      <TableCell>
                        {app["Role Code"] || "—"}
                      </TableCell>
                      <TableCell>
                        {app["Candidate Contact Number"] || "—"}
                      </TableCell>
                      <TableCell>
                        {app["Candidate years of experience"] || "—"}
                      </TableCell>
                      <TableCell>
                        {app["Current Location"] || "—"}
                      </TableCell>
                      <TableCell>
                        {app["Notice Period"] || "—"}
                      </TableCell>
                      <TableCell>
                        {app["Current CTC"] || "—"}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {app["Skills"] ? (
                            <span className="text-sm text-muted-foreground break-words">
                              {app["Skills"]}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {app["Candidate Resume"] ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResumeClick(app["Candidate Resume"])}
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No applications yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Applications will appear here once candidates are added</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Applications;


