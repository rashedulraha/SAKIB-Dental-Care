import { SymptomItem } from "@/types";

export const symptomData: SymptomItem[] = [
  {
    id: "pain",
    serviceId: 2,
    symptomEn: "Severe Toothache & Hot/Cold Sensitivity",
    symptomBn: "দাঁতে তীব্র ব্যথা ও ঠান্ডা-গরমে শিরশিরানি",
    icon: "ph-lightning",
    causeEn:
      "Deep dental caries (cavities) reaching the inner pulp nerve cause throbbing pain, especially at night or when drinking hot/cold liquids.",
    causeBn:
      "দাঁতের গভীর ক্যাভিটি (গর্ত) থেকে পাল্প বা নার্ভে ইনফেকশন ছড়িয়ে পড়লে এমন তীব্র ব্যথা হয়, বিশেষ করে রাতে ব্যথা বাড়ে।",
    recEn: "Advanced Root Canal Treatment (RCT)",
    recBn: "উন্নত প্রযুক্তির মাধ্যমে রুট ক্যানাল ট্রিটমেন্ট (RCT)",
    secEn: "Careful Digital Dental X-Ray (Imaging)",
    secBn: "যত্ন সহকারে দাঁতের এক্স-রে (ছবি) করা",
    stepsEn: [
      "First, an on-site Digital Dental X-Ray is taken to inspect the exact root canal anatomy and infection.",
      "Next, painless Root Canal Treatment cleans the infection and preserves your natural tooth.",
    ],
    stepsBn: [
      "প্রথমে দাঁতের একটি ডিজিটাল এক্স-রে (ছবি) করে শিকড়ের অবস্থা দেখা হবে।",
      "এরপর সম্পূর্ণ ব্যথামুক্তভাবে উন্নত প্রযুক্তিতে রুট ক্যানাল ট্রিটমেন্ট করে আপনার প্রাকৃতিক দাঁতটি রক্ষা করা হবে।",
    ],
  },
  {
    id: "bleeding",
    serviceId: 3,
    symptomEn: "Bleeding Gums, Tartar Buildup & Bad Breath",
    symptomBn: "মাড়ি থেকে রক্ত পড়া, পাথর জমা ও মুখে দুর্গন্ধ",
    icon: "ph-drop",
    causeEn:
      "Hardened tartar (calculus) deposits along the gumline cause gum inflammation (gingivitis), bleeding during brushing, and persistent halitosis.",
    causeBn:
      "দাঁতের গোড়ায় শক্ত পাথর (Calculus/Plaque) জমে মাড়িতে প্রদাহ (Gingivitis) তৈরি হলে ব্রাশ করার সময় রক্ত পড়ে ও দুর্গন্ধ হয়।",
    recEn: "Ultrasonic Dental Scaling & Polishing",
    recBn: "আল্ট্রাসনিক মেশিনের মাধ্যমে স্কেলিং করা",
    secEn: "Disease Diagnosis Using Ultra-Modern Technology",
    secBn: "অত্যাধুনিক প্রযুক্তির মাধ্যমে রোগ নির্ণয় করা",
    stepsEn: [
      "Ultrasonic piezo scaling gently vibrates away all tartar, plaque, and surface stains without harming tooth enamel.",
      "Enamel polishing and gum care guidance restore healthy, firm, non-bleeding gums.",
    ],
    stepsBn: [
      "আল্ট্রাসনিক স্কেলার মেশিনের সাহায্যে দাঁতের এনামেলের কোনো ক্ষতি না করে সব পাথর ও দাগ পরিষ্কার করা হবে।",
      "পলিশিং ও মাড়ির বিশেষ মাউথওয়াশ পরামর্শের মাধ্যমে মাড়ি আবার সুস্থ ও মজবুত হয়ে উঠবে।",
    ],
  },
  {
    id: "broken",
    serviceId: 4,
    symptomEn: "Broken, Chipped, Discolored or Missing Tooth",
    symptomBn: "সামনের দাঁত ভাঙা, কালো দাগ বা ফাঁকা দাঁত",
    icon: "ph-magic-wand",
    causeEn:
      "Trauma, enamel wear, or previous extractions can leave unsightly gaps or chipped teeth that affect both your smile and chewing ability.",
    causeBn:
      "আঘাত পেয়ে দাঁত ভেঙে গেলে বা ক্যাভিটির কারণে দাঁত কালচে হয়ে গেলে হাসতে অস্বস্তি হয় এবং খাবার চিবাতে সমস্যা হয়।",
    recEn: "Laser Tooth-Color Matching Filling / Crown & Bridge",
    recBn: "লেজার কালার ম্যাচিং ফিলিং ও ক্রাউন-ব্রিজ",
    secEn: "Restoring Teeth with Crown & Bridge Prosthetics",
    secBn: "ক্রাউন এবং ব্রিজের মাধ্যমে দাঁত পূর্বাবস্থায় ফিরিয়ে আনা",
    stepsEn: [
      "Chipped or decayed areas are rebuilt with LED Laser Tooth-Color Matching Composite Filling.",
      "For missing or heavily damaged teeth, Zirconia/Porcelain Crowns & Bridges restore 100% natural look and function.",
    ],
    stepsBn: [
      "আসল দাঁতের রঙের সাথে হুবহু মিল রেখে লেজার লাইট-কিউর ফিলিং করে দাঁতটি নিখুঁতভাবে মেরামত করা হবে।",
      "দাঁত বেশি ভাঙা বা ফাঁকা থাকলে জিরকোনিয়া বা পোরসেলিন ক্যাপ (ক্রাউন ও ব্রিজ) দিয়ে পূর্বাবস্থায় ফিরিয়ে আনা হবে।",
    ],
  },
  {
    id: "crooked",
    serviceId: 9,
    symptomEn: "Crooked, Crowded or Protruding Teeth",
    symptomBn: "আঁকাবাঁকা, উঁচু বা ফাঁকা দাঁতের সমস্যা",
    icon: "ph-smiley-wink",
    causeEn:
      "Jaw arch discrepancy or childhood habits can cause teeth to erupt crookedly, making cleaning difficult and impacting facial aesthetics.",
    causeBn:
      "চোয়ালের জায়গার স্বল্পতা বা ছোটবেলার অভ্যাসের কারণে দাঁত আঁকাবাঁকা বা উঁচু-নিচু হয়ে থাকে।",
    recEn: "Orthodontic Treatment for Crooked Teeth (Braces)",
    recBn: "আঁকাবাঁকা দাঁতের চিকিৎসা করা (ব্রেসেস)",
    secEn: "Careful Digital Dental X-Ray & Diagnosis",
    secBn: "যত্ন সহকারে দাঁতের এক্স-রে ও রোগ নির্ণয়",
    stepsEn: [
      "Comprehensive orthodontic assessment and radiographic analysis to plan ideal tooth movement.",
      "Placement of comfortable metal or ceramic orthodontic braces for a straight, confident smile.",
    ],
    stepsBn: [
      "দাঁতের পরীক্ষা ও এক্স-রে করে অর্থোডন্টিক ব্রেসেস বা কসমেটিক অ্যালাইনমেন্ট প্ল্যান তৈরি করা হয়।",
      "ধাপে ধাপে আপনার হাসি হয়ে উঠবে সুশৃঙ্খল ও আত্মবিশ্বাসী।",
    ],
  },
  {
    id: "child",
    serviceId: 7,
    symptomEn: "Child's Toothache, Cavity or Loose Milk Tooth",
    symptomBn: "বাচ্চাদের দাঁতে পোকা, ব্যথা বা নতুন দাঁত বাঁকা ওঠা",
    icon: "ph-baby",
    causeEn:
      "Sweet snacks and improper brushing can cause rapid decay in children's primary teeth or retained milk teeth blocking permanent teeth.",
    causeBn:
      "চকলেট বা মিষ্টি খাবারের কারণে শিশুদের দুধ দাঁতে দ্রুত ক্ষয় হয় অথবা দুধ দাঁত না পড়তেই নিচে নতুন দাঁত উঠতে শুরু করে।",
    recEn: "Complete Pediatric / Children's Dental Care",
    recBn: "বাচ্চাদের যেকোনো ধরনের দাঁতের চিকিৎসা করা",
    secEn: "Painless Tooth Extraction (For Retained Milk Teeth)",
    secBn: "ব্যাথামুক্ত উপায়ে দুধ দাঁত তোলা",
    stepsEn: [
      "Gentle, anxiety-free pediatric fillings or pulp therapy performed in a warm, child-friendly environment.",
      "Painless removal of over-retained milk teeth so permanent teeth erupt straight.",
    ],
    stepsBn: [
      "শিশুদের ভয় দূর করে অত্যন্ত যত্ন সহকারে পেডিয়াট্রিক ফিলিং বা পালপোটমি করা হয়।",
      "নড়ে যাওয়া দুধ দাঁত সম্পূর্ণ ব্যথামুক্ত উপায়ে তুলে স্থায়ী দাঁত সোজাভাবে ওঠার জায়গা করে দেওয়া হয়।",
    ],
  },
  {
    id: "xray-need",
    serviceId: 10,
    symptomEn: "Need Dental X-Ray (Imaging) or Wisdom Tooth Check",
    symptomBn: "দাঁতের এক্স-রে (ছবি) বা আক্কেল দাঁতের পরীক্ষা",
    icon: "ph-scan",
    causeEn:
      "Hidden root infections, impacted wisdom teeth, or bone loss underneath the gums cannot be seen with the naked eye alone.",
    causeBn:
      "মাড়ির নিচে লুকিয়ে থাকা শিকড়ের ইনফেকশন বা আক্কেল দাঁতের অবস্থান খালি চোখে বোঝা যায় না।",
    recEn: "Careful Digital Dental X-Ray & Radiographic Imaging",
    recBn: "যত্ন সহকারে দাঁতের এক্স-রে (ছবি) করা",
    secEn: "Painless Tooth Extraction / Root Canal Care",
    secBn: "ব্যাথামুক্ত উপায়ে দাঁত তোলা বা রুট ক্যানাল",
    stepsEn: [
      "Quick, low-radiation dental X-ray imaging performed with utmost care right inside our chamber.",
      "Immediate review by our dental specialist to give you an accurate, transparent treatment plan.",
    ],
    stepsBn: [
      "চেম্বারেই অত্যন্ত যত্ন সহকারে অল্প সময়ে দাঁতের স্পষ্ট এক্স-রে (ছবি) করা হয়।",
      "এক্স-রে রিপোর্ট দেখে সাথে সাথেই সঠিক ও ব্যথামুক্ত চিকিৎসা শুরু করা হয়।",
    ],
  },
];
