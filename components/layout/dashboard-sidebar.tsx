"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES, ADMIN_ROLES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Heart,
  ClipboardList,
  FileText,
  Bell,
  Plus,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

const SIDEBAR_LINKS = [
  { href: ROUTES.DASHBOARD, label: "Overview", icon: LayoutDashboard, exact: true },
  { href: ROUTES.DASHBOARD_PROFILE, label: "Profile", icon: User },
  { href: ROUTES.DASHBOARD_OPPORTUNITIES, label: "Manage Opportunities", icon: GraduationCap, adminOnly: true },
  { href: ROUTES.DASHBOARD_SAVED, label: "Saved", icon: Heart },
  { href: ROUTES.DASHBOARD_APPLICATIONS, label: "Applications", icon: ClipboardList },
  { href: ROUTES.DASHBOARD_DOCUMENTS, label: "Documents", icon: FileText },
  { href: ROUTES.DASHBOARD_NOTIFICATIONS, label: "Notifications", icon: Bell },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const isAdmin = user && ADMIN_ROLES.includes(user.role)

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 shrink-0 border-r bg-muted/30 hidden lg:block">
      <div className="flex flex-col h-full p-4">
        <div className="space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            if (link.adminOnly && !isAdmin) return null
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive(link.href, link.exact)
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </div>

        {isAdmin && (
          <div className="mt-auto pt-4 border-t">
            <Link href={ROUTES.DASHBOARD_NEW_OPPORTUNITY} className={cn(buttonVariants(), "w-full")}>
              <Plus className="h-4 w-4 mr-2" />
              Post Opportunity
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}

export function DashboardMobileNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const isAdmin = user && ADMIN_ROLES.includes(user.role)

  return (
    <nav className="lg:hidden border-b overflow-x-auto">
      <div className="flex items-center gap-1 p-2 min-w-max">
        {SIDEBAR_LINKS.map((link) => {
          if (link.adminOnly && !isAdmin) return null
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors",
                active
                  ? "bg-accent text-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
