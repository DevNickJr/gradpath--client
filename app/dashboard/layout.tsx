"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/constants"
import { Navbar } from "@/components/layout/navbar"
import { DashboardSidebar, DashboardMobileNav } from "@/components/layout/dashboard-sidebar"
import { PageLoader } from "@/components/shared/loading-spinner"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams(); 
  const queryString = searchParams.toString();
  const completePath = queryString ? `${pathname}?${queryString}` : pathname;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`${ROUTES.LOGIN}?path=${completePath}`)
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <DashboardMobileNav />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar  />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
