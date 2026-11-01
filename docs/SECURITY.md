# Security, Privacy & Healthcare Compliance Blueprint
## Sakib Dental Care — Security Architecture & Data Protection

---

## 1. Security Overview
Healthcare and appointment systems require strict adherence to **data privacy, integrity, and confidentiality**. Although Sakib Dental Care is an outpatient dental clinic, safeguarding patient contact information, diagnostic notes, and administrative controls is paramount.

---

## 2. Threat Modeling & Defensive Countermeasures

| Threat Vector | Potential Impact | Defensive Architecture |
| :--- | :--- | :--- |
| **Credential Stuffing / Brute Force** | Unauthorized admin account takeover | In-memory / Redis rate limiting on `/api/auth/login` (5 attempts per 15 mins), bcrypt salt rounds (12). |
| **SQL Injection (SQLi)** | Unauthorized data exfiltration or tampering | 100% Parameterized queries via Prisma ORM; zero raw string SQL concatenation. |
| **Cross-Site Scripting (XSS)** | Admin session theft or cookie compromise | `HttpOnly` cookie flags prevent client JS access; DOMPurify/HTML sanitization on rich-text FAQs. |
| **Cross-Site Request Forgery (CSRF)** | Unauthorized state mutations | `SameSite=Lax/Strict` cookie enforcement; Origin and Referer header verification on mutation requests. |
| **Mass Booking Spam / Denial of Service** | Exhaustion of serial numbers & slots | IP-based rate limiting on `POST /api/appointments` (10 per 15 mins), Zod phone verification. |
| **Data Leakage in Transit** | Interception of patient phone & medical notes | Enforced HTTPS / TLS 1.3, Strict-Transport-Security (HSTS) headers. |
| **Unauthorized Clinical Access** | Non-medical staff viewing sensitive doctor notes | Role-Based Access Control (RBAC) enforced in middleware and domain service layer. |

---

## 3. Input Validation & Defense-in-Depth

Every public and administrative endpoint must enforce strict schema validation via **Zod**:
1. **Type Checking:** Rejects payloads with missing, unexpected, or mutated types.
2. **Sanitization:** Trims leading/trailing whitespace, strips potential HTML tags (`<script>`, `<iframe>`), and encodes dangerous characters.
3. **Bangladeshi Phone Validation:**
   ```typescript
   export const bangladeshPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
   ```
   Ensures that only valid Bangladeshi mobile operator prefixes (`013`, `014`, `015`, `016`, `017`, `018`, `019`) can book serials.
4. **Date Whitelisting:** Rejects past dates and enforces clinic business rules (e.g., rejecting Friday bookings for Nowhata branch unless specifically overridden).

---

## 4. HTTP Security Headers Configuration

Next.js is configured via `next.config.ts` and `src/middleware.ts` to attach industry-standard security headers to every response:

```typescript
// Security Headers Config
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];
```

---

## 5. Medical Data Privacy & Audit Trail

### 5.1 Doctor Notes Isolation
- Diagnostic records, tooth condition notes, and prescription logs are classified as **Confidential Medical Data**.
- Only users with roles `DOCTOR`, `CLINIC_ADMIN`, or `SUPER_ADMIN` can read or modify the `doctorNotes` column.
- The `RECEPTIONIST` role receives a sanitized DTO where `doctorNotes` is omitted or redacted.

### 5.2 Immutable Audit Logging (`AuditLog`)
Every state-changing administrative action is logged to the `AuditLog` table with:
- `userId`: Identifier of the operating user.
- `action`: Specific action code (e.g., `APPOINTMENT_CANCELLED`, `FEE_UPDATED`).
- `entity` & `entityId`: The target record modified.
- `details`: JSON snapshot of changed attributes.
- `ipAddress`: Remote client IP address.
- `createdAt`: UTC timestamp.

Audit logs cannot be modified or deleted through the API by any user.

