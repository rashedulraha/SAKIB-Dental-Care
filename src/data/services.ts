import { DentalService } from "@/types";

export const dentalServices: DentalService[] = [
  {
    id: 1,
    titleEn: "Disease Diagnosis Using Ultra-Modern Technology",
    titleBn: "অত্যাধুনিক প্রযুক্তির মাধ্যমে রোগ নির্ণয় করা",
    category: "diagnostic",
    icon: "ph-magnifying-glass-plus",
    color: "sky",
    shortDescEn:
      "Comprehensive oral examination using intraoral cameras and digital diagnostic tools to accurately detect tooth decay, gum disease, and root issues early.",
    shortDescBn:
      "অত্যাধুনিক ডেন্টাল ক্যামেরা ও ডিজিটাল পরীক্ষার মাধ্যমে দাঁত ও মাড়ির সঠিক রোগ নির্ণয় এবং সম্পূর্ণ ট্রিটমেন্ট প্ল্যান।",
    durationEn: "15 – 20 Mins",
    durationBn: "১৫ – ২০ মিনিট",
    techEn: "Digital Intraoral Diagnostic Unit",
    techBn: "ডিজিটাল ডায়াগনস্টিক ইউনিট",
    careTipEn:
      "Schedule a routine dental checkup every 6 months to catch cavities before they cause severe pain.",
    careTipBn:
      "দাঁতে ব্যথা শুরু হওয়ার আগেই প্রতি ৬ মাসে অন্তত একবার দাঁত ও মাড়ি পরীক্ষা করানো উত্তম।",
  },
  {
    id: 2,
    titleEn: "Advanced Root Canal Treatment (RCT)",
    titleBn: "উন্নত প্রযুক্তির মাধ্যমে রুট ক্যানাল ট্রিটমেন্ট",
    category: "restorative",
    icon: "ph-tooth",
    color: "indigo",
    shortDescEn:
      "Save severely infected or painful teeth without extraction using precision rotary endodontics, electronic apex locators, and digital X-ray guidance.",
    shortDescBn:
      "তীব্র দাঁতের ব্যথা বা ইনফেকশন হওয়া দাঁত না ফেলে আধুনিক রোটারি ও এপেক্স লোকেটর প্রযুক্তির সাহায্যে ব্যথামুক্ত রুট ক্যানাল চিকিৎসা।",
    durationEn: "45 – 60 Mins",
    durationBn: "৪৫ – ৬০ মিনিট",
    techEn: "Rotary Endomotor & Apex Locator",
    techBn: "এন্ডোমোটর ও ডিজিটাল এক্স-রে গাইডেড",
    careTipEn:
      "After completing Root Canal Treatment, placing a protective dental crown (cap) is strongly recommended for long-term strength.",
    careTipBn:
      "রুট ক্যানাল সম্পন্ন করার পর দাঁতটিকে মজবুত রাখতে অবশ্যই ডেন্টাল ক্রাউন (ক্যাপ) পরানো উচিত।",
  },
  {
    id: 3,
    titleEn: "Ultrasonic Dental Scaling & Polishing",
    titleBn: "আল্ট্রাসনিক মেশিনের মাধ্যমে স্কেলিং করা",
    category: "cosmetic",
    icon: "ph-sparkle",
    color: "teal",
    shortDescEn:
      "Gently remove hardened tartar (calculus), stubborn plaque, yellow stains, bleeding gums, and bad breath using high-frequency ultrasonic scaling.",
    shortDescBn:
      "দাঁতের গোড়ায় জমে থাকা পাথর (Calculus), হলদে ভাব, কালচে দাগ এবং মাড়ি থেকে রক্ত পড়া ও মুখের দুর্গন্ধ দূর করতে আল্ট্রাসনিক স্কেলিং।",
    durationEn: "30 – 40 Mins",
    durationBn: "৩০ – ৪০ মিনিট",
    techEn: "Piezo Ultrasonic Scaler & Polisher",
    techBn: "আল্ট্রাসনিক পিজো স্কেলার ও পলিশার",
    careTipEn:
      "Ultrasonic scaling protects gums from recession and prevents premature tooth loosening.",
    careTipBn:
      "স্কেলিং করার পর মাড়ি সুস্থ থাকে এবং দাঁত নড়ে যাওয়া বা অকালে পড়ে যাওয়া থেকে রক্ষা পায়।",
  },
  {
    id: 4,
    titleEn: "Laser Tooth-Color Matching Aesthetic Filling",
    titleBn: "লেজার মাধ্যমে দাঁতের কালার ম্যাচিং ফিলিং করা",
    category: "cosmetic",
    icon: "ph-magic-wand",
    color: "rose",
    shortDescEn:
      "Restore chipped, decayed, or gapped front and back teeth with nano-hybrid composite fillings cured by LED laser light to match your natural tooth shade 100%.",
    shortDescBn:
      "সামনের বা মাড়ির ভাঙা, ক্ষয় হওয়া ও ফাঁকা দাঁতে আসল দাঁতের রঙের সাথে ১০০% মিল রেখে লেজার লাইট-কিউর কম্পোজিট ফিলিং।",
    durationEn: "25 – 35 Mins",
    durationBn: "২৫ – ৩৫ মিনিট",
    techEn: "LED Laser Curing & Nano-Composite",
    techBn: "LED লেজার কিউরিং ও ন্যানো-কম্পোজিট",
    careTipEn:
      "Laser shade-matched fillings bond directly to enamel and blend invisibly when you smile.",
    careTipBn:
      "লেজার ফিলিং করার পর বাইরে থেকে বোঝাই যায় না যে দাঁতে ফিলিং করা হয়েছে—হাসি থাকে একদম প্রাকৃতিক।",
  },
  {
    id: 5,
    titleEn: "Restoring Teeth with Crown & Bridge Prosthetics",
    titleBn: "ক্রাউন এবং ব্রিজের মাধ্যমে দাঁত পূর্বাবস্থায় ফিরিয়ে আনা",
    category: "cosmetic",
    icon: "ph-crown",
    color: "amber",
    shortDescEn:
      "Bring damaged, root-canal-treated, or missing teeth back to full chewing strength and natural aesthetics using custom Zirconia and Porcelain Crowns & Bridges.",
    shortDescBn:
      "রুট ক্যানাল করা দাঁত বা ফেলে দেওয়া ফাঁকা দাঁতের স্থানে জিরকোনিয়া ও পোরসেলিন ক্রাউন এবং ব্রিজ বসিয়ে আগের মতো চিবানোর ক্ষমতা ফিরিয়ে আনা।",
    durationEn: "2 Visits (Impression & Fit)",
    durationBn: "২ টি ভিজিট (মাপ ও ফিক্সিং)",
    techEn: "Zirconia & Ceramic Prosthetics",
    techBn: "হাই-স্ট্রেন্থ পোরসেলিন ও জিরকোনিয়া ক্যাপ",
    careTipEn:
      "Replacing missing teeth with a bridge prevents neighboring teeth from shifting out of alignment.",
    careTipBn:
      "হারিয়ে যাওয়া দাঁতের ফাঁকা স্থান পূরণ না করলে পাশের দাঁতগুলো বেঁকে যেতে পারে, তাই ব্রিজ বা ক্যাপ অত্যন্ত জরুরি।",
  },
  {
    id: 6,
    titleEn: "Permanent & Temporary Dental Fillings of All Types",
    titleBn: "স্থায়ী ও অস্থায়ী সকল ধরনের ফিলিং করা",
    category: "restorative",
    icon: "ph-shield-check",
    color: "emerald",
    shortDescEn:
      "Complete cavity restoration using imported Glass Ionomer, Composite, and medicated temporary fillings to stop food lodgment and tooth sensitivity.",
    shortDescBn:
      "দাঁতে পোকা লাগা (Cavity) বা গর্ত হওয়া দাঁতে খাবার আটকে যাওয়া এবং শিরশিরানি বন্ধ করতে দীর্ঘস্থায়ী গ্লাস আয়নোমার ও কম্পোজিট ফিলিং।",
    durationEn: "20 – 30 Mins",
    durationBn: "২০ – ৩০ মিনিট",
    techEn: "Imported Biocompatible Restoratives",
    techBn: "আমদানিকৃত বায়োকম্প্যাটিবল ফিলিং ম্যাটেরিয়াল",
    careTipEn:
      "Treating a small cavity early with a permanent filling prevents deep nerve infection and saves cost.",
    careTipBn:
      "দাঁতে ছোট কালো গর্ত দেখা মাত্রই ফিলিং করে নিলে ভবিষ্যতে রুট ক্যানালের প্রয়োজন হয় না।",
  },
  {
    id: 7,
    titleEn: "Complete Pediatric / Children's Dental Care",
    titleBn: "বাচ্চাদের যেকোনো ধরনের চিকিৎসা করা",
    category: "diagnostic",
    icon: "ph-baby",
    color: "sky",
    shortDescEn:
      "Friendly, fear-free dental care for children including milk-tooth cavity fillings, pulpotomy, pain relief, fluoride protection, and guided eruption of permanent teeth.",
    shortDescBn:
      "ছোট বাচ্চাদের দুধ দাঁতে পোকা, ব্যথা, মাড়ি ফোলা বা আঁকাবাঁকা নতুন দাঁত ওঠার সমস্যায় অত্যন্ত যত্ন ও আদরের সাথে ভীতিহীন চিকিৎসা।",
    durationEn: "15 – 25 Mins",
    durationBn: "১৫ – ২৫ মিনিট",
    techEn: "Child-Friendly Painless Pediatric Care",
    techBn: "শিশু-বান্ধব পেইনলেস পেডিয়াট্রিক কেয়ার",
    careTipEn:
      "Healthy milk teeth guide permanent teeth into straight positions—never ignore a child's toothache.",
    careTipBn:
      "বাচ্চাদের দুধ দাঁত সময়ের আগে নষ্ট হলে স্থায়ী দাঁত বাঁকা হয়ে ওঠে, তাই দ্রুত চিকিৎসা নেওয়া প্রয়োজন।",
  },
  {
    id: 8,
    titleEn: "Painless Tooth Extraction & Minor Oral Surgery",
    titleBn: "ব্যাথামুক্ত উপায়ে দাঁত তোলা",
    category: "ortho-surgical",
    icon: "ph-first-aid",
    color: "rose",
    shortDescEn:
      "Safe, trauma-free extraction of severely mobile teeth, broken roots, or impacted wisdom teeth using modern local anesthesia in a 100% sterile environment.",
    shortDescBn:
      "অতিরিক্ত নড়ে যাওয়া দাঁত, ভাঙা শিকড় অথবা আক্কেল দাঁতের জটিল সমস্যায় আধুনিক লোকাল অ্যানেস্থেসিয়ার মাধ্যমে সম্পূর্ণ ব্যথামুক্তভাবে দাঁত তোলা।",
    durationEn: "15 – 30 Mins",
    durationBn: "১৫ – ৩০ মিনিট",
    techEn: "Sterile Atraumatic Extraction Protocol",
    techBn: "জীবাণুমুক্ত সার্জিক্যাল এক্সট্রাকশন প্রোটোকল",
    careTipEn:
      "Bite firmly on the sterile gauze pad for 45 minutes post-extraction and avoid hot food for 24 hours.",
    careTipBn:
      "দাঁত তোলার পর তুলা অন্তত ৪৫ মিনিট চেপে রাখুন এবং ২৪ ঘণ্টা গরম খাবার বা কুলি করা থেকে বিরত থাকুন।",
  },
  {
    id: 9,
    titleEn: "Orthodontic Treatment for Crooked / Misaligned Teeth",
    titleBn: "আঁকাবাঁকা দাঁতের চিকিৎসা করা",
    category: "ortho-surgical",
    icon: "ph-smiley-wink",
    color: "indigo",
    shortDescEn:
      "Straighten crowded, protruding, or gapped teeth into a harmonious, confident smile using modern metal and aesthetic ceramic orthodontic braces.",
    shortDescBn:
      "উঁচু-নিচু, ফাঁকা বা আঁকাবাঁকা দাঁত সুশৃঙ্খল ও সুন্দর করতে আধুনিক অর্থোডন্টিক ব্রেসেস এবং অ্যালাইনমেন্ট চিকিৎসা।",
    durationEn: "Scheduled Monthly Follow-ups",
    durationBn: "পরিকল্পনা অনুযায়ী নিয়মিত ফলোআপ",
    techEn: "Precision Orthodontic Braces System",
    techBn: "মেটাল ও সিরামিক অর্থোডন্টিক সিস্টেম",
    careTipEn:
      "Starting orthodontic alignment early in adolescence or young adulthood delivers faster, lasting results.",
    careTipBn:
      "কম বয়সে আঁকাবাঁকা দাঁতের চিকিৎসা শুরু করলে খুব দ্রুত ও চমৎকার ফলাফল পাওয়া যায়।",
  },
  {
    id: 10,
    titleEn: "Careful Digital Dental X-Ray & Radiographic Imaging",
    titleBn: "যত্ন সহকারে দাঁতের এক্স-রে (ছবি) করা",
    category: "diagnostic",
    icon: "ph-scan",
    color: "rose",
    shortDescEn:
      "High-precision dental X-rays performed right at our clinic with utmost care to inspect hidden root canals, bone levels, cysts, and impacted wisdom teeth.",
    shortDescBn:
      "দাঁতের ভেতরের শিকড়, ইনফেকশন, হাড়ের ক্ষয় বা আক্কেল দাঁতের অবস্থান নিখুঁতভাবে দেখার জন্য চেম্বারেই যত্ন সহকারে দাঁতের এক্স-রে (ছবি) করা হয়।",
    durationEn: "5 – 10 Mins",
    durationBn: "৫ – ১০ মিনিট",
    techEn: "Low-Radiation High-Clarity Dental X-Ray",
    techBn: "লো-রেডিয়েশন হাই-ক্লিয়ারিটি ডেন্টাল এক্স-রে",
    careTipEn:
      "On-site dental X-ray imaging ensures 100% diagnostic accuracy before starting root canals or extractions.",
    careTipBn:
      "সঠিক এক্স-রে ছবির মাধ্যমে চোখের আড়ালে থাকা দাঁতের সমস্যা ১০০% নির্ভুলভাবে শনাক্ত করা যায়।",
  },
];
