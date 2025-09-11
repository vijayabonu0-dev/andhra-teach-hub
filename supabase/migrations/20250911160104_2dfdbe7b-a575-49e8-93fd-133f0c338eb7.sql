-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('teacher', 'school', 'admin');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.user_role NOT NULL DEFAULT 'teacher',
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  roll_no TEXT,
  district TEXT,
  address TEXT,
  date_of_birth DATE,
  category TEXT,
  profile_completion INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create schools table
CREATE TABLE public.schools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  school_name TEXT NOT NULL,
  school_type TEXT, -- 'government', 'aided', 'zp'
  principal_name TEXT,
  registration_number TEXT,
  established_year INTEGER,
  total_teachers INTEGER DEFAULT 0,
  district TEXT NOT NULL,
  address TEXT NOT NULL,
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create education table
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  subject TEXT,
  institution TEXT NOT NULL,
  year_completed INTEGER,
  percentage TEXT,
  grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create experience table
CREATE TABLE public.work_experience (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  position TEXT NOT NULL,
  school_name TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_type TEXT DEFAULT 'subject', -- 'subject', 'technical', 'language'
  proficiency_level TEXT DEFAULT 'intermediate', -- 'beginner', 'intermediate', 'advanced', 'expert'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(profile_id, skill_name)
);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT,
  description TEXT,
  requirements TEXT[],
  experience_required TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  location TEXT NOT NULL,
  district TEXT NOT NULL,
  job_type TEXT DEFAULT 'full-time', -- 'full-time', 'part-time', 'contract'
  application_deadline DATE,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied', -- 'applied', 'under_review', 'shortlisted', 'interview_scheduled', 'rejected', 'hired'
  cover_letter TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(job_id, applicant_id)
);

-- Create saved jobs table
CREATE TABLE public.saved_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Schools and admins can view teacher profiles" ON public.profiles
  FOR SELECT USING (
    role = 'teacher' OR 
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('school', 'admin'))
  );

-- RLS Policies for schools
CREATE POLICY "Anyone can view verified schools" ON public.schools
  FOR SELECT USING (is_verified = TRUE);

CREATE POLICY "School owners can manage their schools" ON public.schools
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = school_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all schools" ON public.schools
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for education
CREATE POLICY "Users can manage their own education" ON public.education
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND user_id = auth.uid())
  );

CREATE POLICY "Schools can view teacher education" ON public.education
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND role = 'teacher') AND
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('school', 'admin'))
  );

-- RLS Policies for work_experience
CREATE POLICY "Users can manage their own experience" ON public.work_experience
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND user_id = auth.uid())
  );

CREATE POLICY "Schools can view teacher experience" ON public.work_experience
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND role = 'teacher') AND
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('school', 'admin'))
  );

-- RLS Policies for skills
CREATE POLICY "Users can manage their own skills" ON public.skills
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND user_id = auth.uid())
  );

CREATE POLICY "Schools can view teacher skills" ON public.skills
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND role = 'teacher') AND
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('school', 'admin'))
  );

-- RLS Policies for certifications
CREATE POLICY "Users can manage their own certifications" ON public.certifications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND user_id = auth.uid())
  );

CREATE POLICY "Schools can view teacher certifications" ON public.certifications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = profile_id AND role = 'teacher') AND
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('school', 'admin'))
  );

-- RLS Policies for jobs
CREATE POLICY "Anyone can view active jobs" ON public.jobs
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Schools can manage their own jobs" ON public.jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.schools s 
      JOIN public.profiles p ON s.profile_id = p.id 
      WHERE s.id = school_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all jobs" ON public.jobs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for job_applications
CREATE POLICY "Teachers can view their own applications" ON public.job_applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = applicant_id AND user_id = auth.uid())
  );

CREATE POLICY "Teachers can create applications" ON public.job_applications
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = applicant_id AND user_id = auth.uid() AND role = 'teacher')
  );

CREATE POLICY "Schools can view applications for their jobs" ON public.job_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.jobs j
      JOIN public.schools s ON j.school_id = s.id
      JOIN public.profiles p ON s.profile_id = p.id
      WHERE j.id = job_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Schools can update applications for their jobs" ON public.job_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.jobs j
      JOIN public.schools s ON j.school_id = s.id
      JOIN public.profiles p ON s.profile_id = p.id
      WHERE j.id = job_id AND p.user_id = auth.uid()
    )
  );

-- RLS Policies for saved_jobs
CREATE POLICY "Users can manage their own saved jobs" ON public.saved_jobs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id AND user_id = auth.uid())
  );

-- Create functions and triggers for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON public.schools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to calculate profile completion
CREATE OR REPLACE FUNCTION public.calculate_profile_completion(profile_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  completion_score INTEGER := 0;
  education_count INTEGER;
  experience_count INTEGER;
  skills_count INTEGER;
  profile_rec RECORD;
BEGIN
  -- Get profile data
  SELECT * INTO profile_rec FROM public.profiles WHERE id = profile_uuid;
  
  IF profile_rec IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Basic info (40 points total)
  IF profile_rec.first_name IS NOT NULL AND profile_rec.first_name != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_rec.last_name IS NOT NULL AND profile_rec.last_name != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_rec.phone IS NOT NULL AND profile_rec.phone != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_rec.district IS NOT NULL AND profile_rec.district != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_rec.address IS NOT NULL AND profile_rec.address != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_rec.date_of_birth IS NOT NULL THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_rec.category IS NOT NULL AND profile_rec.category != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF profile_rec.avatar_url IS NOT NULL AND profile_rec.avatar_url != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  -- Education (25 points)
  SELECT COUNT(*) INTO education_count FROM public.education WHERE profile_id = profile_uuid;
  IF education_count >= 1 THEN
    completion_score := completion_score + 25;
  END IF;
  
  -- Experience (20 points)
  SELECT COUNT(*) INTO experience_count FROM public.work_experience WHERE profile_id = profile_uuid;
  IF experience_count >= 1 THEN
    completion_score := completion_score + 20;
  END IF;
  
  -- Skills (15 points)
  SELECT COUNT(*) INTO skills_count FROM public.skills WHERE profile_id = profile_uuid;
  IF skills_count >= 3 THEN
    completion_score := completion_score + 15;
  ELSIF skills_count >= 1 THEN
    completion_score := completion_score + 10;
  END IF;
  
  RETURN completion_score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_district ON public.profiles(district);
CREATE INDEX idx_schools_district ON public.schools(district);
CREATE INDEX idx_jobs_district ON public.jobs(district);
CREATE INDEX idx_jobs_subject ON public.jobs(subject);
CREATE INDEX idx_jobs_active ON public.jobs(is_active);
CREATE INDEX idx_jobs_deadline ON public.jobs(application_deadline);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);
CREATE INDEX idx_education_profile_id ON public.education(profile_id);
CREATE INDEX idx_work_experience_profile_id ON public.work_experience(profile_id);
CREATE INDEX idx_skills_profile_id ON public.skills(profile_id);
CREATE INDEX idx_certifications_profile_id ON public.certifications(profile_id);