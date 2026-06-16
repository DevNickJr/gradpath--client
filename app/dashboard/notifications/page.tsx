"use client"

import { useState } from "react"
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
} from "@/hooks/use-notifications"
import { formatRelativeTime, cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCheck } from "lucide-react"
import { PageLoader } from "@/components/shared/loading-spinner"
import { EmptyState } from "@/components/shared/empty-state"
import { Pagination } from "@/components/shared/pagination"

export default function NotificationsPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useNotifications(page, 20)
  const { mutate: markAsRead } = useMarkAsRead()
  const { mutate: markAllAsRead, isPending: isMarkingAll } = useMarkAllAsRead()

  if (isLoading) {
    return <PageLoader />
  }

  const notifications = data?.data ?? []
  const totalPages = data?.totalPages ?? 1
  const hasUnread = notifications.some((n) => !n.isRead)

  const handleMarkAsRead = (id: string, isRead: boolean) => {
    if (!isRead) {
      markAsRead(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on your scholarship journey.
          </p>
        </div>
        {hasUnread && (
          <Button
            variant="outline"
            onClick={() => markAllAsRead()}
            disabled={isMarkingAll}
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up! Notifications about your applications and opportunities will appear here."
        />
      ) : (
        <>
          <Card>
            <CardContent className="divide-y">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() =>
                    handleMarkAsRead(notification.id, notification.isRead)
                  }
                  className={cn(
                    "flex items-start gap-3 w-full text-left p-3 rounded-md transition-colors hover:bg-muted/50",
                    !notification.isRead && "bg-primary/5"
                  )}
                >
                  <Bell
                    className={cn(
                      "h-4 w-4 mt-0.5 shrink-0",
                      !notification.isRead
                        ? "text-primary fill-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm leading-snug",
                        !notification.isRead && "font-semibold"
                      )}
                    >
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
