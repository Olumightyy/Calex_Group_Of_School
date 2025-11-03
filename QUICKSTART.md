# Quick Start Guide

Get the School Management System up and running in 5 minutes.

## Step 1: Clone & Install (1 min)

\`\`\`bash
git clone <repository-url>
cd school-management-system
npm install
\`\`\`

## Step 2: Set Up Supabase (2 min)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to Settings > API to find your credentials
4. Copy the **Project URL** and **Anon Key**

## Step 3: Configure Environment (1 min)

Create `.env.local` in the root directory:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

## Step 4: Set Up Database (1 min)

1. In Supabase dashboard, go to SQL Editor
2. Click "New Query"
3. Copy all SQL from `scripts/001_create_schema.sql`
4. Paste and click "Run"

## Step 5: Start Development (1 min)

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## Login with Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | student@example.com | password123 |
| Teacher | teacher@example.com | password123 |
| Parent | parent@example.com | password123 |
| Admin | admin@example.com | password123 |

## What's Included

✅ Complete authentication system
✅ 4 role-based dashboards
✅ Public website pages
✅ Database with RLS security
✅ API endpoints for all features
✅ Responsive design
✅ Dark mode support
✅ Framer Motion animations

## Next Steps

1. **Customize branding** - Update colors in `app/globals.css`
2. **Add your content** - Update text in public pages
3. **Configure email** - Set up email notifications
4. **Add payment gateway** - Integrate Stripe or Paystack
5. **Deploy** - Push to Vercel

## Troubleshooting

### Port 3000 already in use?
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Database connection error?
- Check Supabase project is active
- Verify environment variables are correct
- Check network connectivity

### Login not working?
- Ensure database migration ran successfully
- Check Supabase Auth settings
- Verify email confirmation is enabled

## File Structure Quick Reference

\`\`\`
app/
├── api/              # Backend API routes
├── dashboard/        # Protected pages
├── login/            # Auth pages
└── [public pages]/   # Homepage, About, etc.

components/
├── navbar.tsx        # Navigation
├── sidebar.tsx       # Dashboard sidebar
└── ui/               # UI components

lib/
├── auth-context.tsx  # Auth logic
└── supabase/         # Database clients

scripts/
└── 001_create_schema.sql  # Database setup
\`\`\`

## Common Tasks

### Add a new student
1. Go to Admin Dashboard
2. Click "Students" > "Add Student"
3. Fill in details and submit

### Create an assignment
1. Go to Teacher Dashboard
2. Click "Assignments" > "Create"
3. Fill in details and upload file

### View grades
1. Go to Student Dashboard
2. Click "Results"
3. View grades by subject

### Make a payment
1. Go to Parent Dashboard
2. Click "Payments"
3. Select payment and proceed

## Need Help?

- Check `SETUP.md` for detailed setup
- Check `README.md` for full documentation
- Review API endpoints in `README.md`
- Check browser console for errors

## Ready to Deploy?

See deployment instructions in `README.md`

---

**Happy coding! 🚀**
