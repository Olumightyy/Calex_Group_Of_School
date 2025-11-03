# Database Migration Guide

## Overview

This guide explains how to set up the database schema for the School Management System using Supabase.

## Prerequisites

- Supabase account (free tier available at supabase.com)
- Active Supabase project
- Access to Supabase SQL Editor

## Step-by-Step Migration

### Step 1: Access Supabase SQL Editor

1. Log in to your Supabase dashboard
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"

### Step 2: Copy the Migration Script

Open `scripts/001_create_schema.sql` and copy all the SQL code.

### Step 3: Paste and Execute

1. Paste the SQL code into the Supabase SQL Editor
2. Click the "Run" button (or press Ctrl+Enter)
3. Wait for the migration to complete

### Step 4: Verify Tables

After migration completes:

1. Go to "Table Editor" in Supabase
2. You should see all 13 tables:
   - profiles
   - students
   - teachers
   - classes
   - subjects
   - assignments
   - assignment_submissions
   - grades
   - attendance
   - payments
   - blog_posts
   - events
   - contact_messages

## What Gets Created

### Tables

#### 1. profiles
- Extends auth.users
- Stores user profile information
- Fields: id, first_name, last_name, role, avatar_url, phone, address

#### 2. students
- Student records
- Fields: id, user_id, enrollment_number, class_id, parent_id, date_of_birth, gender

#### 3. teachers
- Teacher records
- Fields: id, user_id, employee_id, specialization, qualification, hire_date

#### 4. classes
- Class information
- Fields: id, name, grade_level, teacher_id, capacity

#### 5. subjects
- Subject details
- Fields: id, name, code, teacher_id, class_id

#### 6. assignments
- Assignment details
- Fields: id, title, description, subject_id, class_id, teacher_id, due_date, file_url

#### 7. assignment_submissions
- Student submissions
- Fields: id, assignment_id, student_id, submission_url, submitted_at, grade, feedback

#### 8. grades
- Student grades
- Fields: id, student_id, subject_id, score, term, academic_year

#### 9. attendance
- Attendance records
- Fields: id, student_id, class_id, date, status, remarks

#### 10. payments
- Payment records
- Fields: id, student_id, parent_id, amount, description, status, payment_method, reference_id, due_date, paid_date

#### 11. blog_posts
- Blog articles
- Fields: id, title, content, author_id, featured_image, published

#### 12. events
- School events
- Fields: id, title, description, event_date, location, image_url, created_by

#### 13. contact_messages
- Contact form submissions
- Fields: id, name, email, subject, message, status

### Security Features

#### Row Level Security (RLS)
All tables have RLS enabled with policies:

- **profiles**: Users can only view/edit their own profile
- **students**: Students see own data, teachers see class data, admins see all
- **teachers**: Teachers see own data, admins see all
- **classes**: Public read, admin write
- **assignments**: Public read, teachers can create
- **grades**: Students/parents see own, teachers see class
- **attendance**: Students/parents see own, teachers see class
- **payments**: Users see own, admins see all
- **blog_posts**: Published posts public, admins see all
- **events**: Public read, admin write
- **contact_messages**: Anyone can submit, admins can view

#### Triggers
- Automatic profile creation on user signup
- Timestamps on all tables

## Troubleshooting

### Migration Failed

**Error: "relation already exists"**
- Tables already exist from previous migration
- Drop tables first: `DROP TABLE IF EXISTS table_name CASCADE;`
- Or create new Supabase project

**Error: "permission denied"**
- Ensure you're using admin credentials
- Check Supabase project permissions

**Error: "syntax error"**
- Check SQL syntax
- Ensure all quotes are correct
- Try running smaller sections

### Tables Not Appearing

1. Refresh the page
2. Check SQL Editor for error messages
3. Verify migration completed successfully
4. Check table visibility settings

### RLS Policies Not Working

1. Verify RLS is enabled on tables
2. Check policy conditions
3. Ensure user is authenticated
4. Check user role in profiles table

## Verification Checklist

After migration, verify:

- [ ] All 13 tables exist
- [ ] All columns are present
- [ ] RLS is enabled on all tables
- [ ] Policies are created
- [ ] Trigger for profile creation exists
- [ ] Foreign keys are set up
- [ ] Indexes are created

## Rollback

To rollback the migration:

\`\`\`sql
-- Drop all tables (WARNING: This deletes all data)
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS grades CASCADE;
DROP TABLE IF EXISTS assignment_submissions CASCADE;
DROP TABLE IF EXISTS assignments CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
\`\`\`

## Testing the Migration

### Create Test Data

\`\`\`sql
-- Insert test student
INSERT INTO public.students (user_id, enrollment_number, class_id)
VALUES ('user-id-here', 'STU001', 'class-id-here');

-- Insert test teacher
INSERT INTO public.teachers (user_id, employee_id, specialization)
VALUES ('user-id-here', 'TCH001', 'Mathematics');

-- Insert test class
INSERT INTO public.classes (name, grade_level, capacity)
VALUES ('Class 10A', 10, 40);
\`\`\`

### Query Test Data

\`\`\`sql
-- View all students
SELECT * FROM public.students;

-- View all teachers
SELECT * FROM public.teachers;

-- View all classes
SELECT * FROM public.classes;
\`\`\`

## Performance Optimization

### Indexes
The migration creates indexes on:
- Foreign keys
- Frequently queried columns
- Date columns

### Query Optimization
- Use specific columns in SELECT
- Filter with WHERE clauses
- Use LIMIT for large datasets
- Join tables efficiently

## Backup and Recovery

### Automatic Backups
Supabase automatically backs up your database:
- Daily backups (free tier)
- 7-day retention
- Access in Settings > Backups

### Manual Backup
Export data from Supabase:
1. Go to Settings > Backups
2. Click "Download" on a backup
3. Save the SQL file

### Restore from Backup
1. Create new query in SQL Editor
2. Paste backup SQL
3. Execute

## Next Steps

1. **Verify migration** - Check all tables exist
2. **Create demo data** - Add test records
3. **Test RLS policies** - Verify security
4. **Start application** - Run `npm run dev`
5. **Test authentication** - Use demo credentials

## Support

If you encounter issues:

1. Check Supabase documentation
2. Review error messages in SQL Editor
3. Check browser console for errors
4. Verify environment variables
5. Contact Supabase support

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Migration Complete! Ready to use the School Management System.**
