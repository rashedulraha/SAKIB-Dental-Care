# Product Requirements Document (PRD)
## Sakib Dental Care — Unified Clinical Platform & Management System

---

## 1. Document Overview
- **Project Name:** Sakib Dental Care (সাকিব ডেন্টাল কেয়ার)
- **Version:** 2.0 (Backend & Admin Dashboard Architecture)
- **Target Platform:** Next.js 15 (App Router), TypeScript, PostgreSQL / Prisma ORM
- **Status:** Planning & Architecture Review
- **Last Updated:** October 2026

---

## 2. Executive Summary
**Sakib Dental Care** is a leading dental healthcare clinic operating across two dedicated chambers in Rajshahi, Bangladesh:
1. **Nowhata Branch (Main Day Shift):** East of Akbari Mosque, Nowhata Bazar, Paba, Rajshahi (9:00 AM – 6:00 PM, Friday Closed).
2. **City Branch (Evening Shift):** Kasaikhana More, Jinnahnagar, Sopura, Rajshahi (7:00 PM – 11:00 PM, Daily).

Currently, the front-end is a high-performance, bilingual (English/Bangla), Apple-inspired glassmorphism web application built with Next.js 15. However, the system is purely static:
- Appointment submissions generate a WhatsApp message (`wa.me`) or clipboard text without storing records in any database.
- Clinic content (10 dental services, hero slides, branch shifts, time slots, symptom guide recommendations, and FAQs) is hardcoded in client-side TypeScript files (`src/data/*.ts`).
- Clinic management lacks a back-office tool to manage patient serials, confirm appointments, alter schedules during emergencies or holidays, modify service pricing, or update clinical announcements.

This document establishes the product requirements for transforming Sakib Dental Care into a **full-stack, scalable, dashboard-managed healthcare platform** powered by Next.js App Router API route handlers, relational database persistence, role-based admin workflows, and real-time content management.

---

## 3. Problem Statement & Objectives

### 3.1 Existing Challenges
1. **Zero Booking Persistence & Data Loss:** Patient appointments rely completely on patients sending a WhatsApp message after completing the form. If a patient experiences connectivity drops or closes the browser, the clinic loses the booking lead entirely.
2. **No Serial or Queue Management:** The clinic cannot track appointment volume, allocate serial numbers deterministically, prevent double-booking of specific time slots, or mark appointments as Confirmed, In-Treatment, Completed, or Cancelled.
3. **Hardcoded Content & Developer Dependency:** Updating chamber visiting hours (e.g., during Ramadan or Eid holidays), adding a new dental service, or modifying contact hotlines requires code edits, git commits, and redeployments.
4. **Lack of Operational Visibility:** The doctor and clinic staff have no central dashboard to view daily expected patient volume across the Nowhata and City branches, track patient history, or review common dental complaints.

### 3.2 Core Objectives
- **Centralized Admin Dashboard:** Provide an intuitive, secure back-office dashboard where clinic administrators, doctors, and front-desk staff can manage appointments, patient records, schedules, and website content via full CRUD operations.
- **Reliable Appointment Pipeline:** Store every appointment submission in a relational database with an automatically generated, unique clinical serial code (e.g., `SDC-20261030-001`), while maintaining seamless instant WhatsApp confirmation.
- **Dynamic Content Management System (CMS):** Expose structured APIs and dashboard interfaces to manage:
  - Hero carousel slides (images/videos, bilingual copy, badges).
  - 10+ Dental Services (titles, categories, descriptions, care tips, durations, pricing).
  - Branch details, shift timings, holiday toggles, and slot quotas.
  - Interactive Symptom Guide entries and treatment triage mappings.
  - FAQs and general clinic configurations (emergency banners, hotlines, WhatsApp numbers).
- **Security & Role-Based Access Control (RBAC):** Protect patient health information and administrative actions with enterprise-grade authentication (secure HTTP-only session cookies, bcrypt password hashing, CSRF protection, and audit logs).
- **Uncompromised User Experience:** Maintain 100% of the existing high-speed, polished frontend design, bilingual language switching (English, Bangla, Bilingual), dark/light mode, and mobile accessibility.

---

## 4. Target Audience & User Personas

| Persona | Role | Key Needs & Behaviors |
| :--- | :--- | :--- |
| **Patient / Visitor** | End User (Desktop / Mobile) | Seeks immediate dental relief, browses symptoms, verifies clinic sterile protocols, views branch timings, books an appointment with zero friction, and receives an instant serial token. |
| **Clinic Administrator** | System Owner | Full control over system settings, staff user accounts, holiday schedules, branch shifts, pricing, website hero slides, and comprehensive clinic analytics. |
| **Dentist / Specialist (Dr. Sakib)** | Lead Practitioner | Reviews daily appointment queues per branch, reviews patient symptoms and clinical notes before treatment, updates treatment status, and records internal doctor notes. |
| **Front-Desk Receptionist** | Clinic Operator | Confirms incoming online serials, makes phone follow-ups, marks patient arrival, reschedules slots upon patient request, and logs manual walk-in patients. |

---

## 5. Functional Requirements

### 5.1 Public Portal & Patient Experience
- **FR-PUB-01: Dual-Language System Support:**
  - Complete support for English (`en`), Bengali (`bn`), and Bilingual side-by-side (`bi`) display across all dynamic content retrieved from the database.
- **FR-PUB-02: Real-time Live Branch Status Strip:**
  - Displays whether Nowhata (9 AM – 6 PM) or City Branch (7 PM – 11 PM) is currently active based on real clinic time (Asia/Dhaka timezone) or overrides set in the admin dashboard (e.g., "Closed for Holiday").
- **FR-PUB-03: Interactive Branch Explorer & Simulator:**
  - View detailed branch information, addresses, Google Maps directions, and shift badges.
- **FR-PUB-04: Dental Services Catalog:**
  - Filter services by categories: `Diagnostic`, `Restorative`, `Cosmetic`, `Ortho-Surgical`.
  - Search services by keywords in English or Bengali.
  - Interactive modal view displaying detailed technology, procedure steps, duration, and post-treatment care tips.
- **FR-PUB-05: Interactive Symptom Matcher:**
  - Triage selector helping patients identify symptoms (e.g., toothache, bleeding gums, cracked tooth, wisdom tooth pain).
  - Highlights clinical causes and links directly to recommended treatments with pre-selected booking options.
- **FR-PUB-06: Online Serial Appointment Booking:**
  - Patient selects Branch, Treatment Service, Date, and Available Time Slot.
  - Patient inputs Full Name, Age, Mobile Phone Number, and optional Notes/Symptoms.
  - Automatic validation prevents selecting past dates, Friday for Nowhata branch (unless explicitly enabled for special sessions), or fully booked slots.
  - On submission:
    - Automatically creates a secure database record with status `PENDING`.
    - Generates a clinical serial token (`SDC-YYYYMMDD-XXX`).
    - Displays a rich confirmation modal with option to launch WhatsApp pre-filled message (`wa.me`) or copy appointment pass to clipboard.

### 5.2 Centralized Admin Dashboard (`/admin`)
- **FR-ADM-01: Secure Authentication & Session Management:**
  - Protected admin portal with email/phone and password credentials.
  - Secure session storage via HTTP-only cookies with cryptographic signing.
  - Automatic session timeout, brute-force throttling, and password reset capabilities.
- **FR-ADM-02: Role-Based Access Control (RBAC):**
  - Roles: `SUPER_ADMIN`, `CLINIC_ADMIN`, `DOCTOR`, `RECEPTIONIST`.
  - Granular permissions restricting billing, staff creation, and content deletion to administrative roles.
- **FR-ADM-03: Real-Time Operational Dashboard & Analytics:**
  - KPI Cards: Total Today's Serials, Nowhata Queue Count, City Queue Count, Pending Confirmations, Completed Treatments.
  - Visual charts showing appointment trends over 7/30 days, most popular dental treatments, and branch distribution.
- **FR-ADM-04: Appointment Management Pipeline:**
  - Tabular and Kanban/Pipeline view of appointments filterable by date, branch, service, and status (`PENDING`, `CONFIRMED`, `IN_TREATMENT`, `COMPLETED`, `CANCELLED`, `NO_SHOW`).
  - Quick action buttons: One-click "Confirm", "Cancel", "Complete", and "Direct WhatsApp Ping" to the patient.
  - Modal to view patient medical details, update appointment time slot, assign doctor notes, and log follow-up dates.
  - Manual appointment entry tool for offline/phone call walk-ins.
  - Export appointments to CSV / Excel / PDF for daily clinic rosters.
- **FR-ADM-05: Patient Directory:**
  - Consolidated patient records deduplicated by mobile phone number.
  - Lifetime visit history, treatment history, and clinical notes.
- **FR-ADM-06: Branch & Scheduling Manager:**
  - Manage branch profiles (Nowhata, Sopura City Branch, and future branches).
  - Configure shift hours, default slot intervals (e.g., 30 mins, 45 mins), and maximum patient capacity per slot.
  - Holiday & Emergency Override Calendar: Set branch closures, emergency notices, or custom Ramadan timings without touching code.
- **FR-ADM-07: Dental Services & Treatments CMS:**
  - Full CRUD for dental services (bilingual title, category, description, duration, technology tag, care tips, icon, color theme, active status, priority sort order).
- **FR-ADM-08: Symptom Guide & Triage CMS:**
  - Full CRUD for symptoms, causes, procedural steps, and linked dental services.
- **FR-ADM-09: Hero Carousel & Media CMS:**
  - Full CRUD for hero slides (media type: video/image, remote/upload URL, bilingual titles, subtitles, badges, action buttons, order).
- **FR-ADM-10: FAQ & Content CMS:**
  - Full CRUD for categorized bilingual FAQ entries.
- **FR-ADM-11: Clinic General Settings & Broadcasts:**
  - Manage clinic primary hotline, WhatsApp booking numbers, social links, footer notices, and top emergency announcement banner.
- **FR-ADM-12: Audit Logging & Activity Trail:**
  - Immutable audit logs recording all administrative actions (who modified an appointment, changed branch timings, or deleted a record with timestamp and IP address).

---

## 6. Non-Functional Requirements (NFRs)

### 6.1 Performance & Responsiveness
- **NFR-PERF-01:** Server-side API response time under 150ms for 95% of standard read queries.
- **NFR-PERF-02:** Next.js Server Components with ISR (Incremental Static Regeneration) / `revalidateTag` for dynamic CMS content (services, FAQs, branches) ensuring near-instant page loads.
- **NFR-PERF-03:** Full mobile-first responsive design matching the existing glassmorphic aesthetic across smartphone, tablet, and widescreen desktop layouts.

### 6.2 Data Integrity & Reliability
- **NFR-DATA-01:** Strict foreign key relational integrity and transaction management (Prisma ACID transactions) for booking creations, avoiding duplicate serial codes or slot over-booking.
- **NFR-DATA-02:** Daily automated database backups with point-in-time recovery.

### 6.3 Security & Healthcare Privacy
- **NFR-SEC-01:** All passwords hashed using `bcrypt` (work factor 12).
- **NFR-SEC-02:** Protection against OWASP Top 10 vulnerabilities: SQL injection (parameterized ORM queries), Cross-Site Scripting (XSS sanitization), CSRF tokens on state-changing requests, and rate-limiting on sensitive endpoints (e.g., booking submission and login).
- **NFR-SEC-03:** Strict encapsulation of patient medical notes—accessible only to authorized clinical roles.

### 6.4 Usability & Accessibility
- **NFR-USE-01:** Seamless operation in low-bandwidth network environments typical in regional clinic operations.
- **NFR-USE-02:** High color contrast ratios adhering to WCAG 2.1 AA standards for dark and light themes.

---

## 7. Edge Cases & Business Rules
1. **Friday Nowhata Booking:** Nowhata branch is closed on Fridays. The booking date picker and backend validation must reject Friday bookings for Nowhata unless an admin has flagged that specific Friday as a "Special Open Session".
2. **Duplicate Patient Submissions:** If a patient submits multiple booking requests for the same branch and date within 10 minutes using the same phone number, the system should link the submission to the existing pending request rather than spamming duplicate serials.
3. **Slot Capacity Exceeded:** If multiple users attempt to book the final available slot simultaneously, the transaction must reject the second request gracefully with a user-friendly prompt: *"This slot was just reserved. Please select another convenient time."*
4. **Timezone Uniformity:** All slot calculations and live status checks must run strictly under `Asia/Dhaka` (UTC+6) regardless of the client machine's local clock setting.

---

## 8. Success Metrics & KPIs
- **Lead Capture Rate:** 100% of initiated online booking requests captured in the database (0% loss from dropped WhatsApp clicks).
- **Reception Efficiency:** 50% reduction in time spent by receptionists manually logging patient serials into paper registers.
- **Admin Independence:** Zero engineering interventions required for updating clinic schedules, holiday closures, services, or hero media.
- **System Uptime:** 99.9% uptime during active clinic hours (9:00 AM – 11:00 PM BST).

