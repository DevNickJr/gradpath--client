"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatRelativeTime } from "@/lib/utils"
import { ROUTES } from "@/lib/constants"
import type { Inquiry } from "@/types/inquiry"

interface InquiryCardProps {
  inquiry: Inquiry
}

const STATUS_COLORS: Record<string, string> = {
  open: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
}

export function InquiryCard({ inquiry }: InquiryCardProps) {
  return (
    <Link href={ROUTES.DASHBOARD_INQUIRY_DETAIL(inquiry.id)}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="flex items-start justify-between pt-4">
          <div className="space-y-1">
            <p className="font-medium">{inquiry.subject}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{inquiry.message}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">{formatRelativeTime(inquiry.createdAt)}</span>
              {inquiry.replies && inquiry.replies.length > 0 && (
                <span className="text-xs text-muted-foreground">{inquiry.replies.length} {inquiry.replies.length === 1 ? "reply" : "replies"}</span>
              )}
            </div>
          </div>
          <Badge className={STATUS_COLORS[inquiry.status] || ""}>{inquiry.status}</Badge>
        </CardContent>
      </Card>
    </Link>
  )
}
