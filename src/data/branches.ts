import { BranchInfo, BranchKey } from "@/types";

export const branchDetails: Record<BranchKey, BranchInfo> = {
  nawhata: {
    nameEn: "Nowhata Branch (Nowhata Bazar)",
    nameBn: "নওহাটা শাখা (নওহাটা বাজার)",
    addressEn:
      "East of Akbari Mosque (Mondol Market Ground Floor), Nowhata Bazar, Paba, Rajshahi",
    addressBn:
      "আকবরী মসজিদের পূর্বে (মন্ডল মার্কেটের নীচ তলা), নওহাটা বাজার, পবা, রাজশাহী",
    shiftBadgeEn: "9:00 AM – 9:00 PM (Friday Closed)",
    shiftBadgeBn: "সকাল ৯:০০ টা – রাত ৯:০০ টা (শুক্রবার বন্ধ)",
    slotsEn: [
      "9:30 AM (Morning)",
      "11:00 AM (Morning)",
      "12:30 PM (Noon)",
      "3:30 PM (Afternoon)",
      "5:00 PM (Afternoon)",
      "6:30 PM (Evening)",
      "7:45 PM (Night)",
      "8:30 PM (Night)",
    ],
    slotsBn: [
      "সকাল ৯:৩০ টা",
      "সকাল ১১:০০ টা",
      "দুপুর ১২:৩০ টা",
      "বিকাল ৩:৩০ টা",
      "বিকাল ৫:০০ টা",
      "সন্ধ্যা ৬:৩০ টা",
      "রাত ৭:৪৫ টা",
      "রাত ৮:৩০ টা",
    ],
  },
  city: {
    nameEn: "City Branch (Sopura, Rajshahi)",
    nameBn: "শহর শাখা (সপুরা, রাজশাহী)",
    addressEn: "Kasaikhana More, Jinnahnagar, Sopura, Rajshahi",
    addressBn: "কসাইখানা মোড়, জিন্নাহনগর, সপুরা, রাজশাহী",
    shiftBadgeEn: "Evening Shift (5:00 PM – 10:00 PM)",
    shiftBadgeBn: "ইভিনিং শিফট (বিকাল ৫:০০ টা – রাত ১০:০০ টা)",
    slotsEn: [
      "5:00 PM (Evening)",
      "6:00 PM (Evening)",
      "7:00 PM (Evening)",
      "8:00 PM (Night)",
      "9:00 PM (Night)",
      "9:30 PM (Night)",
    ],
    slotsBn: [
      "বিকাল ৫:০০ টা",
      "সন্ধ্যা ৬:০০ টা",
      "সন্ধ্যা ৭:০০ টা",
      "রাত ৮:০০ টা",
      "রাত ৯:০০ টা",
      "রাত ৯:৩০ টা",
    ],
  },
};
