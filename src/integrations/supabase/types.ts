export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      AEX_Candidate_Data: {
        Row: {
          "Application ID": string | null
          "Candidate Contact Number": string | null
          "Candidate Email ID": string | null
          "Candidate Name": string | null
          "Candidate relevant years of experience": string | null
          "Candidate Resume": string | null
          "Candidate Salary Expectation": string | null
          "Candidate years of experience": string | null
          created_at: string
          "Current CTC": string | null
          "Current Location": string | null
          Documents: string | null
          id: number
          JD_Mapping: string | null
          "Job Applied": string | null
          "Notice Period": string | null
          "Role Code": string | null
          Skills: string | null
        }
        Insert: {
          "Application ID"?: string | null
          "Candidate Contact Number"?: string | null
          "Candidate Email ID"?: string | null
          "Candidate Name"?: string | null
          "Candidate relevant years of experience"?: string | null
          "Candidate Resume"?: string | null
          "Candidate Salary Expectation"?: string | null
          "Candidate years of experience"?: string | null
          created_at?: string
          "Current CTC"?: string | null
          "Current Location"?: string | null
          Documents?: string | null
          id?: number
          JD_Mapping?: string | null
          "Job Applied"?: string | null
          "Notice Period"?: string | null
          "Role Code"?: string | null
          Skills?: string | null
        }
        Update: {
          "Application ID"?: string | null
          "Candidate Contact Number"?: string | null
          "Candidate Email ID"?: string | null
          "Candidate Name"?: string | null
          "Candidate relevant years of experience"?: string | null
          "Candidate Resume"?: string | null
          "Candidate Salary Expectation"?: string | null
          "Candidate years of experience"?: string | null
          created_at?: string
          "Current CTC"?: string | null
          "Current Location"?: string | null
          Documents?: string | null
          id?: number
          JD_Mapping?: string | null
          "Job Applied"?: string | null
          "Notice Period"?: string | null
          "Role Code"?: string | null
          Skills?: string | null
        }
        Relationships: []
      }
      AEX_Job_Data: {
        Row: {
          id: number
          created_at: string
          "Role Code": string | null
          "Role Name": string | null
          "Status": string | null
          "Location": string | null
          "Brief context about the role (JD)": string | null
          "Current Updates": string | null
          "Minimum Experience": string | null
          "Duration": string | null
          "Candidate Monthly CTC": string | null
          "Skills": string | null
        }
        Insert: {
          id?: number
          created_at?: string
          "Role Code"?: string | null
          "Role Name"?: string | null
          "Status"?: string | null
          "Location"?: string | null
          "Brief context about the role (JD)"?: string | null
          "Current Updates"?: string | null
          "Minimum Experience"?: string | null
          "Duration"?: string | null
          "Candidate Monthly CTC"?: string | null
          "Skills"?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          "Role Code"?: string | null
          "Role Name"?: string | null
          "Status"?: string | null
          "Location"?: string | null
          "Brief context about the role (JD)"?: string | null
          "Current Updates"?: string | null
          "Minimum Experience"?: string | null
          "Duration"?: string | null
          "Candidate Monthly CTC"?: string | null
          "Skills"?: string | null
        }
        Relationships: []
      }
      AEX_CV_Matching: {
        Row: {
          id: string
          created_at: string
          "Application ID": string | null
          "Role Code": string | null
          "Score": string | null
          "Missing Skills": string | null
          "Extracted Skills": string | null
          "JD Summary": string | null
          "Resume Summary": string | null
        }
        Insert: {
          id?: string
          created_at?: string
          "Application ID"?: string | null
          "Role Code"?: string | null
          "Score"?: string | null
          "Missing Skills"?: string | null
          "Extracted Skills"?: string | null
          "JD Summary"?: string | null
          "Resume Summary"?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          "Application ID"?: string | null
          "Role Code"?: string | null
          "Score"?: string | null
          "Missing Skills"?: string | null
          "Extracted Skills"?: string | null
          "JD Summary"?: string | null
          "Resume Summary"?: string | null
        }
        Relationships: []
      }
      analytics_daily: {
        Row: {
          avg_score: number | null
          created_at: string | null
          date: string
          role_wise_counts: Json | null
          total_candidates: number | null
          total_screened: number | null
        }
        Insert: {
          avg_score?: number | null
          created_at?: string | null
          date: string
          role_wise_counts?: Json | null
          total_candidates?: number | null
          total_screened?: number | null
        }
        Update: {
          avg_score?: number | null
          created_at?: string | null
          date?: string
          role_wise_counts?: Json | null
          total_candidates?: number | null
          total_screened?: number | null
        }
        Relationships: []
      }
      candidates: {
        Row: {
          application_id: string
          candidate_contact_number: string | null
          candidate_email: string | null
          candidate_experience_years: number | null
          candidate_name: string
          candidate_relevant_years: number | null
          created_at: string | null
          current_ctc_lpa: number | null
          current_location: string | null
          expected_ctc_min: number | null
          job_applied: string | null
          new_or_repeat: string | null
          notice_period_days: number | null
          poc: string | null
          profile_status: string | null
          rejection_reason: string | null
          required_documents: string[] | null
          resume_url: string | null
          role_code: string | null
          row_id: number
          screening_status: string | null
          skills: string[] | null
          tag: string | null
          wamid: string | null
        }
        Insert: {
          application_id: string
          candidate_contact_number?: string | null
          candidate_email?: string | null
          candidate_experience_years?: number | null
          candidate_name: string
          candidate_relevant_years?: number | null
          created_at?: string | null
          current_ctc_lpa?: number | null
          current_location?: string | null
          expected_ctc_min?: number | null
          job_applied?: string | null
          new_or_repeat?: string | null
          notice_period_days?: number | null
          poc?: string | null
          profile_status?: string | null
          rejection_reason?: string | null
          required_documents?: string[] | null
          resume_url?: string | null
          role_code?: string | null
          row_id?: number
          screening_status?: string | null
          skills?: string[] | null
          tag?: string | null
          wamid?: string | null
        }
        Update: {
          application_id?: string
          candidate_contact_number?: string | null
          candidate_email?: string | null
          candidate_experience_years?: number | null
          candidate_name?: string
          candidate_relevant_years?: number | null
          created_at?: string | null
          current_ctc_lpa?: number | null
          current_location?: string | null
          expected_ctc_min?: number | null
          job_applied?: string | null
          new_or_repeat?: string | null
          notice_period_days?: number | null
          poc?: string | null
          profile_status?: string | null
          rejection_reason?: string | null
          required_documents?: string[] | null
          resume_url?: string | null
          role_code?: string | null
          row_id?: number
          screening_status?: string | null
          skills?: string[] | null
          tag?: string | null
          wamid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_role_code_fkey"
            columns: ["role_code"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["role_code"]
          },
        ]
      }
      cv_matching: {
        Row: {
          application_id: string | null
          created_at: string | null
          extracted_skills: string | null
          id: string
          jd_summary: string | null
          missing_skills: string | null
          resume_summary: string | null
          role_code: string | null
          score: number | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          extracted_skills?: string | null
          id?: string
          jd_summary?: string | null
          missing_skills?: string | null
          resume_summary?: string | null
          role_code?: string | null
          score?: number | null
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          extracted_skills?: string | null
          id?: string
          jd_summary?: string | null
          missing_skills?: string | null
          resume_summary?: string | null
          role_code?: string | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cv_matching_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["application_id"]
          },
        ]
      }
      documents: {
        Row: {
          application_id: string | null
          created_at: string | null
          document_type: string | null
          id: string
          url: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          document_type?: string | null
          id?: string
          url: string
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          document_type?: string | null
          id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["application_id"]
          },
        ]
      }
      jobs: {
        Row: {
          candidate_monthly_ctc: number | null
          created_at: string | null
          current_updates: string | null
          duration: string | null
          jd_context: string | null
          location: string | null
          minimum_experience: number | null
          role_code: string
          role_name: string
          skills: string[] | null
          status: string | null
        }
        Insert: {
          candidate_monthly_ctc?: number | null
          created_at?: string | null
          current_updates?: string | null
          duration?: string | null
          jd_context?: string | null
          location?: string | null
          minimum_experience?: number | null
          role_code: string
          role_name: string
          skills?: string[] | null
          status?: string | null
        }
        Update: {
          candidate_monthly_ctc?: number | null
          created_at?: string | null
          current_updates?: string | null
          duration?: string | null
          jd_context?: string | null
          location?: string | null
          minimum_experience?: number | null
          role_code?: string
          role_name?: string
          skills?: string[] | null
          status?: string | null
        }
        Relationships: []
      }
      screening_batch_queue: {
        Row: {
          application_id: string | null
          created_at: string | null
          id: string
          role_code: string | null
          status: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          id?: string
          role_code?: string | null
          status?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          id?: string
          role_code?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "screening_batch_queue_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["application_id"]
          },
        ]
      }
      screening_questions: {
        Row: {
          application_id: string | null
          generated_at: string | null
          id: string
          question_prompt: string
          role_code: string | null
        }
        Insert: {
          application_id?: string | null
          generated_at?: string | null
          id?: string
          question_prompt: string
          role_code?: string | null
        }
        Update: {
          application_id?: string | null
          generated_at?: string | null
          id?: string
          question_prompt?: string
          role_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "screening_questions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["application_id"]
          },
        ]
      }
      screening_responses: {
        Row: {
          application_id: string | null
          audio_url: string | null
          call_duration: number | null
          candidate_name: string | null
          created_at: string | null
          id: string
          mobile_number: string | null
          raw_json: Json | null
          role_code: string | null
          summary: string | null
          timestamp: string | null
          transcript: string | null
        }
        Insert: {
          application_id?: string | null
          audio_url?: string | null
          call_duration?: number | null
          candidate_name?: string | null
          created_at?: string | null
          id?: string
          mobile_number?: string | null
          raw_json?: Json | null
          role_code?: string | null
          summary?: string | null
          timestamp?: string | null
          transcript?: string | null
        }
        Update: {
          application_id?: string | null
          audio_url?: string | null
          call_duration?: number | null
          candidate_name?: string | null
          created_at?: string | null
          id?: string
          mobile_number?: string | null
          raw_json?: Json | null
          role_code?: string | null
          summary?: string | null
          timestamp?: string | null
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "screening_responses_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["application_id"]
          },
        ]
      }
      screening_tracker: {
        Row: {
          application_id: string | null
          call_route: string | null
          call_score: number | null
          call_status: string | null
          candidate_name: string | null
          conversation_id: string | null
          created_at: string | null
          current_ctc: number | null
          current_location: string | null
          expected_ctc: number | null
          final_score: number | null
          id: string
          job_title: string | null
          notice_period: number | null
          other_job_offers: string | null
          recording_link: string | null
          rejection_reason: string | null
          role_code: string | null
          screening_outcome: string | null
          screening_summary: string | null
          similarity_score: number | null
          similarity_summary: string | null
          timestamp: string | null
        }
        Insert: {
          application_id?: string | null
          call_route?: string | null
          call_score?: number | null
          call_status?: string | null
          candidate_name?: string | null
          conversation_id?: string | null
          created_at?: string | null
          current_ctc?: number | null
          current_location?: string | null
          expected_ctc?: number | null
          final_score?: number | null
          id?: string
          job_title?: string | null
          notice_period?: number | null
          other_job_offers?: string | null
          recording_link?: string | null
          rejection_reason?: string | null
          role_code?: string | null
          screening_outcome?: string | null
          screening_summary?: string | null
          similarity_score?: number | null
          similarity_summary?: string | null
          timestamp?: string | null
        }
        Update: {
          application_id?: string | null
          call_route?: string | null
          call_score?: number | null
          call_status?: string | null
          candidate_name?: string | null
          conversation_id?: string | null
          created_at?: string | null
          current_ctc?: number | null
          current_location?: string | null
          expected_ctc?: number | null
          final_score?: number | null
          id?: string
          job_title?: string | null
          notice_period?: number | null
          other_job_offers?: string | null
          recording_link?: string | null
          rejection_reason?: string | null
          role_code?: string | null
          screening_outcome?: string | null
          screening_summary?: string | null
          similarity_score?: number | null
          similarity_summary?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "screening_tracker_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["application_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "recruiter" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "recruiter", "viewer"],
    },
  },
} as const
