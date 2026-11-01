# API Specification & Route Handlers Reference
## Sakib Dental Care — Next.js 15 App Router API Architecture

---

## 1. API Architecture Conventions

All API route handlers are organized within `src/app/api/` using Next.js 15 App Router specifications.

- **Base URL:** `/api`
- **Content-Type:** `application/json; charset=utf-8`
- **Authentication:** HTTP-only SameSite cookie (`sdc_session`) or `Authorization: Bearer <token>`
- **Response Format:** Standard JSON envelope across all endpoints
- **Validation:** Zod schemas applied prior to business logic execution

### 1.1 Standard Response Envelope

#### Successful Response:
```typescript
interface ApiSuccessResponse<T> {
  success: true;
  statusCode: number;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
```

#### Error Response:
```typescript
interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error: {
    code: string;
    details?: Array<{ field?: string; issue: string }>;
  };
}
```

---

## 2. Public API Endpoints

### 2.1 Branch & Live Schedule
- **Route:** `GET /api/public/branches`
- **Access:** Public (Cached with tag: `branches`, revalidated on admin updates)
- **Description:** Returns active clinic branches, physical addresses, shift timings, real-time open/closed status based on Asia/Dhaka time, and bookable time slots.

#### Response (`200 OK`):
```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "branch-uuid-1",
      "slug": "nawhata",
      "nameEn": "Nowhata Branch (Nowhata Bazar)",
      "nameBn": "নওহাটা শাখা (নওহাটা বাজার)",
      "addressEn": "East of Akbari Mosque (Mondol Market Ground Floor), Nowhata Bazar, Paba, Rajshahi",
      "addressBn": "আকবরী মসজিদের পূর্বে (মন্ডল মার্কেটের নীচ তলা), নওহাটা বাজার, পবা, রাজশাহী",
      "phoneHotline": "01688-434676",
      "whatsappNumber": "01733-054717",
      "shiftBadgeEn": "Day Shift (9:00 AM - 6:00 PM)",
      "shiftBadgeBn": "ডে শিফট (সকাল ৯টা - সন্ধ্যা ৬টা)",
      "isOpenNow": true,
      "isFridayClosed": true,
      "timeSlots": [
        { "id": "slot-1", "slotTimeEn": "9:30 AM (Morning)", "slotTimeBn": "সকাল ৯:৩০ টা" },
        { "id": "slot-2", "slotTimeEn": "10:30 AM (Morning)", "slotTimeBn": "সকাল ১০:৩০ টা" }
      ]
    }
  ]
}
```

---

### 2.2 Dental Services Catalog
- **Route:** `GET /api/public/services`
- **Access:** Public (Cached with tag: `services`)
- **Query Parameters:**
  - `category` (optional): `diagnostic` | `restorative` | `cosmetic` | `ortho-surgical` | `all`
  - `search` (optional): string keyword search in English or Bangla
- **Description:** Returns the 10+ core dental services with care tips, duration, and technology descriptions.

#### Response (`200 OK`):
```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": 2,
      "category": "RESTORATIVE",
      "titleEn": "Advanced Root Canal Treatment (RCT)",
      "titleBn": "উন্নত প্রযুক্তির মাধ্যমে রুট ক্যানাল ট্রিটমেন্ট",
      "icon": "ph-tooth",
      "color": "indigo",
      "shortDescEn": "Save severely infected or painful teeth without extraction using rotary endodontics.",
      "shortDescBn": "তীব্র দাঁতের ব্যথা বা ইনফেকশন হওয়া দাঁত না ফেলে আধুনিক রোটারি প্রযুক্তির সাহায্যে ব্যথামুক্ত চিকিৎসা।",
      "durationEn": "45 – 60 Mins",
      "durationBn": "৪৫ – ৬০ মিনিট",
      "techEn": "Rotary Endomotor & Apex Locator",
      "techBn": "এন্ডোমোটর ও ডিজিটাল এক্স-রে গাইডেড",
      "careTipEn": "Placing a dental crown (cap) is strongly recommended after RCT.",
      "careTipBn": "রুট ক্যানাল সম্পন্ন করার পর দাঁতটিকে মজবুত রাখতে অবশ্যই ক্রাউন (ক্যাপ) পরানো উচিত।"
    }
  ]
}
```

---

### 2.3 Symptom Guide Triage
- **Route:** `GET /api/public/symptoms`
- **Access:** Public (Cached with tag: `symptoms`)
- **Description:** Returns symptom-to-treatment mapping entries for the interactive finder.

#### Response (`200 OK`):
```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "pain",
      "serviceId": 2,
      "symptomEn": "Severe Toothache & Hot/Cold Sensitivity",
      "symptomBn": "দাঁতে তীব্র ব্যথা ও ঠান্ডা-গরমে শিরশিরানি",
      "icon": "ph-lightning",
      "causeEn": "Deep dental caries reaching the inner pulp nerve.",
      "causeBn": "দাঁতের গভীর ক্যাভিটি থেকে নার্ভে ইনফেকশন ছড়িয়ে পড়লে এমন তীব্র ব্যথা হয়।",
      "recEn": "Advanced Root Canal Treatment (RCT)",
      "recBn": "উন্নত প্রযুক্তির মাধ্যমে রুট ক্যানাল ট্রিটমেন্ট (RCT)",
      "stepsEn": [
        "First, an on-site Digital Dental X-Ray is taken to inspect the exact root canal anatomy.",
        "Next, painless Root Canal Treatment cleans the infection and preserves your natural tooth."
      ]
    }
  ]
}
```

---

### 2.4 Hero Slides & Public Settings
- **Route:** `GET /api/public/hero-slides` (Cached with tag: `hero-slides`)
- **Route:** `GET /api/public/settings` (Cached with tag: `settings`)
- **Description:** Delivers dynamic hero carousel items, emergency notices, and verified hotline contacts.

---

### 2.5 Online Appointment Booking Submission
- **Route:** `POST /api/appointments`
- **Access:** Public (Rate limited: 10 requests / 15 minutes per IP)
- **Description:** Creates an appointment serial, automatically links or creates a patient record, verifies branch capacity and Friday restrictions, and issues a deterministic serial token.

#### Request Body (`application/json`):
```json
{
  "branchKey": "nawhata",
  "serviceId": 2,
  "patientName": "Md. Tanvir Hossain",
  "patientAge": 28,
  "patientPhone": "01712345678",
  "bookingDate": "2026-11-05",
  "bookingTimeSlot": "10:30 AM (Morning)",
  "patientNotes": "Severe pain on lower right molar when drinking cold water."
}
```

#### Validation Schema (Zod):
```typescript
export const createAppointmentSchema = z.object({
  branchKey: z.enum(["nawhata", "city"]),
  serviceId: z.number().int().positive(),
  patientName: z.string().min(2, "Name must be at least 2 characters").max(100),
  patientAge: z.coerce.number().int().min(1).max(120).optional(),
  patientPhone: z.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, "Invalid Bangladeshi phone number"),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date format must be YYYY-MM-DD"),
  bookingTimeSlot: z.string().min(3),
  patientNotes: z.string().max(1000).optional(),
});
```

#### Success Response (`201 Created`):
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Appointment serial confirmed successfully.",
  "data": {
    "appointmentId": "apt-uuid-987",
    "serialId": "SDC-20261105-004",
    "status": "PENDING",
    "patient": {
      "fullName": "Md. Tanvir Hossain",
      "phone": "01712345678"
    },
    "branch": {
      "nameEn": "Nowhata Branch (Nowhata Bazar)",
      "nameBn": "নওহাটা শাখা (নওহাটা বাজার)",
      "addressEn": "East of Akbari Mosque, Nowhata Bazar, Paba, Rajshahi"
    },
    "service": {
      "titleEn": "Advanced Root Canal Treatment (RCT)",
      "titleBn": "উন্নত প্রযুক্তির মাধ্যমে রুট ক্যানাল ট্রিটমেন্ট"
    },
    "appointmentDate": "2026-11-05",
    "timeSlot": "10:30 AM (Morning)",
    "whatsappUrl": "https://wa.me/8801733054717?text=..."
  }
}
```

#### Error Response — Friday Closure (`400 Bad Request`):
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Nowhata Branch is closed on Fridays. Please choose another date or visit our City Branch.",
  "error": {
    "code": "BRANCH_CLOSED_ON_SELECTED_DATE"
  }
}
```

---

### 2.6 Public Appointment Tracking Lookup
- **Route:** `GET /api/appointments/track`
- **Access:** Public
- **Query Parameters:** `serial` (e.g., `SDC-20261105-004`) and `phone` (e.g., `01712345678`)
- **Description:** Allows patients to view the real-time status of their serial pass (`PENDING`, `CONFIRMED`, `IN_TREATMENT`, `COMPLETED`).

---

## 3. Authentication & Staff API (`/api/auth`)

### 3.1 Staff Login
- **Route:** `POST /api/auth/login`
- **Access:** Public (Throttled: 5 attempts per 15 mins)
- **Description:** Verifies staff email/phone and password; sets HTTP-only secure session cookie.

#### Request:
```json
{
  "identifier": "admin@sakibdental.com",
  "password": "SecurePassword123!"
}
```

#### Success Response (`200 OK`):
- **Set-Cookie:** `sdc_session=<jwt_token>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": "usr-uuid-1",
      "email": "admin@sakibdental.com",
      "fullName": "Dr. Sakib Dental Care",
      "role": "CLINIC_ADMIN"
    }
  }
}
```

### 3.2 Staff Logout
- **Route:** `POST /api/auth/logout`
- **Access:** Authenticated
- **Description:** Clears the `sdc_session` cookie.

### 3.3 Current Session Check
- **Route:** `GET /api/auth/me`
- **Access:** Authenticated
- **Description:** Returns the active staff profile and permissions.

---

## 4. Admin Dashboard API (`/api/admin`)

*All `/api/admin/*` endpoints require an active authenticated session (`SUPER_ADMIN`, `CLINIC_ADMIN`, `DOCTOR`, or `RECEPTIONIST`).*

### 4.1 Appointment Management

#### List Appointments with Filters
- **Route:** `GET /api/admin/appointments`
- **Query Parameters:**
  - `date`: `YYYY-MM-DD` (optional, defaults to all or range)
  - `branchId`: string UUID or slug (optional)
  - `status`: `PENDING` | `CONFIRMED` | `IN_TREATMENT` | `COMPLETED` | `CANCELLED` | `NO_SHOW` (optional)
  - `search`: string (matches patient name, phone, or serial ID)
  - `page`: integer (default: 1)
  - `limit`: integer (default: 20)
- **Response (`200 OK`):** Paginated list of appointments with patient, branch, and service metadata.

#### Update Appointment Status & Doctor Notes
- **Route:** `PATCH /api/admin/appointments/[id]`
- **Request Body:**
```json
{
  "status": "CONFIRMED",
  "doctorNotes": "Patient reported acute sensitivity. Plan: Initial digital X-ray and pulp extirpation.",
  "timeSlot": "11:30 AM (Morning)"
}
```

#### Manual Appointment Creation (Walk-in / Phone Call)
- **Route:** `POST /api/admin/appointments`
- **Request Body:** Same schema as public booking, plus optional `status` (can be marked directly as `CONFIRMED`).

#### Delete / Archive Appointment
- **Route:** `DELETE /api/admin/appointments/[id]`
- **Permission:** `SUPER_ADMIN`, `CLINIC_ADMIN` only.

---

### 4.2 Patient Directory
- **Route:** `GET /api/admin/patients`
  - Query: `search`, `page`, `limit`
  - Returns patient roster with lifetime visit counts.
- **Route:** `GET /api/admin/patients/[id]`
  - Returns complete patient profile, medical alerts, and past clinical appointment history.
- **Route:** `PATCH /api/admin/patients/[id]`
  - Updates patient profile, emergency phone, address, and medical alerts.

---

### 4.3 Analytics & Operational KPIs
- **Route:** `GET /api/admin/analytics/overview`
- **Query Parameters:** `period` = `today` | `7days` | `30days` | `thisMonth`
- **Response (`200 OK`):**
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "totalAppointments": 48,
    "pendingCount": 6,
    "confirmedCount": 24,
    "completedCount": 16,
    "cancelledCount": 2,
    "branchBreakdown": {
      "nawhata": 32,
      "city": 16
    },
    "topServices": [
      { "serviceId": 2, "title": "Root Canal Treatment", "count": 18 },
      { "serviceId": 3, "title": "Ultrasonic Scaling", "count": 12 },
      { "serviceId": 10, "title": "Digital Dental X-Ray", "count": 9 }
    ]
  }
}
```

---

### 4.4 CMS & Content Management Endpoints

| Resource | Methods | Route | Cache Invalidation Tag |
| :--- | :--- | :--- | :--- |
| **Dental Services** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/services` & `/[id]` | `services` |
| **Hero Slides** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/hero-slides` & `/[id]` | `hero-slides` |
| **Symptom Guide** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/symptoms` & `/[id]` | `symptoms` |
| **FAQs** | `GET`, `POST`, `PUT`, `DELETE` | `/api/admin/faqs` & `/[id]` | `faqs` |
| **Branches & Slots** | `GET`, `PATCH`, `POST` | `/api/admin/branches` & `/[id]` | `branches` |
| **Holiday Overrides** | `POST`, `DELETE` | `/api/admin/branches/overrides` | `branches` |
| **Clinic Settings** | `GET`, `PUT` | `/api/admin/settings` | `settings` |

Whenever any administrative modification occurs on these resources, the route handler calls `revalidateTag(tag)`:
```typescript
import { revalidateTag } from "next/cache";

// Inside PUT /api/admin/services/[id] handler:
await updateServiceInDb(id, body);
revalidateTag("services");
return NextResponse.json({ success: true, message: "Service updated & cache purged." });
```
This guarantees instant updates across the public landing page without rebuilding the application.

