"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminProvider } from "@/context/AdminContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopNav } from "@/components/admin/AdminTopNav";
import { LogoutModal } from "@/components/admin/LogoutModal";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Login page gets a clean standalone container without sidebar
  if (isLoginPage) {
    return <div className="admin-shell admin-root w-full min-h-screen bg-[#070b16]">{children}</div>;
  }

  return (
    <AdminProvider>
      <div className="admin-shell admin-root min-h-screen bg-[#070b16] text-slate-100 flex overflow-hidden">
        {/* Left Sidebar */}
        <AdminSidebar />

        {/* Right Main Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <AdminTopNav />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>
        </div>

        {/* Global Admin Logout Confirmation Modal */}
        <LogoutModal />
      </div>
    </AdminProvider>
  );
}

