# Deployment, Environment Configuration & Operations Guide
## Sakib Dental Care — Infrastructure & Deployment Blueprint

---

## 1. Overview
The Sakib Dental Care system is architected for zero-downtime deployment on modern serverless or Node.js container environments (e.g., **Vercel**, **Railway**, **Render**, or self-hosted **Docker/Ubuntu** servers) paired with managed PostgreSQL (e.g., **Supabase**, **Neon**, or **AWS RDS**).

---

## 2. Environment Variables Specification

Create `.env.local` for local development and configure these variables in production:

```bash
# -----------------------------------------------------------------------------
# APPLICATION & RUNTIME CONFIGURATION
# -----------------------------------------------------------------------------
NODE_ENV="development"                          # "development" | "production" | "test"
NEXT_PUBLIC_APP_URL="http://localhost:3000"     # Production domain (e.g. https://sakibdental.com)
NEXT_PUBLIC_CLINIC_NAME="Sakib Dental Care"
NEXT_PUBLIC_CLINIC_NAME_BN="সাকিব ডেন্টাল কেয়ার"

# -----------------------------------------------------------------------------
# DATABASE PERSISTENCE (POSTGRESQL & PRISMA)
# -----------------------------------------------------------------------------
# Standard connection pooling URL (e.g., Supabase Transaction Pooler, Neon Pooler)
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?sslmode=require&pgbouncer=true"

# Direct URL for Prisma migrations (bypassing pgbouncer if using connection pooling)
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?sslmode=require"

# -----------------------------------------------------------------------------
# AUTHENTICATION & CRYPTOGRAPHIC SECRETS
# -----------------------------------------------------------------------------
# 64-character random hexadecimal or base64 secret for JWT signing
JWT_SECRET="generate_a_secure_64_character_random_hex_string_for_production_jwt"
JWT_EXPIRES_IN="7d"

# -----------------------------------------------------------------------------
# HIDDEN ADMIN SIGN-IN AND EMAIL OTP
# -----------------------------------------------------------------------------
ADMIN_EMAIL="admin@sakibdental.com"
ADMIN_PASSWORD="replace_with_a_unique_long_admin_password"
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"                           # Use "true" for implicit TLS, commonly port 465
SMTP_USER="admin@sakibdental.com"
SMTP_PASSWORD="your_smtp_or_provider_app_password"
SMTP_FROM_EMAIL="admin@sakibdental.com"       # Use a sender authorized by your SMTP provider
SMTP_FROM_NAME="Sakib Dental Care"

# -----------------------------------------------------------------------------
# CLINIC DEFAULT CONTACTS & EXTERNAL BRIDGES
# -----------------------------------------------------------------------------
NEXT_PUBLIC_WHATSAPP_NUMBER="8801733054717"
NEXT_PUBLIC_HOTLINE_PHONE="01688-434676"

# -----------------------------------------------------------------------------
# DEFAULT SUPER ADMIN INITIAL SEED CREDENTIALS
# -----------------------------------------------------------------------------
INITIAL_ADMIN_EMAIL="admin@sakibdental.com"
INITIAL_ADMIN_PASSWORD="ChangeMeInProduction123!"
INITIAL_ADMIN_PHONE="01733054717"
INITIAL_ADMIN_NAME="Dr. Sakib"

# -----------------------------------------------------------------------------
# CLOUD MEDIA STORAGE (OPTIONAL / CLOUDINARY OR S3)
# -----------------------------------------------------------------------------
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

---

## 3. Database Initialization & Migration Workflow

### Step 1: Install Database Dependencies
```bash
npm install @prisma/client
npm install -D prisma
```

### Step 2: Initialize Prisma & Schema Generation
```bash
npx prisma generate
```

### Step 3: Run Database Migrations
```bash
# In development (creates new migration files):
npx prisma migrate dev --name init_sakib_dental_schema

# In production CI/CD pipeline:
npx prisma migrate deploy
```

The admin OTP challenge table is included in the Prisma migrations. Apply pending
migrations before deploying the updated sign-in flow.

For reliable inbox delivery, configure SPF and DKIM for the sending domain and
publish an aligned DMARC policy. SMTP settings and sender reputation influence
spam filtering; no application can guarantee primary-inbox placement.

### Step 4: Seed Initial Content & Admin User
The database seed script (`prisma/seed.ts`) automatically transfers existing static data (`heroSlides`, `dentalServices`, `branchDetails`, `symptomData`, and `uiTranslations`) into PostgreSQL and generates the default administrator:
```bash
npx prisma db seed
```

---

## 4. Production Deployment Checklist (e.g., Vercel)
1. **Repository Link:** Connect GitHub repository `SAKIB-Dental-Care` to Vercel.
2. **Framework Preset:** Next.js (automatically detected).
3. **Environment Variables:** Populate all production variables from the table above in Vercel Project Settings.
4. **Build Command:**
   ```bash
   prisma generate && next build
   ```
5. **Database Connection Pooling:** Ensure `DATABASE_URL` uses PgBouncer or connection pooler mode to avoid exhausting PostgreSQL client connections across serverless functions.
6. **SSL & Domain:** Pin custom domain (e.g., `sakibdental.com`) with automated Let's Encrypt SSL certificates.
