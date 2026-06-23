"use client"

import { Suspense, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/constants"
import { Navbar } from "@/components/layout/navbar"
import { DashboardSidebar, DashboardMobileNav } from "@/components/layout/dashboard-sidebar"
import { PageLoader } from "@/components/shared/loading-spinner"
import AuthGuard from "@/components/guards/dashboard-guard"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard isLoading={isLoading} isAuthenticated={isAuthenticated}>
        <div className="flex flex-col h-screen overflow-hidden">
          <Navbar />
          <DashboardMobileNav />
          <div className="flex flex-1 overflow-hidden">
            <DashboardSidebar  />
            <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">{children}</main>
          </div>
        </div>
      </AuthGuard>
    </Suspense>
  )
}
