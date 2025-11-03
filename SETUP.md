# School Management System - Setup Guide

## Overview

This is a comprehensive school management system built with:
- **Frontend**: Next.js 16, React 19.2, Tailwind CSS v4, Framer Motion
- **Backend**: Supabase (PostgreSQL), Row Level Security (RLS)
- **Authentication**: Supabase Auth with JWT

## Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier available at https://supabase.com)
- Git

## Installation

### 1. Clone and Install Dependencies

\`\`\`bash
git clone <your-repo-url>
cd school-management-system
npm install
\`\`\`

### 2. Set Up Supabase Project

1. Go to https://supabase.com and create a new project
2. Wait for the project to initialize
3. Go to **Settings > API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### 4. Initialize Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `scripts/001_create_tables.sql`
5. Paste it into the SQL editor
6. Click **Run**

The schema will create:
- User profiles table with role-based access
- Students, teachers, classes, subjects tables
- Assignments, grades, attendance tracking
- Payments, blog posts, events, contact messages
- Row Level Security policies for data protection

### 5. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000

## Project Structure

\`\`\`
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── dashboard/         # Dashboard data endpoints
│   │   ├── students/          # Student management
│   │   ├── teachers/          # Teacher management
│   │   ├── classes/           # Class management
│   │   ├── assignments/       # Assignment management
│   │   ├── grades/            # Grade management
│   │   ├── attendance/        # Attendance tracking
│   │   ├── payments/          # Payment management
│   │   ├── blog/              # Blog posts
│   │   ├── events/            # Events management
│   │   └── contact/           # Contact form
│   ├── dashboard/             # Protected dashboards
│   │   ├── student/
│   │   ├── teacher/
│   │   ├── parent/
│   │   └── admin/
│   ├── login/                 # Login page
│   ├── register/              # Registration page
│   ├── forgot-password/       # Password recovery
│   ├── about/                 # About page
│   ├── academics/             # Academics page
│   ├── admissions/            # Admissions page
│   ├── gallery/               # Gallery page
│   ├── contact/               # Contact page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── components/
│   ├── navbar.tsx             # Navigation bar
│   ├── sidebar.tsx            # Dashboard sidebar
│   ├── footer.tsx             # Footer
│   ├── hero.tsx               # Hero section
│   ├── highlights.tsx         # School highlights
│   ├── testimonials.tsx       # Testimonials
│   ├── cta.tsx                # Call-to-action
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Browser client
│   │   ├── server.ts          # Server client
│   │   └── middleware.ts      # Auth middleware
│   ├── auth-context.tsx       # Auth context provider
│   └── utils.ts               # Utility functions
├── scripts/
│   └── 001_create_tables.sql  # Database schema
├── middleware.ts              # Next.js middleware
├── package.json
└── tsconfig.json
\`\`\`

## Features

### Public Pages
- **Homepage**: Hero section, highlights, testimonials, CTAs
- **About**: School mission, vision, values
- **Academics**: Programs, subjects, specializations
- **Admissions**: Application process, online form
- **Gallery**: Photo gallery of school facilities
- **Contact**: Contact form and information

### Authentication
- Email/password registration with role selection
- Email verification required
- Secure login with JWT tokens
- Password recovery (forgot password)
- Session management with cookies

### Student Dashboard
- View enrolled classes
- View assignments and due dates
- Check grades and results
- Track attendance records
- Submit assignments

### Teacher Dashboard
- Manage assigned classes
- Create and upload assignments
- Grade student submissions
- Mark attendance
- View class performance

### Parent Dashboard
- Monitor children's performance
- View grades and attendance
- Make online payments
- Communicate with teachers
- Track assignments

### Admin Dashboard
- Manage students (add, edit, delete)
- Manage teachers (add, edit, delete)
- Manage classes and subjects
- View system analytics
- Manage blog posts and events

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Dashboard Data
- `GET /api/dashboard/student` - Student dashboard data
- `GET /api/dashboard/teacher` - Teacher dashboard data
- `GET /api/dashboard/admin` - Admin dashboard data

### CRUD Operations
- `GET/POST /api/students` - Student management
- `GET/POST /api/teachers` - Teacher management
- `GET/POST /api/classes` - Class management
- `GET/POST /api/assignments` - Assignment management
- `GET/POST /api/grades` - Grade management
- `GET/POST /api/attendance` - Attendance tracking
- `GET/POST /api/payments` - Payment management
- `GET/POST /api/blog` - Blog posts
- `GET/POST /api/events` - Events
- `POST /api/contact` - Contact form

## Security Features

### Row Level Security (RLS)
- All tables have RLS enabled
- Users can only access their own data
- Teachers can access their class data
- Admins have full access
- Parents can view their children's data

### Authentication
- JWT tokens stored in secure HTTP-only cookies
- Email verification required for signup
- Password hashing with bcrypt
- Session management with Supabase Auth

### Data Protection
- CORS enabled for API routes
- Input validation on all endpoints
- SQL injection prevention via Supabase
- XSS protection via React

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com and sign in
3. Click "New Project" and select your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Google Cloud Run

## Testing

### Demo Credentials

After setting up, you can create test accounts:

1. **Student Account**
   - Email: student@example.com
   - Password: TestPassword123!
   - Role: Student

2. **Teacher Account**
   - Email: teacher@example.com
   - Password: TestPassword123!
   - Role: Teacher

3. **Parent Account**
   - Email: parent@example.com
   - Password: TestPassword123!
   - Role: Parent

4. **Admin Account**
   - Email: admin@example.com
   - Password: TestPassword123!
   - Role: Admin

## Troubleshooting

### "Unauthorized" Error
- Check that your Supabase environment variables are correct
- Verify email confirmation (check spam folder)
- Clear browser cookies and try again

### Database Connection Issues
- Verify Supabase project is active
- Check that SQL schema was executed successfully
- Ensure RLS policies are enabled

### Authentication Not Working
- Check that middleware.ts is in the root directory
- Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set
- Check browser console for errors

## Next Steps

### To Add Payment Integration (Stripe/Paystack)
1. Create account on Stripe or Paystack
2. Add API keys to environment variables
3. Create payment endpoints in `/api/payments`
4. Update parent dashboard payment section

### To Add Email Notifications
1. Set up Nodemailer or SendGrid
2. Create email templates
3. Add email sending to contact form and notifications

### To Add File Uploads
1. Set up Supabase Storage or Cloudinary
2. Create upload endpoints
3. Add file upload to assignments and documents

### To Add Real-time Features
1. Use Supabase Realtime subscriptions
2. Add WebSocket listeners for live updates
3. Implement real-time notifications

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Supabase documentation: https://supabase.com/docs
3. Check Next.js documentation: https://nextjs.org/docs
4. Open an issue on GitHub

## License

MIT License - feel free to use this project for personal or commercial purposes.
