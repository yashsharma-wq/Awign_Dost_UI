-- Add JD_Mapping column to AEX_Candidate_Data table
ALTER TABLE public."AEX_Candidate_Data"
ADD COLUMN "JD_Mapping" text NULL DEFAULT 'NOT STARTED'::text;