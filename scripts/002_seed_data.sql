-- ============================================
-- SEED DATA FOR TESTING
-- Run this AFTER creating test users
-- ============================================

-- Insert Subjects
INSERT INTO public.subjects (name, code, description) VALUES
('Mathematics', 'MATH101', 'Core Mathematics'),
('English Language', 'ENG101', 'English Language and Literature'),
('Science', 'SCI101', 'General Science'),
('Social Studies', 'SS101', 'Social Studies and History'),
('Computer Science', 'CS101', 'Introduction to Computing'),
('Physical Education', 'PE101', 'Physical Education and Sports')
ON CONFLICT (name) DO NOTHING;

-- Insert Classes
INSERT INTO public.classes (name, grade_level, section, academic_year) VALUES
('Grade 7A', 7, 'A', '2024/2025'),
('Grade 8B', 8, 'B', '2024/2025'),
('Grade 9A', 9, 'A', '2024/2025')
ON CONFLICT (name, grade_level, section, academic_year) DO NOTHING;

-- After registering users, get their IDs and run the rest:
-- SELECT id, email, raw_user_meta_data->>'role' as role FROM auth.users;