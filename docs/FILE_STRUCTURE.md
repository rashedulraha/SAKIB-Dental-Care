# Complete Project File & Folder Structure
## Sakib Dental Care — Unified Full-Stack Architecture

---

## 1. Directory Tree Overview

Below is the comprehensive file tree for the full-stack Sakib Dental Care application, illustrating the seamless integration between the existing public landing page, the Next.js 15 App Router backend APIs, Prisma database models, and the centralized Admin Dashboard.

```
SAKIB-Dental-Care/
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── .env.local
│
├── prisma/                                  # Database Schema & Migrations
│   ├── schema.prisma                        # PostgreSQL schema definition
│   ├── seed.ts                              # Initial data seed (migrated from src/data/*.ts)
│   └── migrations/                          # Prisma migration version history
│
├── docs/                                    # System Documentation & Specifications
│   ├── PRD.md                               # Product Requirements Document
│   ├── ARCHITECTURE.md                      # System Architecture & Technical Design
│   ├── DATABASE.md                          # Database Schema, Models & Data Flow
│   ├── API.md                               # API Specification & Route Handlers
│   ├── AUTHENTICATION.md                    # Auth, Roles, Permissions & Security
│   ├── ADMIN_DASHBOARD.md                   # Centralized Admin Portal Specification
│   ├── FILE_STRUCTURE.md                    # Organized Project Folder Structure
│   ├── SECURITY.md                          # Healthcare Data Privacy & Security Blueprint
│   ├── DEPLOYMENT_ENV.md                    # Environment Variables & Deployment Guide
│   └── IMPLEMENTATION_PLAN.md               # Step-by-Step Backend Development Roadmap
│
├── public/                                  # Static Public Assets
│   ├── icon.svg                             # Clinic Brand Favicon
│   └── fonts/                               # Custom Typography (Hind Siliguri)
│       └── hind-siliguri/
│           ├── HindSiliguri-Light.ttf
│           ├── HindSiliguri-Regular.ttf
│           ├── HindSiliguri-Medium.ttf
│           ├── HindSiliguri-SemiBold.ttf
│           └── HindSiliguri-Bold.ttf
│
└── src/
    ├── middleware.ts                        # Edge Middleware (Auth, Security, Rate Limiting)
    │
    ├── app/                                 # Next.js 15 App Router
    │   ├── layout.tsx                       # Root Layout (Fonts, Context Providers, Backgrounds)
    │   ├── page.tsx                         # Public Landing Page (Composed Sections)
    │   ├── not-found.tsx                    # Global 404 Error Page
    │   ├── error.tsx                        # Global 500 Error Boundary
    │   │
    │   ├── api/                             # Backend REST Route Handlers
    │   │   ├── auth/                        # Staff Authentication
    │   │   │   ├── login/route.ts           # POST /api/auth/login
    │   │   │   ├── logout/route.ts          # POST /api/auth/logout
    │   │   │   └── me/route.ts              # GET /api/auth/me
    │   │   │
    │   │   ├── appointments/                # Public Appointment Actions
    │   │   │   ├── route.ts                 # POST /api/appointments (Book Serial)
    │   │   │   └── track/route.ts           # GET /api/appointments/track (Serial Lookup)
    │   │   │
    │   │   ├── public/                      # Public Cached Content APIs
    │   │   │   ├── branches/route.ts        # GET /api/public/branches
    │   │   │   ├── services/route.ts        # GET /api/public/services
    │   │   │   ├── symptoms/route.ts        # GET /api/public/symptoms
    │   │   │   ├── hero-slides/route.ts     # GET /api/public/hero-slides
    │   │   │   ├── faqs/route.ts            # GET /api/public/faqs
    │   │   │   └── settings/route.ts        # GET /api/public/settings
    │   │   │
    │   │   └── admin/                       # Protected Administrative APIs
    │   │       ├── analytics/
    │   │       │   └── overview/route.ts    # GET /api/admin/analytics/overview
    │   │       │
    │   │       ├── appointments/
    │   │       │   ├── route.ts             # GET /api/admin/appointments, POST (Walk-in)
    │   │       │   ├── [id]/route.ts        # GET, PATCH, DELETE /api/admin/appointments/[id]
    │   │       │   └── export/route.ts      # GET /api/admin/appointments/export (CSV/Excel)
    │   │       │
    │   │       ├── patients/
    │   │       │   ├── route.ts             # GET /api/admin/patients
    │   │       │   └── [id]/route.ts        # GET, PATCH /api/admin/patients/[id]
    │   │       │
    │   │       ├── branches/
    │   │       │   ├── route.ts             # GET /api/admin/branches
    │   │       │   ├── [id]/route.ts        # PATCH /api/admin/branches/[id]
    │   │       │   └── overrides/route.ts   # POST, DELETE /api/admin/branches/overrides
    │   │       │
    │   │       ├── services/
    │   │       │   ├── route.ts             # GET, POST /api/admin/services
    │   │       │   └── [id]/route.ts        # GET, PUT, DELETE /api/admin/services/[id]
    │   │       │
    │   │       ├── symptoms/
    │   │       │   ├── route.ts             # GET, POST /api/admin/symptoms
    │   │       │   └── [id]/route.ts        # GET, PUT, DELETE /api/admin/symptoms/[id]
    │   │       │
    │   │       ├── hero-slides/
    │   │       │   ├── route.ts             # GET, POST /api/admin/hero-slides
    │   │       │   └── [id]/route.ts        # GET, PUT, DELETE /api/admin/hero-slides/[id]
    │   │       │
    │   │       ├── faqs/
    │   │       │   ├── route.ts             # GET, POST /api/admin/faqs
    │   │       │   └── [id]/route.ts        # GET, PUT, DELETE /api/admin/faqs/[id]
    │   │       │
    │   │       ├── settings/route.ts        # GET, PUT /api/admin/settings
    │   │       ├── users/route.ts           # GET, POST, PATCH /api/admin/users
    │   │       └── audit-logs/route.ts      # GET /api/admin/audit-logs
    │   │
    │   └── (admin)/                         # Centralized Admin Portal Routes
    │       ├── admin/
    │       │   ├── layout.tsx               # Admin Portal Shell (Sidebar, Header, Guard)
    │       │   ├── page.tsx                 # Dashboard Overview & Operational KPIs
    │       │   ├── login/
    │       │   │   └── page.tsx             # Staff Login Portal
    │       │   ├── appointments/
    │       │   │   └── page.tsx             # Appointment Queue & Status Pipeline
    │       │   ├── patients/
    │       │   │   ├── page.tsx             # Patient Master Directory
    │       │   │   └── [id]/page.tsx        # Patient Profile & Clinical Timeline
    │       │   ├── branches/
    │       │   │   └── page.tsx             # Branch Schedule & Holiday Overrides
    │       │   ├── services/
    │       │   │   └── page.tsx             # Dental Services & Pricing CMS
    │       │   ├── symptoms/
    │       │   │   └── page.tsx             # Symptom Guide Triage CMS
    │       │   ├── hero-slides/
    │       │   │   └── page.tsx             # Hero Carousel & Media CMS
    │       │   ├── faqs/
    │       │   │   └── page.tsx             # FAQ & Content Management
    │       │   ├── settings/
    │       │   │   └── page.tsx             # Global Clinic Configuration
    │       │   ├── users/
    │       │   │   └── page.tsx             # Staff Accounts & RBAC
    │       │   └── audit-logs/
    │       │       └── page.tsx             # Security & Activity Audit Trail
    │
    ├── components/                          # UI Component Library
    │   ├── admin/                           # Dedicated Admin Dashboard Components
    │   │   ├── AdminSidebar.tsx             # Collapsible Navigation Sidebar
    │   │   ├── AdminHeader.tsx              # Top Bar with Chamber Status & Search
    │   │   ├── KpiCard.tsx                  # Metric Stat Card
    │   │   ├── AppointmentTable.tsx         # Data Table with Filters & Pagination
    │   │   ├── AppointmentDrawer.tsx        # Slide-over Details & Doctor Notes
    │   │   ├── WalkInModal.tsx              # Quick Walk-in Serial Form
    │   │   ├── StatusBadge.tsx              # Color-coded Status Indicator
    │   │   └── FormControls.tsx             # Reusable Inputs, Selects & Toggles
    │   │
    │   ├── common/                          # Reusable Shared Components
    │   │   ├── AmbientBackground.tsx        # Subtle Gradient / Glass Background
    │   │   ├── Container.tsx                # Responsive Width Container
    │   │   ├── FloatingWhatsApp.tsx         # Quick WhatsApp Pill Button
    │   │   └── ToastNotification.tsx        # Floating Toast Notification Host
    │   │
    │   ├── footer/                          # Footer Component
    │   │   └── Footer.tsx                   # Bilingual Footer with Exzazon Credits
    │   │
    │   ├── header/                          # Navigation Header
    │   │   └── Header.tsx                   # Fixed Sticky Navbar & Mobile Drawer
    │   │
    │   ├── hero/                            # Hero Section
    │   │   └── Hero.tsx                     # Video/Image Dual Carousel
    │   │
    │   ├── modals/                          # Modal Dialogs
    │   │   ├── ServiceModal.tsx             # Service Details Dialog
    │   │   └── BookingSuccessModal.tsx      # Digital Serial Pass & WhatsApp Launch
    │   │
    │   └── sections/                        # Public Landing Page Sections
    │       ├── LiveStatusStrip.tsx          # Real-time Branch Active Bar
    │       ├── SpecialistHighlight.tsx      # Chamber Overview & Doctor Highlights
    │       ├── BranchesSection.tsx          # Dual Chamber Cards & Simulator
    │       ├── ServicesSection.tsx          # 10 Treatments Catalog & Filter
    │       ├── SymptomGuideSection.tsx      # Interactive Symptom Matcher
    │       ├── XrayTechSection.tsx          # Digital Radiography & Sterile Showcase
    │       ├── BookingSection.tsx           # Online Serial Booking Form
    │       └── FaqSection.tsx               # Frequently Asked Questions
    │
    ├── context/                             # React Client State Providers
    │   ├── LanguageContext.tsx              # Bilingual Toggle (EN / BN / BI)
    │   ├── ThemeContext.tsx                 # Dark / Light Theme Controller
    │   └── ToastContext.tsx                 # Toast Notification Controller
    │
    ├── data/                                # Fallback Static Data & Seeds
    │   ├── branches.ts                      # Hardcoded Branch Fallbacks
    │   ├── heroSlides.ts                    # Hardcoded Hero Slide Fallbacks
    │   ├── services.ts                      # 10 Core Services Static Definitions
    │   ├── symptoms.ts                      # Symptom Triage Fallbacks
    │   └── translations.ts                  # Bilingual UI Dictionary & Digits Helper
    │
    ├── lib/                                 # Backend Utilities & Domain Logic
    │   ├── db/
    │   │   └── prisma.ts                    # Prisma Client Singleton Instance
    │   │
    │   ├── auth/
    │   │   ├── session.ts                   # JWT Sign / Verify via jose
    │   │   ├── password.ts                  # bcryptjs Hashing & Comparison
    │   │   └── rbac.ts                      # Role & Permission Helper Guards
    │   │
    │   ├── validations/                     # Zod Validation Schemas
    │   │   ├── appointment.schema.ts        # Booking submission validation
    │   │   ├── auth.schema.ts               # Login & user input validation
    │   │   ├── service.schema.ts            # Dental service CRUD validation
    │   │   └── branch.schema.ts             # Branch & schedule override validation
    │   │
    │   ├── services/                        # Domain Business Logic Services
    │   │   ├── appointment.service.ts       # Serial algorithm & slot verification
    │   │   ├── schedule.service.ts          # Dhaka timezone open/close calculator
    │   │   ├── content.service.ts           # CMS CRUD & revalidateTag caller
    │   │   └── audit.service.ts             # Async audit trail logger
    │   │
    │   └── utils/
    │       ├── api-response.ts              # Standardized API response formatters
    │       ├── date.ts                      # Asia/Dhaka timezone date helpers
    │       └── whatsapp.ts                  # WhatsApp message template builder
    │
    ├── styles/                              # Styling & SCSS Modules
    │   ├── _fonts.scss                      # Local font face definitions
    │   ├── _glassmorphism.scss              # Apple glass classes & sheen effects
    │   ├── _hero.scss                       # Video player animations & overlays
    │   ├── _variables.scss                  # SASS theme color variables
    │   └── globals.scss                     # Tailwind & global stylesheet imports
    │
    └── types/                               # TypeScript Type Definitions
        ├── index.ts                         # Public UI Interfaces
        ├── api.ts                           # API Response & Error Contracts
        └── admin.ts                         # Admin Dashboard State Types
```

---

## 2. Directory Separation Rules
1. **Public vs. Protected Scope:** Everything inside `src/app/(admin)/admin` and `src/app/api/admin` is strictly guarded by `src/middleware.ts`.
2. **Database Isolation:** Prisma operations must execute exclusively within `src/lib/services/` or route handlers, never directly inside client components.
3. **Data Hydration:** Public sections initially query cached endpoints or Server Component props with graceful fallbacks to `src/data/*.ts` if the database is offline.

