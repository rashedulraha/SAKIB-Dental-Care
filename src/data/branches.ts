import { BranchInfo, BranchKey } from "@/types";

export const branchDetails: Record<BranchKey, BranchInfo> = {
  nawhata: {
    nameEn: "Nowhata Branch (Nowhata Bazar)",
    nameBn: "নওহাটা শাখা (নওহাটা বাজার)",
    addressEn:
      "East of Akbari Mosque (Mondol Market Ground Floor), Nowhata Bazar, Paba, Rajshahi",
    addressBn:
      "আকবরী মসজিদের পূর্বে (মন্ডল মার্কেটের নীচ তলা), নওহাটা বাজার, পবা, রাজশাহী",
    shiftBadgeEn: "Day Shift (9:00 AM - 6:00 PM)",
    shiftBadgeBn: "ডে শিফট (সকাল ৯টা - সন্ধ্যা ৬টা)",
    slotsEn: [
      "9:30 AM (Morning)",
      "10:30 AM (Morning)",
      "11:30 AM (Morning)",
      "12:30 PM (Noon)",
      "3:30 PM (Afternoon)",
      "4:30 PM (Afternoon)",
      "5:30 PM (Evening)",
    ],
    slotsBn: [
      "সকাল ৯:৩০ টা",
      "সকাল ১০:৩০ টা",
      "সকাল ১১:৩০ টা",
      "দুপুর ১২:৩০ টা",
      "বিকাল ৩:৩০ টা",
      "বিকাল ৪:৩০ টা",
      "বিকাল ৫:৩০ টা",
    ],
  },
  city: {
    nameEn: "City Branch (Sopura, Rajshahi)",
    nameBn: "শহর শাখা (সপুরা, রাজশাহী)",
    addressEn: "Kasaikhana More, Jinnahnagar, Sopura, Rajshahi",
    addressBn: "কসাইখানা মোড়, জিন্নাহনগর, সপুরা, রাজশাহী",
    shiftBadgeEn: "Evening Shift (7:00 PM - 11:00 PM)",
    shiftBadgeBn: "ইভিনিং শিফট (সন্ধ্যা ৭টা - রাত ১১টা)",
    slotsEn: [
      "7:00 PM (Evening)",
      "7:45 PM (Evening)",
      "8:30 PM (Night)",
      "9:15 PM (Night)",
      "10:00 PM (Night)",
      "10:30 PM (Night)",
    ],
    slotsBn: [
      "সন্ধ্যা ৭:০০ টা",
      "সন্ধ্যা ৭:৪৫ টা",
      "রাত ৮:৩০ টা",
      "রাত ৯:১৫ টা",
      "রাত ১০:০০ টা",
      "রাত ১০:৩০ টা",
    ],
  },
};
