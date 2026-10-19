"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { LiveStatusStrip } from "@/components/sections/LiveStatusStrip";
import { SpecialistHighlight } from "@/components/sections/SpecialistHighlight";
import { BranchesSection } from "@/components/sections/BranchesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SymptomGuideSection } from "@/components/sections/SymptomGuideSection";
import { XrayTechSection } from "@/components/sections/XrayTechSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LiveStatusStrip />
      <Container as="main" className="pt-10 sm:pt-14 space-y-16 sm:space-y-24">
        <SpecialistHighlight />
        <BranchesSection />
        <ServicesSection />
        <SymptomGuideSection />
        <XrayTechSection />
        <BookingSection />
        <FaqSection />
      </Container>
      <Footer />
    </>
  );
}
