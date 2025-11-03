# School Management System - Architecture

## System Overview

This is a full-stack school management system with a modern frontend and secure backend.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js 16 + React 19.2 + Tailwind CSS v4          │   │
│  │  - Public Pages (Homepage, About, etc.)             │   │
│  │  - Authentication Pages (Login, Register)           │   │
│  │  - Protected Dashboards (Student, Teacher, etc.)    │   │
│  │  - Framer Motion Animations                         │   │
│  │  - Light/Dark Mode                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                  API Layer (Next.js Routes)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/auth/*          - Authentication              │   │
│  │  /api/dashboard/*     - Dashboard Data              │   │
│  │  /api/students        - Student Management          │   │
│  │  /api/teachers        - Teacher Management          │   │
│  │  /api/classes         - Class Management            │   │
│  │  /api/assignments     - Assignment Management       │   │
│  │  /api/grades          - Grade Management            │   │
│  │  /api/attendance      - Attendance Tracking         │   │
│  │  /api/payments        - Payment Management          │   │
│  │  /api/blog            - Blog Posts                  │   │
│  │  /api/events          - Events                      │   │
│  │  /api/contact         - Contact Form                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ SQL
┌─────────────────────────────────────────────────────────────┐
│              Database Layer (Supabase/PostgreSQL)            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Tables:                                             │   │
│  │  - profiles (users with roles)                       │   │
│  │  - students                                          │   │
│  │  - teachers                                          │   │
│  │  - classes                                           │   │
│  │  - subjects                                          │   │
│  │  - class_subjects (many-to-many)                     │   │
│  │  - assignments                                       │   │
│  │  - assignment_submissions                           │   │
│  │  - grades                                            │   │
│  │  - attendance                                        │   │
│  │  - payments                                          │   │
│  │  - blog_posts                                        │   │
│  │  - events                                            │   │
│  │  - contact_messages                                  │   │
│  │                                                      │   │
│  │  Security:                                           │   │
│  │  - Row Level Security (RLS) on all tables            │   │
│  │  - JWT Authentication                               │   │
│  │  - Email Verification                               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Authentication Flow

\`\`\`
1. User Registration
   ├─ User fills registration form
   ├─ POST /api/auth/register
   ├─ Supabase creates auth user
   ├─ Trigger creates profile in profiles table
   ├─ Email verification sent
   └─ User redirected to login

2. User Login
   ├─ User enters email/password
   ├─ POST /api/auth/login
   ├─ Supabase validates credentials
   ├─ JWT token created
   ├─ Token stored in HTTP-only cookie
   ├─ User profile fetched from database
   └─ User redirected to dashboard

3. Protected Routes
   ├─ Middleware checks JWT token
   ├─ Token validated with Supabase
   ├─ User role checked
   ├─ RLS policies applied
   └─ Data filtered based on role
\`\`\`

## Data Access Control

### Row Level Security (RLS) Policies

**Profiles Table**
- Users can view their own profile
- Users can update their own profile
- Admins can view all profiles

**Students Table**
- Students can view their own record
- Parents can view their children's records
- Teachers can view students in their classes
- Admins can view all students

**Teachers Table**
- Teachers can view their own record
- Admins can view all teachers

**Assignments Table**
- Students can view assignments for their class
- Teachers can view/create assignments for their classes
- Admins can view all assignments

**Grades Table**
- Students can view their own grades
- Parents can view their children's grades
- Teachers can view grades for their subjects
- Admins can view all grades

**Attendance Table**
- Students can view their own attendance
- Parents can view their children's attendance
- Teachers can view attendance for their classes
- Admins can view all attendance

**Payments Table**
- Students can view their own payments
- Parents can view their children's payments
- Admins can view all payments

## API Response Format

All API endpoints follow a consistent response format:

### Success Response (200, 201)
\`\`\`json
{
  "data": { /* response data */ },
  "message": "Operation successful"
}
\`\`\`

### Error Response (400, 401, 403, 500)
\`\`\`json
{
  "error": "Error message describing what went wrong"
}
\`\`\`

## Database Schema Relationships

\`\`\`
profiles (auth.users)
├── students (1:many)
│   ├── grades (1:many)
│   ├── attendance (1:many)
│   ├── assignment_submissions (1:many)
│   └── payments (1:many)
├── teachers (1:many)
│   ├── classes (1:many)
│   ├── class_subjects (1:many)
│   ├── assignments (1:many)
│   └── grades (1:many)
├── blog_posts (1:many)
└── events (1:many)

classes
├── students (many:many via students.class_id)
├── subjects (many:many via class_subjects)
├── teachers (1:many via class_subjects)
└── attendance (1:many)

subjects
├── class_subjects (1:many)
├── assignments (1:many)
└── grades (1:many)

assignments
├── class_subjects (many:1)
└── assignment_submissions (1:many)
\`\`\`

## Middleware Flow

\`\`\`
Request
  ↓
middleware.ts
  ├─ Check if route is public
  ├─ If public → Allow
  ├─ If protected → Check JWT
  ├─ Validate token with Supabase
  ├─ Refresh token if needed
  ├─ Set cookies
  └─ Allow/Redirect to login
\`\`\`

## Component Hierarchy

\`\`\`
RootLayout
├── AuthProvider
│   ├── Navbar (with theme toggle)
│   ├── Main Content
│   │   ├── Public Pages
│   │   │   ├── HomePage
│   │   │   ├── AboutPage
│   │   │   ├── AcademicsPage
│   │   │   ├── AdmissionsPage
│   │   │   ├── GalleryPage
│   │   │   └── ContactPage
│   │   ├── Auth Pages
│   │   │   ├── LoginPage
│   │   │   ├── RegisterPage
│   │   │   └── ForgotPasswordPage
│   │   └── Protected Dashboards
│   │       ├── StudentDashboard
│   │       │   ├── ClassesPage
│   │       │   ├── AssignmentsPage
│   │       │   ├── ResultsPage
│   │       │   └── AttendancePage
│   │       ├── TeacherDashboard
│   │       │   ├── ClassesPage
│   │       │   ├── GradingPage
│   │       │   └── AssignmentsPage
│   │       ├── ParentDashboard
│   │       │   ├── ChildrenPage
│   │       │   └── PaymentsPage
│   │       └── AdminDashboard
│   │           ├── StudentsPage
│   │           ├── TeachersPage
│   │           ├── ClassesPage
│   │           └── AnalyticsPage
│   └── Footer
\`\`\`

## Deployment Architecture

### Frontend Deployment (Vercel)
\`\`\`
GitHub Repository
  ↓
Vercel CI/CD
  ├─ Build Next.js app
│  ├─ Run tests
│  ├─ Deploy to CDN
│  └─ Set environment variables
  ↓
Vercel Edge Network (Global)
  ├─ Serve static assets
  ├─ Run API routes
  └─ Handle authentication
\`\`\`

### Database Deployment (Supabase)
\`\`\`
Supabase Cloud
  ├─ PostgreSQL Database
  ├─ Authentication Service
  ├─ Row Level Security
  ├─ Real-time Subscriptions
  └─ Backup & Recovery
\`\`\`

## Security Considerations

1. **Authentication**
   - JWT tokens in HTTP-only cookies
   - Email verification required
   - Password hashing with bcrypt
   - Session expiration

2. **Authorization**
   - Role-based access control (RBAC)
   - Row Level Security (RLS) on database
   - API endpoint permission checks
   - Middleware route protection

3. **Data Protection**
   - HTTPS/TLS encryption in transit
   - Encrypted data at rest (Supabase)
   - SQL injection prevention
   - XSS protection via React

4. **API Security**
   - CORS configuration
   - Rate limiting (can be added)
   - Input validation
   - Error handling without exposing internals

## Performance Optimization

1. **Frontend**
   - Code splitting with Next.js
   - Image optimization
   - CSS-in-JS with Tailwind
   - Lazy loading components

2. **Backend**
   - Database indexing on frequently queried columns
   - Connection pooling via Supabase
   - Query optimization
   - Caching strategies

3. **Deployment**
   - CDN for static assets
   - Edge functions for API routes
   - Database replication for redundancy
   - Automatic scaling

## Monitoring & Logging

1. **Frontend**
   - Browser console errors
   - Vercel Analytics
   - Error tracking (can add Sentry)

2. **Backend**
   - Supabase logs
   - API error tracking
   - Database query logs
   - Authentication logs

## Future Enhancements

1. **Payment Integration**
   - Stripe or Paystack integration
   - Invoice generation
   - Payment history

2. **Email Notifications**
   - Assignment reminders
   - Grade notifications
   - Event announcements
   - Payment receipts

3. **File Management**
   - Document uploads
   - Assignment submissions
   - Report generation
   - File storage (Supabase Storage or Cloudinary)

4. **Real-time Features**
   - Live notifications
   - Chat system
   - Real-time grade updates
   - Live class attendance

5. **Advanced Analytics**
   - Student performance trends
   - Class analytics
   - Teacher performance metrics
   - System usage statistics

6. **Mobile App**
   - React Native app
   - Offline support
   - Push notifications
   - Mobile-optimized UI
