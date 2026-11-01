# Sakib Dental Care — System Documentation & Engineering Index

Welcome to the central technical documentation repository for **Sakib Dental Care (সাকিব ডেন্টাল কেয়ার)**.

This directory contains the complete technical specification, architectural blueprints, database schemas, API contracts, security models, and implementation roadmaps for expanding Sakib Dental Care into a full-stack, dashboard-managed clinical platform powered by **Next.js 15 App Router** and **PostgreSQL / Prisma ORM**.

---

## Documentation Index

| Document | Purpose & Key Topics |
| :--- | :--- |
| [**PRD.md**](./PRD.md) | **Product Requirements Document:** Objectives, user personas (Patient, Doctor, Receptionist, Admin), operational challenges, functional & non-functional requirements, edge cases, and success metrics. |
| [**ARCHITECTURE.md**](./ARCHITECTURE.md) | **System Architecture & Design:** Next.js 15 App Router architecture, layered design (Presentation, Edge Middleware, Route Handlers, Domain Services, Data Access), caching strategy (`revalidateTag`), and standard API envelopes. |
| [**DATABASE.md**](./DATABASE.md) | **Database Schema & Data Flow:** Complete Entity-Relationship (ER) diagram, data dictionary, relational models (`User`, `Patient`, `Appointment`, `Branch`, `TimeSlot`, `DentalService`, `SymptomItem`, `HeroSlide`, `Faq`, `AuditLog`), indexes, and complete drop-in `schema.prisma`. |
| [**API.md**](./API.md) | **API Reference & Route Handlers:** Complete catalog of REST route handlers (`/api/public/*`, `/api/appointments`, `/api/auth/*`, `/api/admin/*`), request/response JSON schemas, Zod validation rules, query parameters, and status codes. |
| [**AUTHENTICATION.md**](./AUTHENTICATION.md) | **Auth, Roles & Security:** Role-Based Access Control (RBAC) matrix for `SUPER_ADMIN`, `CLINIC_ADMIN`, `DOCTOR`, and `RECEPTIONIST`, lightweight JWT sessions via `jose` and `bcryptjs`, secure HTTP-only cookies, and Next.js Edge Middleware route guards. |
| [**ADMIN_DASHBOARD.md**](./ADMIN_DASHBOARD.md) | **Centralized Admin Dashboard:** Specification for the `/admin` back-office portal, covering daily appointment queues, Kanban pipelines, walk-in serial generator, patient directory, branch scheduling & holiday calendar, CMS for services, symptoms, slides, FAQs, and global emergency broadcast banners. |
| [**FILE_STRUCTURE.md**](./FILE_STRUCTURE.md) | **Project Directory Tree:** Unified layout illustrating the organization of the frontend, backend route handlers, Prisma database, lib domain services, admin components, and styling. |
| [**SECURITY.md**](./SECURITY.md) | **Data Privacy & Healthcare Compliance:** Defensive countermeasures for OWASP Top 10 vulnerabilities, input sanitization, Bangladeshi phone validation, HTTP security headers, medical notes confidentiality, and audit logging. |
| [**DEPLOYMENT_ENV.md**](./DEPLOYMENT_ENV.md) | **Deployment & Environment Setup:** Environment variable specification (`.env.example`), PostgreSQL setup, Prisma migration workflows, seed commands, and Vercel/Node deployment checklist. |
| [**IMPLEMENTATION_PLAN.md**](./IMPLEMENTATION_PLAN.md) | **Step-by-Step Implementation Roadmap:** Actionable 7-phase roadmap (Database -> Auth -> Public APIs -> Frontend Integration -> Admin APIs -> Admin UI -> Quality Assurance & Launch). |

---

## Architecture Summary at a Glance

```mermaid
graph TD
    subgraph PublicPortal ["Public Patient Experience"]
        LP[Landing Page & Services]
        BK[Online Serial Booking Form]
        TK[Digital Token & WhatsApp Bridge]
    end

    subgraph BackendAPI ["Next.js App Router (/api)"]
        PUB_API[/api/public/* & /api/appointments]
        AUTH_API[/api/auth/*]
        ADM_API[/api/admin/*]
    end

    subgraph AdminPortal ["Centralized Admin Portal (/admin)"]
        DASH[Operational Overview & KPIs]
        QUEUE[Daily Appointment Pipeline]
        CMS[Services, Schedules & Media CMS]
    end

    subgraph Database ["PostgreSQL & Storage"]
        PRISMA[Prisma ORM Client]
        PG[(PostgreSQL Database)]
    end

    PublicPortal --> PUB_API
    AdminPortal --> AUTH_API
    AdminPortal --> ADM_API
    PUB_API --> PRISMA
    ADM_API --> PRISMA
    PRISMA --> PG
```

For questions or backend implementation onboarding, start with [**PRD.md**](./PRD.md) and proceed through [**IMPLEMENTATION_PLAN.md**](./IMPLEMENTATION_PLAN.md).

