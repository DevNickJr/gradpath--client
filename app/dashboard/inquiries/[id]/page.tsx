"use client"

import { use, useState } from "react"
import { useInquiry, useReplyInquiry, useUpdateInquiryStatus } from "@/hooks/use-inquiries"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { PageLoader } from "@/components/shared/loading-spinner"
import { ROUTES, ADMIN_ROLES } from "@/lib/constants"
import { formatRelativeTime, getInitials } from "@/lib/utils"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const STATUS_COLORS: Record<string, string> = {
  open: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
}

export default function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuth()
  const { data, isLoading } = useInquiry(id)
  const { mutate: reply, isPending: isReplying } = useReplyInquiry(id)
  const { mutate: updateStatus } = useUpdateInquiryStatus(id)
  const [message, setMessage] = useState("")

  const isAdmin = user && ADMIN_ROLES.includes(user.role)

  if (isLoading) return <PageLoader />

  const inquiry = data?.data
  if (!inquiry) return <p className="text-muted-foreground">Inquiry not found.</p>

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    reply({ message }, { onSuccess: () => setMessage("") })
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href={ROUTES.DASHBOARD_INQUIRIES}>
        <Button variant="ghost" className="gap-1"><ArrowLeft className="h-4 w-4" />Back</Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{inquiry.subject}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{formatRelativeTime(inquiry.createdAt)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={STATUS_COLORS[inquiry.status] || ""}>{inquiry.status}</Badge>
              {isAdmin && (
                <Select value={inquiry.status} onValueChange={(val) => { if (val) updateStatus(val) }}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={inquiry.author?.profileImage} />
              <AvatarFallback className="text-xs">{getInitials(inquiry.author?.firstName, inquiry.author?.lastName)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{inquiry.author?.firstName} {inquiry.author?.lastName}</p>
              <p className="text-sm mt-1">{inquiry.message}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {inquiry.replies && inquiry.replies.length > 0 && (
        <div className="space-y-3">
          {inquiry.replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="pt-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={reply.author?.profileImage} />
                    <AvatarFallback className="text-xs">{getInitials(reply.author?.firstName, reply.author?.lastName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{reply.author?.firstName} {reply.author?.lastName}</p>
                      <span className="text-xs text-muted-foreground">{formatRelativeTime(reply.createdAt)}</span>
                    </div>
                    <p className="text-sm mt-1">{reply.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Separator />

      <form onSubmit={handleReply} className="space-y-3">
        <Textarea placeholder="Write a reply..." value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
        <div className="flex justify-end">
          <Button type="submit" disabled={isReplying || !message.trim()} size="sm">
            {isReplying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send Reply
          </Button>
        </div>
      </form>
    </div>
  )
}
