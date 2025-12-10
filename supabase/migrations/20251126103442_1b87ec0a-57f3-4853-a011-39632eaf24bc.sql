-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'recruiter', 'viewer');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, role)
);

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Jobs table
CREATE TABLE public.jobs (
    role_code TEXT PRIMARY KEY,
    role_name TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    location TEXT,
    jd_context TEXT,
    current_updates TEXT,
    minimum_experience NUMERIC,
    duration TEXT,
    candidate_monthly_ctc NUMERIC,
    skills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidates table
CREATE TABLE public.candidates (
    application_id TEXT PRIMARY KEY,
    role_code TEXT REFERENCES public.jobs(role_code) ON DELETE SET NULL,
    candidate_name TEXT NOT NULL,
    candidate_email TEXT,
    candidate_contact_number TEXT,
    candidate_experience_years NUMERIC,
    candidate_relevant_years NUMERIC,
    notice_period_days INTEGER,
    current_ctc_lpa NUMERIC,
    expected_ctc_min NUMERIC,
    current_location TEXT,
    resume_url TEXT,
    screening_status TEXT DEFAULT 'pending',
    profile_status TEXT DEFAULT 'new',
    rejection_reason TEXT,
    poc TEXT,
    tag TEXT,
    new_or_repeat TEXT DEFAULT 'new',
    job_applied TEXT,
    skills TEXT[],
    required_documents TEXT[],
    wamid TEXT,
    row_id BIGSERIAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Screening batch queue table
CREATE TABLE public.screening_batch_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT REFERENCES public.candidates(application_id) ON DELETE CASCADE,
    role_code TEXT,
    status TEXT DEFAULT 'queued',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Screening tracker table
CREATE TABLE public.screening_tracker (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    application_id TEXT REFERENCES public.candidates(application_id) ON DELETE CASCADE,
    candidate_name TEXT,
    role_code TEXT,
    job_title TEXT,
    screening_outcome TEXT,
    screening_summary TEXT,
    call_status TEXT,
    call_score NUMERIC,
    similarity_score NUMERIC,
    final_score NUMERIC,
    conversation_id TEXT,
    recording_link TEXT,
    notice_period INTEGER,
    current_ctc NUMERIC,
    expected_ctc NUMERIC,
    other_job_offers TEXT,
    current_location TEXT,
    call_route TEXT,
    similarity_summary TEXT,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Screening questions table
CREATE TABLE public.screening_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT REFERENCES public.candidates(application_id) ON DELETE CASCADE,
    role_code TEXT,
    question_prompt TEXT NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Screening responses table
CREATE TABLE public.screening_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    application_id TEXT REFERENCES public.candidates(application_id) ON DELETE CASCADE,
    role_code TEXT,
    mobile_number TEXT,
    candidate_name TEXT,
    transcript TEXT,
    summary TEXT,
    audio_url TEXT,
    call_duration INTEGER,
    raw_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CV matching table
CREATE TABLE public.cv_matching (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT REFERENCES public.candidates(application_id) ON DELETE CASCADE,
    role_code TEXT,
    score NUMERIC,
    missing_skills TEXT,
    extracted_skills TEXT,
    jd_summary TEXT,
    resume_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics daily table
CREATE TABLE public.analytics_daily (
    date DATE PRIMARY KEY,
    total_candidates INTEGER DEFAULT 0,
    total_screened INTEGER DEFAULT 0,
    avg_score NUMERIC,
    role_wise_counts JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table (optional)
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT REFERENCES public.candidates(application_id) ON DELETE CASCADE,
    document_type TEXT,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screening_batch_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screening_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screening_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screening_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_matching ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles (admin only)
CREATE POLICY "Admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- RLS Policies for jobs (admins and recruiters can manage)
CREATE POLICY "Authenticated users can view jobs"
ON public.jobs
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and recruiters can insert jobs"
ON public.jobs
FOR INSERT
TO authenticated
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

CREATE POLICY "Admins and recruiters can update jobs"
ON public.jobs
FOR UPDATE
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

CREATE POLICY "Admins can delete jobs"
ON public.jobs
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for candidates (admins and recruiters can manage)
CREATE POLICY "Authenticated users can view candidates"
ON public.candidates
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and recruiters can insert candidates"
ON public.candidates
FOR INSERT
TO authenticated
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

CREATE POLICY "Admins and recruiters can update candidates"
ON public.candidates
FOR UPDATE
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

CREATE POLICY "Admins can delete candidates"
ON public.candidates
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for screening_batch_queue
CREATE POLICY "Authenticated users can view screening queue"
ON public.screening_batch_queue
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and recruiters can manage screening queue"
ON public.screening_batch_queue
FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
)
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

-- RLS Policies for screening_tracker
CREATE POLICY "Authenticated users can view screening tracker"
ON public.screening_tracker
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and recruiters can manage screening tracker"
ON public.screening_tracker
FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
)
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

-- RLS Policies for screening_questions
CREATE POLICY "Authenticated users can view screening questions"
ON public.screening_questions
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and recruiters can manage screening questions"
ON public.screening_questions
FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
)
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

-- RLS Policies for screening_responses
CREATE POLICY "Authenticated users can view screening responses"
ON public.screening_responses
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and recruiters can manage screening responses"
ON public.screening_responses
FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
)
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

-- RLS Policies for cv_matching
CREATE POLICY "Authenticated users can view cv matching"
ON public.cv_matching
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and recruiters can manage cv matching"
ON public.cv_matching
FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
)
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

-- RLS Policies for analytics_daily
CREATE POLICY "Authenticated users can view analytics"
ON public.analytics_daily
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage analytics"
ON public.analytics_daily
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for documents
CREATE POLICY "Authenticated users can view documents"
ON public.documents
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins and recruiters can manage documents"
ON public.documents
FOR ALL
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
)
WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'recruiter')
);

-- Create indexes for better performance
CREATE INDEX idx_candidates_role_code ON public.candidates(role_code);
CREATE INDEX idx_candidates_screening_status ON public.candidates(screening_status);
CREATE INDEX idx_screening_tracker_application_id ON public.screening_tracker(application_id);
CREATE INDEX idx_screening_tracker_role_code ON public.screening_tracker(role_code);
CREATE INDEX idx_screening_batch_queue_status ON public.screening_batch_queue(status);
CREATE INDEX idx_cv_matching_application_id ON public.cv_matching(application_id);