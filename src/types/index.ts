export type Language = "en" | "bn" | "bi";

export interface HeroSlide {
  num: string;
  type: "video" | "image";
  videoUrl: string;
  imageUrl: string;
  badgeEn: string;
  badgeBn: string;
  titleEn: string;
  titleBn: string;
  subEn: string;
  subBn: string;
  captionEn: string;
  captionBn: string;
}

export type ServiceCategory = "diagnostic" | "restorative" | "cosmetic" | "ortho-surgical" | "all";

export interface DentalService {
  id: number;
  titleEn: string;
  titleBn: string;
  category: "diagnostic" | "restorative" | "cosmetic" | "ortho-surgical";
  icon: string;
  color: "sky" | "indigo" | "teal" | "rose" | "amber" | "emerald";
  shortDescEn: string;
  shortDescBn: string;
  durationEn: string;
  durationBn: string;
  techEn: string;
  techBn: string;
  careTipEn: string;
  careTipBn: string;
}

export interface SymptomItem {
  id: string;
  serviceId: number;
  symptomEn: string;
  symptomBn: string;
  icon: string;
  causeEn: string;
  causeBn: string;
  recEn: string;
  recBn: string;
  secEn: string;
  secBn: string;
  stepsEn: string[];
  stepsBn: string[];
}

export interface BranchInfo {
  nameEn: string;
  nameBn: string;
  addressEn: string;
  addressBn: string;
  shiftBadgeEn: string;
  shiftBadgeBn: string;
  slotsEn: string[];
  slotsBn: string[];
}

export type BranchKey = "nawhata" | "city";

export type TechTab = "xray" | "laser" | "sterile";
