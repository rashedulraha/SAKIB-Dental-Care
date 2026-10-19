import type { Metadata, Viewport } from "next";
import "@phosphor-icons/web/regular";
import "@phosphor-icons/web/bold";
import "@phosphor-icons/web/fill";
import "@phosphor-icons/web/duotone";
import "@/styles/globals.scss";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AmbientBackground } from "@/components/common/AmbientBackground";
import { ToastNotification } from "@/components/common/ToastNotification";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { ServiceModal } from "@/components/modals/ServiceModal";

export const metadata: Metadata = {
  title:
    "Sakib Dental Care | সাকিব ডেন্টাল কেয়ার — Nowhata & Rajshahi City Branch",
  description:
    "Treatment is provided using ultra-modern equipment in a 100% germ-free (sterilized) environment. Dental X-Rays (Imaging) are performed here with utmost care. Chambers at Nowhata Bazar and Rajshahi City, Sopura.",
  keywords: [
    "Sakib Dental Care",
    "সাকিব ডেন্টাল কেয়ার",
    "Dentist Rajshahi",
    "Dental Clinic Nowhata",
    "Root Canal Rajshahi",
    "Dental X-Ray Rajshahi",
    "Dr Sakib Dental",
  ],
  authors: [{ name: "Sakib Dental Care" }],
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-sky-500 selection:text-white pb-8 sm:pb-12">
        <ToastProvider>
          <ThemeProvider>
            <LanguageProvider>
              <AmbientBackground />
              {children}
              <FloatingWhatsApp />
              <ToastNotification />
              <ServiceModal />
            </LanguageProvider>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
