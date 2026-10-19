"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import { dentalServices } from "@/data/services";
import { branchDetails } from "@/data/branches";
import { toBanglaDigits } from "@/data/translations";

export const BookingSection: React.FC = () => {
  const {
    currentLang,
    t,
    selectedBranch,
    setSelectedBranch,
    selectedServiceId,
    setSelectedServiceId,
  } = useLanguage();
  const { showToast } = useToast();

  const [patientName, setPatientName] = useState<string>("");
  const [patientAge, setPatientAge] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string>("");
  const [patientNotes, setPatientNotes] = useState<string>("");
  const [serialId, setSerialId] = useState<string>("#SDC-2601");
  const [isFridayWarning, setIsFridayWarning] = useState<boolean>(false);

  // Initialize date and serial ID on client mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setBookingDate(today);

    const randNum = Math.floor(1000 + Math.random() * 9000);
    setSerialId(`#SDC-${randNum}`);
  }, []);

  const bInfo = branchDetails[selectedBranch];
  const slots = currentLang === "bn" ? bInfo.slotsBn : bInfo.slotsEn;

  // Set default slot if none or branch changed
  useEffect(() => {
    if (slots && slots.length > 0) {
      setBookingTimeSlot(slots[0]);
    }
  }, [selectedBranch, currentLang, slots]);

  // Check Friday warning
  useEffect(() => {
    if (bookingDate && selectedBranch === "nawhata") {
      const chosen = new Date(bookingDate);
      setIsFridayWarning(chosen.getDay() === 5);
    } else {
      setIsFridayWarning(false);
    }
  }, [bookingDate, selectedBranch]);

  const selectedServiceObj =
    dentalServices.find((s) => s.id === selectedServiceId) || dentalServices[0];

  const buildFormattedBookingText = () => {
    const name = patientName.trim() || "Not specified";
    const age = patientAge.trim() || "-";
    const phone = patientPhone.trim() || "Not specified";
    const serviceTitle =
      currentLang === "bn" ? selectedServiceObj.titleBn : selectedServiceObj.titleEn;
    const branchName = currentLang === "bn" ? bInfo.nameBn : bInfo.nameEn;
    const branchAddress = currentLang === "bn" ? bInfo.addressBn : bInfo.addressEn;

    if (currentLang === "bn") {
      return `আসসালামু আলাইকুম,
আমি *সাকিব ডেন্টাল কেয়ার (Sakib Dental Care)*-এ একটি অ্যাপয়েন্টমেন্ট / সিরিয়াল নিতে চাই:

📋 *সিরিয়াল আইডি:* ${serialId}
🏥 *নির্বাচিত শাখা:* ${branchName}
📍 *ঠিকানা:* ${branchAddress}
👤 *রোগীর নাম:* ${name} (বয়স: ${age})
📞 *মোবাইল:* ${phone}
🦷 *চিকিৎসার ধরন:* ${serviceTitle}
📅 *তারিখ:* ${bookingDate}
⏰ *সময়:* ${bookingTimeSlot}
${patientNotes.trim() ? `📝 *সমস্যার বিবরণ:* ${patientNotes.trim()}` : ""}

অনুগ্রহ করে আমার সিরিয়ালটি নিশ্চিত করবেন। ধন্যবাদ!`;
    }

    return `Assalamu Alaikum / Hello,
I would like to book a dental appointment at *Sakib Dental Care (সাকিব ডেন্টাল কেয়ার)*:

📋 *Serial ID:* ${serialId}
🏥 *Selected Branch:* ${bInfo.nameEn} (${bInfo.nameBn})
📍 *Location:* ${bInfo.addressEn}
👤 *Patient Name:* ${name} (Age: ${age})
📞 *Mobile:* ${phone}
🦷 *Treatment:* ${serviceTitle}
📅 *Date:* ${bookingDate}
⏰ *Time Slot:* ${bookingTimeSlot}
${patientNotes.trim() ? `📝 *Notes/Symptoms:* ${patientNotes.trim()}` : ""}

Please confirm my appointment serial. Thank you!`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildFormattedBookingText();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/8801733054717?text=${encoded}`;

    showToast(
      currentLang === "bn" ? "WhatsApp ওপেন হচ্ছে!" : "Opening WhatsApp!",
      currentLang === "bn"
        ? "আপনার সিরিয়ালের সকল তথ্য WhatsApp মেসেজে প্রস্তুত করা হয়েছে।"
        : "Your appointment serial slip has been formatted for WhatsApp (01733-054717)."
    );

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopy = () => {
    const text = buildFormattedBookingText();
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast(
          currentLang === "bn" ? "কপি সম্পন্ন হয়েছে!" : "Copied to Clipboard!",
          currentLang === "bn"
            ? "সিরিয়ালের তথ্য ক্লিপবোর্ডে কপি হয়েছে।"
            : "Appointment serial details copied to your clipboard."
        );
      })
      .catch(() => {
        showToast("Ready", "Please click the WhatsApp button to send your serial.");
      });
  };

  const isBn = currentLang === "bn";

  return (
    <section id="booking" className="scroll-mt-24">
      <div className="apple-glass-strong rounded-[28px] sm:rounded-[36px] p-4 xs:p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            <i className="ph-fill ph-whatsapp-logo" />
            <span>{t("bookingBadge")}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t("bookingTitle")}
          </h2>
          <p
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: t("bookingSub") }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Booking Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
            {/* Step 1: Branch Selector */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                <span>{t("formStep1Label")}</span>
                <span className="text-rose-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedBranch("nawhata")}
                  className={`text-left p-4 rounded-2xl transition-all flex items-start gap-3 shadow-md ${
                    selectedBranch === "nawhata"
                      ? "border-2 border-sky-500 bg-sky-500/15"
                      : "border border-slate-300/60 dark:border-white/15 apple-glass-subtle hover:border-sky-400"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-fill ph-sun text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {t("formB1Title")}
                    </p>
                    <p className="text-xs text-sky-700 dark:text-sky-300 font-semibold">
                      {t("formB1Hours")}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t("formB1Sub")}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBranch("city")}
                  className={`text-left p-4 rounded-2xl transition-all flex items-start gap-3 shadow-md ${
                    selectedBranch === "city"
                      ? "border-2 border-indigo-500 bg-indigo-500/15"
                      : "border border-slate-300/60 dark:border-white/15 apple-glass-subtle hover:border-indigo-400"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-fill ph-moon-stars text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {t("formB2Title")}
                    </p>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">
                      {t("formB2Hours")}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t("formB2Sub")}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Patient Name, Age & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-6 space-y-1.5">
                <label
                  htmlFor="patientName"
                  className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  <span>{t("formNameLabel")}</span>
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="patientName"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder={isBn ? "যেমন: মোঃ রফিকুল ইসলাম" : "e.g. Md. Rafiqul Islam"}
                  className="w-full apple-input rounded-xl px-4 py-3 text-sm font-medium"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label
                  htmlFor="patientAge"
                  className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  <span>{t("formAgeLabel")}</span>
                </label>
                <input
                  type="number"
                  id="patientAge"
                  min="1"
                  max="110"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder={isBn ? "২৮" : "28"}
                  className="w-full apple-input rounded-xl px-3 py-3 text-sm font-medium"
                />
              </div>

              <div className="sm:col-span-4 space-y-1.5">
                <label
                  htmlFor="patientPhone"
                  className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  <span>{t("formPhoneLabel")}</span>
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  id="patientPhone"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full apple-input rounded-xl px-4 py-3 text-sm font-medium"
                />
              </div>
            </div>

            {/* Step 3: Service Selection & Preferred Date/Time */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-6 space-y-1.5">
                <label
                  htmlFor="serviceSelect"
                  className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  <span>{t("formServiceLabel")}</span>
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <select
                  id="serviceSelect"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(Number(e.target.value))}
                  className="w-full apple-input rounded-xl px-3.5 py-3 text-sm font-medium"
                >
                  {dentalServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {isBn
                        ? `${toBanglaDigits(s.id)}. ${s.titleBn}`
                        : currentLang === "en"
                        ? `${s.id}. ${s.titleEn}`
                        : `${s.id}. ${s.titleEn} (${s.titleBn})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label
                  htmlFor="bookingDate"
                  className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  <span>{t("formDateLabel")}</span>
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  id="bookingDate"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full apple-input rounded-xl px-3 py-3 text-sm font-medium"
                />
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label
                  htmlFor="bookingTimeSlot"
                  className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  <span>{t("formTimeLabel")}</span>
                  <span className="text-rose-500 ml-1">*</span>
                </label>
                <select
                  id="bookingTimeSlot"
                  value={bookingTimeSlot}
                  onChange={(e) => setBookingTimeSlot(e.target.value)}
                  className="w-full apple-input rounded-xl px-3 py-3 text-sm font-medium"
                >
                  {slots.map((slot, idx) => (
                    <option key={idx} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Friday Warning Banner */}
            {isFridayWarning && (
              <div
                id="fridayWarningBox"
                className="rounded-2xl bg-amber-500/15 border border-amber-500/40 p-3.5 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2.5"
              >
                <i className="ph-fill ph-warning-circle text-lg text-amber-500 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: t("fridayWarningText") }} />
              </div>
            )}

            {/* Step 4: Optional Notes / Symptoms */}
            <div className="space-y-1.5">
              <label
                htmlFor="patientNotes"
                className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200"
              >
                <span>{t("formNotesLabel")}</span>
              </label>
              <textarea
                id="patientNotes"
                rows={2}
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                placeholder={
                  isBn
                    ? "যেমন: ঠান্ডা বা গরম পানি খেলে দাঁতে তীব্র শিরশির করে, অথবা দাঁতের এক্স-রে করতে চাই..."
                    : "e.g. Severe tooth sensitivity to cold water, or need a Dental X-Ray..."
                }
                className="w-full apple-input rounded-xl px-4 py-2.5 text-sm font-medium"
              />
            </div>

            {/* Submit & Copy Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:flex-1 sm:min-w-[200px] inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <i className="ph-fill ph-whatsapp-logo text-2xl" />
                <span>{t("formSubmitWhatsapp")}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto apple-glass hover:bg-white/80 dark:hover:bg-white/15 font-bold py-4 px-5 rounded-2xl inline-flex items-center justify-center gap-2 text-sm transition-all"
              >
                <i className="ph-bold ph-copy text-lg text-sky-500" />
                <span>{t("formCopyBtn")}</span>
              </button>
            </div>
          </form>

          {/* Right: Apple Wallet Style Live Appointment Token Preview */}
          <div className="lg:col-span-5">
            <div
              id="printableTokenArea"
              className="apple-glass rounded-2xl sm:rounded-[28px] p-4 xs:p-6 border-2 border-white/60 dark:border-white/15 shadow-2xl space-y-4 sm:space-y-5 relative overflow-hidden"
            >
              {/* Top Pass Header */}
              <div className="flex items-center justify-between border-b border-dashed border-slate-300 dark:border-slate-700 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white">
                    <i className="ph-fill ph-tooth text-xl" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {t("tokenHeaderClinic")}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t("tokenHeaderSub")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {t("tokenSerialLabel")}
                  </span>
                  <span
                    id="tokenSerialId"
                    className="text-sm font-mono font-extrabold text-sky-600 dark:text-sky-400"
                  >
                    {serialId}
                  </span>
                </div>
              </div>

              {/* Selected Branch Highlight in Pass */}
              <div
                id="tokenBranchBanner"
                className="rounded-2xl bg-sky-500/15 border border-sky-500/30 p-3.5 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-sky-700 dark:text-sky-300">
                    {t("tokenSelectedChamber")}
                  </span>
                  <span
                    id="tokenShiftBadge"
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white"
                  >
                    {isBn ? bInfo.shiftBadgeBn : bInfo.shiftBadgeEn}
                  </span>
                </div>
                <p
                  id="tokenBranchName"
                  className="font-extrabold text-base text-slate-900 dark:text-white"
                >
                  {isBn
                    ? bInfo.nameBn
                    : currentLang === "en"
                    ? bInfo.nameEn
                    : `${bInfo.nameEn} (${bInfo.nameBn})`}
                </p>
                <p id="tokenBranchAddress" className="text-xs text-slate-600 dark:text-slate-300">
                  {isBn ? bInfo.addressBn : bInfo.addressEn}
                </p>
              </div>

              {/* Patient Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="apple-glass-subtle rounded-xl p-3">
                  <span className="text-[11px] text-slate-400 block">
                    {t("tokenPatientLabel")}
                  </span>
                  <p
                    id="tokenPatientName"
                    className="font-bold text-slate-900 dark:text-white truncate mt-0.5"
                  >
                    {patientName.trim()
                      ? patientAge.trim()
                        ? isBn
                          ? `${patientName.trim()} (${toBanglaDigits(patientAge.trim())} বছর)`
                          : `${patientName.trim()} (${patientAge.trim()} yrs)`
                        : patientName.trim()
                      : isBn
                      ? "আপনার নাম লিখুন"
                      : "Enter your name"}
                  </p>
                </div>
                <div className="apple-glass-subtle rounded-xl p-3">
                  <span className="text-[11px] text-slate-400 block">{t("tokenPhoneLabel")}</span>
                  <p
                    id="tokenPatientPhone"
                    className="font-bold text-slate-900 dark:text-white truncate mt-0.5"
                  >
                    {patientPhone.trim() || "01XXXXXXXXX"}
                  </p>
                </div>
                <div className="apple-glass-subtle rounded-xl p-3">
                  <span className="text-[11px] text-slate-400 block">{t("tokenDateLabel")}</span>
                  <p id="tokenDateDisplay" className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {bookingDate || (isBn ? "আজকের তারিখ" : "Today")}
                  </p>
                </div>
                <div className="apple-glass-subtle rounded-xl p-3">
                  <span className="text-[11px] text-slate-400 block">{t("tokenTimeLabel")}</span>
                  <p
                    id="tokenTimeDisplay"
                    className="font-bold text-sky-600 dark:text-sky-400 mt-0.5"
                  >
                    {bookingTimeSlot || "9:30 AM"}
                  </p>
                </div>
              </div>

              {/* Selected Treatment */}
              <div className="apple-glass-subtle rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">
                  {t("tokenTreatmentLabel")}
                </span>
                <p
                  id="tokenServiceDisplay"
                  className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5"
                >
                  {isBn
                    ? selectedServiceObj.titleBn
                    : currentLang === "en"
                    ? selectedServiceObj.titleEn
                    : `${selectedServiceObj.titleEn} (${selectedServiceObj.titleBn})`}
                </p>
              </div>

              {/* Pass Footer & Print Action */}
              <div className="pt-3 border-t border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between gap-2 text-xs">
                <div>
                  <p className="font-bold text-slate-700 dark:text-slate-200">
                    WhatsApp: 01733-054717
                  </p>
                  <p className="text-[11px] text-slate-500">Serial Hotline: 01688-434676</p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl apple-glass-subtle hover:bg-sky-500 hover:text-white font-bold transition-colors"
                >
                  <i className="ph-bold ph-printer" />
                  <span>{t("tokenPrintBtn")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
