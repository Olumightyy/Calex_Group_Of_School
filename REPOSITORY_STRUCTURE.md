# Repository Structure

This document provides a comprehensive overview of the repository's file and folder structure.

```
.
├── API_DOCUMENTATION.md
├── ARCHITECTURE.md
├── COMPLETION_REPORT.md
├── DATABASE_MIGRATION.md
├── DEPLOYMENT.md
├── PROJECT_SUMMARY.md
├── QUICKSTART.md
├── README.md
├── SETUP.md
├── app
│   ├── about
│   │   └── page.tsx
│   ├── academics
│   │   └── page.tsx
│   ├── admissions
│   │   └── page.tsx
│   ├── api
│   │   ├── assignments
│   │   │   └── route.ts
│   │   ├── attendance
│   │   │   └── route.ts
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── route.ts
│   │   │   ├── logout
│   │   │   │   └── route.ts
│   │   │   └── register
│   │   │       └── route.ts
│   │   ├── blog
│   │   │   └── route.ts
│   │   ├── classes
│   │   │   └── route.ts
│   │   ├── contact
│   │   │   └── route.ts
│   │   ├── dashboard
│   │   │   ├── admin
│   │   │   │   └── route.ts
│   │   │   ├── student
│   │   │   │   └── route.ts
│   │   │   └── teacher
│   │   │       └── route.ts
│   │   ├── events
│   │   │   └── route.ts
│   │   ├── grades
│   │   │   └── route.ts
│   │   ├── payments
│   │   │   └── route.ts
│   │   ├── students
│   │   │   └── route.ts
│   │   └── teachers
│   │       └── route.ts
│   ├── contact
│   │   └── page.tsx
│   ├── dashboard
│   │   ├── admin
│   │   │   ├── analytics
│   │   │   │   └── page.tsx
│   │   │   ├── classes
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   ├── students
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   └── teachers
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   ├── parent
│   │   │   ├── children
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   └── payments
│   │   │       └── page.tsx
│   │   ├── student
│   │   │   ├── assignments
│   │   │   │   └── page.tsx
│   │   │   ├── attendance
│   │   │   │   └── page.tsx
│   │   │   ├── classes
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   └── results
│   │   │       └── page.tsx
│   │   └── teacher
│   │       ├── classes
│   │       │   └── page.tsx
│   │       ├── grading
│   │       │   └── page.tsx
│   │       └── page.tsx
│   ├── forgot-password
│   │   └── page.tsx
│   ├── gallery
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── login
│   │   └── page.tsx
│   ├── page.tsx
│   └── register
│       └── page.tsx
├── components
│   ├── Providers.tsx
│   ├── cta.tsx
│   ├── dashboard-header.tsx
│   ├── dashboard-sidebar.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── highlights.tsx
│   ├── navbar.tsx
│   ├── testimonials.tsx
│   ├── theme-provider.tsx
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button-group.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── empty.tsx
│       ├── field.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-group.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── item.tsx
│       ├── kbd.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── spinner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.tsx
│       └── use-toast.ts
├── components.json
├── hooks
│   ├── use-mobile.ts
│   ├── use-theme.ts
│   └── use-toast.ts
├── lib
│   ├── api-client.ts
│   ├── auth-context.tsx
│   ├── constants.ts
│   ├── supabase
│   │   ├── client.ts
│   │   ├── middleware.ts
│   │   └── server.ts
│   └── utils.ts
├── middleware.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── modern-classroom.png
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
├── scripts
│   ├── 001_create_schema.sql
│   ├── 001_create_tables.sql
│   └── init-db.sh
├── styles
│   └── globals.css
└── tsconfig.json
```
