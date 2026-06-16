"use client"

import { useAuth } from "@/hooks/use-auth"
import { useSavedOpportunities } from "@/hooks/use-saved-opportunities"
import { useApplications } from "@/hooks/use-applications"
import { useDocuments } from "@/hooks/use-documents"
import { useNotifications, useUnreadCount } from "@/hooks/use-notifications"
import { ROUTES, ADMIN_ROLES, ROLE_LABELS } from "@/lib/constants"
import { formatRelativeTime } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Heart, ClipboardList, FileText, Bell, ArrowRight, UserCircle } from "lucide-react"
import { PageLoader } from "@/components/shared/loading-spinner"

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { data: savedData } = useSavedOpportunities(1, 1)
  const { data: applicationsData } = useApplications(undefined, 1, 1)
  const { data: documentsData } = useDocuments(1, 1)
  const { data: notificationsData } = useNotifications(1, 4)
  const { data: unreadData } = useUnreadCount()

  if (authLoading) {
    return <PageLoader />
  }

  const savedCount = savedData?.total ?? 0
  const applicationsCount = applicationsData?.total ?? 0
  const documentsCount = documentsData?.total ?? 0
  const unreadCount = unreadData?.data?.count ?? 0

  const displayName = user?.profile?.firstName
    ? `${user.profile.firstName}${user.profile.lastName ? ` ${user.profile.lastName}` : ""}`
    : user?.email

  const stats = [
    {
      title: "Saved Opportunities",
      value: savedCount,
      icon: Heart,
      href: ROUTES.DASHBOARD_SAVED,
      color: "text-red-500",
    },
    {
      title: "Active Applications",
      value: applicationsCount,
      icon: ClipboardList,
      href: ROUTES.DASHBOARD_APPLICATIONS,
      color: "text-blue-500",
    },
    {
      title: "Generated Documents",
      value: documentsCount,
      icon: FileText,
      href: ROUTES.DASHBOARD_DOCUMENTS,
      color: "text-green-500",
    },
    {
      title: "Unread Notifications",
      value: unreadCount,
      icon: Bell,
      href: ROUTES.DASHBOARD_NOTIFICATIONS,
      color: "text-yellow-500",
    },
  ]

  const recentNotifications = notificationsData?.data ?? []

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Welcome back, {displayName}</h1>
          {user?.role && (
            <Badge variant="secondary">{ROLE_LABELS[user.role]}</Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your GradPath activity.
        </p>
      </div>

      {!user?.profile?.firstName && (
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="flex items-center gap-4 pt-4">
            <UserCircle className="h-10 w-10 text-primary shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold">Complete Your Profile</h3>
              <p className="text-sm text-muted-foreground">
                Add your personal and academic information to get personalized scholarship recommendations.
              </p>
            </div>
            <Link
              href={ROUTES.DASHBOARD_PROFILE}
              className={buttonVariants({ variant: "default" })}
            >
              Update Profile
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Notifications</CardTitle>
          <Link
            href={ROUTES.DASHBOARD_NOTIFICATIONS}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          {recentNotifications.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No notifications yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 rounded-md p-2 hover:bg-muted/50"
                >
                  <Bell
                    className={`h-4 w-4 mt-0.5 shrink-0 ${
                      !notification.isRead
                        ? "text-primary fill-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm leading-snug ${
                        !notification.isRead ? "font-semibold" : ""
                      }`}
                    >
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
