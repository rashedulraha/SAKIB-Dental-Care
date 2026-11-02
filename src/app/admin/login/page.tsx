"use client";

import { useEffect } from "react";
import { AdminAuthForm } from "@/components/admin/AdminAuthForm";

export default function AdminLoginPage() {
  useEffect(() => {
    try {
      localStorage.removeItem("sdc_admin_lang");
      localStorage.removeItem("sdc_site_lang");
    } catch (error) {
      console.error("Unable to clear saved language preferences:", error);
    }
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#070b16] p-4 selection:bg-sky-500 selection:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>
      <AdminAuthForm />
    </div>
  );
}
