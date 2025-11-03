# EduHub - School Management System

A modern, comprehensive school management system built with Next.js, React, Tailwind CSS, and Supabase.

## Features

✨ **Modern UI/UX**
- Responsive design (mobile-first)
- Light/dark mode toggle
- Smooth animations with Framer Motion
- Professional color scheme

👥 **Role-Based Access**
- Students: View classes, assignments, grades, attendance
- Teachers: Manage classes, create assignments, grade students
- Parents: Monitor children's performance, make payments
- Admins: Manage all users, classes, and view analytics

🔐 **Security**
- Supabase authentication with JWT
- Row Level Security (RLS) on all tables
- Email verification required
- Secure session management

📊 **Comprehensive Features**
- Student management and enrollment
- Class and subject management
- Assignment creation and submission
- Grade tracking and reporting
- Attendance management
- Payment processing
- Blog posts and events
- Contact form with email notifications

## Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <repo-url>
   cd school-management-system
   npm install
   \`\`\`

2. **Set up Supabase**
   - Create a project at https://supabase.com
   - Copy your API keys to `.env.local`
   - Run the SQL schema from `scripts/001_create_tables.sql`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open http://localhost:3000**

## Documentation

See [SETUP.md](./SETUP.md) for detailed setup instructions and troubleshooting.

## Tech Stack

- **Frontend**: Next.js 16, React 19.2, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui, Radix UI
- **Forms**: React Hook Form, Zod

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
├── components/             # Reusable React components
├── lib/                    # Utility functions and contexts
├── scripts/                # Database schema and migrations
├── public/                 # Static assets
└── middleware.ts           # Authentication middleware
\`\`\`

## API Routes

All API routes are protected with authentication and role-based access control.

- `/api/auth/*` - Authentication endpoints
- `/api/dashboard/*` - Dashboard data
- `/api/students` - Student management
- `/api/teachers` - Teacher management
- `/api/classes` - Class management
- `/api/assignments` - Assignment management
- `/api/grades` - Grade management
- `/api/attendance` - Attendance tracking
- `/api/payments` - Payment management
- `/api/blog` - Blog posts
- `/api/events` - Events
- `/api/contact` - Contact form

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourname%2Fschool-management-system)

Or deploy to any platform that supports Next.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Support

For help and support, please refer to [SETUP.md](./SETUP.md) or open an issue on GitHub.
