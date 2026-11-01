export interface DoctorSlipData {
  serialId: string;
  patientName: string;
  patientAge?: string;
  patientPhone: string;
  patientAddress?: string;
  branchName: string;
  branchAddress: string;
  branchHours: string;
  serviceTitle: string;
  serviceDuration?: string;
  appointmentDate: string;
  timeSlot: string;
  patientNotes?: string;
  hotline: string;
  whatsappNumber: string;
}

export function generateDoctorSlipHtml(
  data: DoctorSlipData,
  isBn: boolean
): string {
  const issueDate = new Date().toLocaleString(isBn ? "bn-BD" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="${isBn ? "bn" : "en"}">
<head>
  <meta charset="utf-8" />
  <title>Appointment Serial Slip - ${data.serialId}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      padding: 12px;
      font-size: 13px;
      line-height: 1.45;
    }
    .slip-container {
      max-width: 720px;
      margin: 0 auto;
      border: 2px solid #0284c7;
      border-radius: 12px;
      padding: 20px 24px;
      background: #ffffff;
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    .clinic-info h1 {
      font-size: 22px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin-bottom: 2px;
    }
    .clinic-info h2 {
      font-size: 15px;
      font-weight: 700;
      color: #0284c7;
      margin-bottom: 3px;
    }
    .clinic-info p {
      font-size: 11px;
      color: #475569;
    }
    .contact-info {
      text-align: right;
      font-size: 11px;
      color: #334155;
    }
    .contact-info strong {
      color: #0284c7;
      font-size: 12px;
    }
    .serial-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 14px;
    }
    .serial-banner .title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      color: #0369a1;
      letter-spacing: 0.5px;
    }
    .serial-banner .sub {
      font-size: 10.5px;
      color: #64748b;
      margin-top: 2px;
    }
    .serial-banner .number {
      font-size: 22px;
      font-weight: 900;
      font-family: monospace, ui-monospace, sans-serif;
      color: #0284c7;
    }
    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #334155;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 4px;
      margin-bottom: 8px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
    }
    .info-table th, .info-table td {
      padding: 6px 10px;
      border: 1px solid #e2e8f0;
      text-align: left;
      font-size: 12px;
      vertical-align: top;
    }
    .info-table th {
      background: #f8fafc;
      color: #475569;
      font-weight: 700;
      width: 25%;
    }
    .info-table td {
      color: #0f172a;
      font-weight: 600;
    }
    .chamber-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 12px;
    }
    .chamber-box .name {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .chamber-box .details {
      font-size: 11.5px;
      color: #475569;
    }
    .guidelines {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 14px;
    }
    .guidelines h4 {
      font-size: 11px;
      font-weight: 800;
      color: #92400e;
      margin-bottom: 4px;
    }
    .guidelines ol {
      padding-left: 18px;
      font-size: 11px;
      color: #78350f;
      line-height: 1.45;
    }
    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px dashed #cbd5e1;
      padding-top: 14px;
      margin-top: 8px;
    }
    .barcode-area {
      font-family: monospace;
      font-size: 16px;
      letter-spacing: 3px;
      color: #475569;
      font-weight: 900;
    }
    .barcode-area .token-text {
      font-size: 10px;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-top: 2px;
    }
    .signature-box {
      text-align: right;
    }
    .signature-line {
      display: inline-block;
      width: 170px;
      border-bottom: 1px solid #0f172a;
      margin-bottom: 4px;
    }
    .signature-title {
      font-size: 10.5px;
      font-weight: 700;
      color: #334155;
    }
    .signature-sub {
      font-size: 10px;
      color: #64748b;
    }
    .system-notice {
      text-align: center;
      margin-top: 10px;
      font-size: 9.5px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="slip-container">
    <!-- Header Letterhead -->
    <div class="header-bar">
      <div class="clinic-info">
        <h1>SAKIB DENTAL CARE</h1>
        <h2>সাকিব ডেন্টাল কেয়ার • আধুনিক ডিজিটাল চেম্বার</h2>
        <p>১০০% জীবাণুমুক্ত পরিবেশে দন্ত চিকিৎসা ও যত্ন সহকারে দাঁতের এক্স-রে (ডিজিটাল ছবি)</p>
      </div>
      <div class="contact-info">
        <div>সিরিয়াল হটলাইন: <strong>${data.hotline}</strong></div>
        <div>হোয়াটসঅ্যাপ: <strong>${data.whatsappNumber}</strong></div>
        <div>ওয়েবসাইট: sakibdentalcare.com</div>
      </div>
    </div>

    <!-- Official Serial Banner -->
    <div class="serial-banner">
      <div>
        <div class="title">${isBn ? "ডিজিটাল অ্যাপয়েন্টমেন্ট সিরিয়াল স্লিপ" : "Official Appointment Serial Slip"}</div>
        <div class="sub">${isBn ? "ইস্যু সময়:" : "Issued On:"} ${issueDate} • ${isBn ? "অনলাইন ভেরিফাইড" : "Online Verified"}</div>
      </div>
      <div class="number">${data.serialId}</div>
    </div>

    <!-- Chamber & Schedule Info -->
    <div class="chamber-box">
      <div class="name">🏥 ${data.branchName}</div>
      <div class="details">
        📍 <strong>ঠিকানা:</strong> ${data.branchAddress}<br />
        ⏰ <strong>রোগী দেখার সময়:</strong> ${data.branchHours} | 
        📅 <strong>তারিখ:</strong> ${data.appointmentDate} | 
        🕒 <strong>শিফট/সময়:</strong> ${data.timeSlot}
      </div>
    </div>

    <!-- Patient Information Table -->
    <div class="section-title">${isBn ? "রোগীর বিবরণ ও সেবা" : "Patient & Treatment Details"}</div>
    <table class="info-table">
      <tr>
        <th>${isBn ? "রোগীর নাম" : "Patient Name"}</th>
        <td>${data.patientName || "-"} ${data.patientAge ? `(${data.patientAge} ${isBn ? "বছর" : "yrs"})` : ""}</td>
        <th>${isBn ? "মোবাইল নম্বর" : "Mobile Phone"}</th>
        <td>${data.patientPhone || "-"}</td>
      </tr>
      <tr>
        <th>${isBn ? "রোগীর ঠিকানা" : "Patient Address"}</th>
        <td>${data.patientAddress || (isBn ? "উল্লেখ নেই" : "Not specified")}</td>
        <th>${isBn ? "চিকিৎসা সেবা" : "Treatment"}</th>
        <td>${data.serviceTitle} ${data.serviceDuration ? `(${data.serviceDuration})` : ""}</td>
      </tr>
      ${
        data.patientNotes
          ? `<tr>
        <th>${isBn ? "সমস্যার বিবরণ" : "Symptom Note"}</th>
        <td colspan="3">${data.patientNotes}</td>
      </tr>`
          : ""
      }
    </table>

    <!-- Patient Guidelines -->
    <div class="guidelines">
      <h4>📌 ${isBn ? "রোগীদের জন্য প্রয়োজনীয় নির্দেশনা:" : "Important Patient Guidelines:"}</h4>
      <ol>
        <li>${isBn ? "অনুগ্রহ করে আপনার নির্ধারিত সময়ের অন্তত ১০-১৫ মিনিট পূর্বে চেম্বারে উপস্থিত থাকুন।" : "Please arrive at the chamber at least 10–15 minutes before your scheduled appointment time."}</li>
        <li>${isBn ? "পূর্ববর্তী কোনো ব্যবস্থাপত্র (প্রেসক্রিপশন), এক্স-রে ফিল্ম বা টেস্ট রিপোর্ট থাকলে সাথে নিয়ে আসুন।" : "Bring any previous dental prescriptions, treatment records, or X-Ray films if available."}</li>
        <li>${isBn ? "শুক্রবার চেম্বার বন্ধ থাকে। কোনো কারণে সিরিয়াল পরিবর্তন বা বাতিল করতে হলে আমাদের সিরিয়াল হটলাইনে যোগাযোগ করুন: 01733-054717।" : "Both branches are closed on Fridays. For rescheduling or queries, call hotline: 01733-054717."}</li>
      </ol>
    </div>

    <!-- Footer Bar & Doctor Signature -->
    <div class="footer-bar">
      <div class="barcode-area">
        |||||| | |||| ||| |||||| | ||||
        <div class="token-text">TOKEN VERIFIED: ${data.serialId} • SAKIB DENTAL</div>
      </div>
      <div class="signature-box">
        <div class="signature-line"></div>
        <div class="signature-title">${isBn ? "অনুমোদিত সিল ও স্বাক্ষর" : "Authorized Seal & Signature"}</div>
        <div class="signature-sub">Sakib Dental Care Chamber</div>
      </div>
    </div>

    <div class="system-notice">
      ${isBn ? "এটি একটি ডিজিটাল কম্পিউটার-জেনারেটেড সিরিয়াল স্লিপ। এটি চেম্বার রিসেপশনে প্রদর্শনের জন্য চূড়ান্ত।" : "This is an official computer-generated appointment serial pass. Present this at the reception desk."}
    </div>
  </div>
</body>
</html>`;
}

export function printDoctorSlip(slipHtml: string): void {
  // Remove any previously created print iframe
  const existingFrame = document.getElementById("doctor-slip-print-frame");
  if (existingFrame) {
    existingFrame.remove();
  }

  const iframe = document.createElement("iframe");
  iframe.id = "doctor-slip-print-frame";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  doc.open();
  doc.write(slipHtml);
  doc.close();

  // Allow styles and DOM in iframe to settle, then open print dialog
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    // Clean up iframe after printing dialog closes
    setTimeout(() => {
      iframe.remove();
    }, 2000);
  }, 250);
}

