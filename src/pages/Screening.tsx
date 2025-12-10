import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Target, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ScreeningRecord {
  id: string;
  timestamp: string;
  application_id: string;
  candidate_name: string;
  role_code: string;
  job_title: string;
  screening_outcome: string;
  call_status: string;
  call_score: number | null;
  final_score: number | null;
  screening_summary: string | null;
}

const Screening = () => {
  const [screenings, setScreenings] = useState<ScreeningRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScreenings();
  }, []);

  const fetchScreenings = async () => {
    try {
      const { data, error } = await supabase
        .from("screening_tracker")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) throw error;
      setScreenings(data || []);
    } catch (error: any) {
      console.error("Error fetching screenings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome?.toLowerCase()) {
      case "pass":
      case "passed":
      case "selected":
        return "bg-status-success text-white";
      case "reject":
      case "rejected":
        return "bg-status-rejected text-white";
      case "pending":
      case "hold":
        return "bg-status-pending text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 80) return "text-status-success font-semibold";
    if (score >= 60) return "text-status-pending font-semibold";
    return "text-status-rejected font-semibold";
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
          <h2 className="text-3xl font-bold text-foreground">Screening Tracker</h2>
          <p className="text-muted-foreground mt-1">Monitor and review candidate screening results</p>
        </div>
        <div className="flex items-center gap-2">
          <Card className="px-4 py-2">
            <div className="text-sm text-muted-foreground">Total: <span className="font-semibold text-foreground">{screenings.length}</span></div>
          </Card>
          <Button onClick={fetchScreenings} variant="outline" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      {screenings.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Call Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead>Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {screenings.map((screening) => (
                  <TableRow key={screening.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(screening.timestamp).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{screening.candidate_name}</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {screening.application_id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{screening.job_title || "—"}</div>
                        <div className="text-xs text-muted-foreground">{screening.role_code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{screening.call_status || "—"}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={getScoreColor(screening.final_score)}>
                        {screening.final_score ? `${screening.final_score}/100` : "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {screening.screening_outcome ? (
                        <Badge className={getOutcomeColor(screening.screening_outcome)}>
                          {screening.screening_outcome}
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground truncate">
                        {screening.screening_summary || "No summary available"}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No screening data yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Screening results will appear here once candidates are processed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Screening;
