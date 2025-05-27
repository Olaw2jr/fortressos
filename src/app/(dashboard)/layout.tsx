"use client";

import * as React from "react";
import { AppSidebar } from "@/components/dashboard/sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Header } from "@/components/dashboard/header";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <div className="flex">
          <AppSidebar />
          <SidebarInset className="flex-1 max-w-[calc(100%-16rem)]">
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 overflow-auto p-4 transition-all duration-300 ease-in-out w-full max-w-[calc(100%-16rem)]">
                {children}
              </main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
