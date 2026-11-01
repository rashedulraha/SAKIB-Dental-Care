import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@phosphor-icons/web/regular";
import "@phosphor-icons/web/bold";
import "@phosphor-icons/web/fill";
import "@phosphor-icons/web/duotone";
import "@/styles/globals.scss";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ClinicProvider } from "@/context/ClinicContext";
import { AmbientBackground } from "@/components/common/AmbientBackground";
import { ToastNotification } from "@/components/common/ToastNotification";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { ServiceModal } from "@/components/modals/ServiceModal";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="antialiased selection:bg-sky-500 selection:text-white">
        <ToastProvider>
          <ThemeProvider>
            <LanguageProvider>
              <ClinicProvider>
                <AmbientBackground />
                {children}
                <FloatingWhatsApp />
                <ToastNotification />
                <ServiceModal />
              </ClinicProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
