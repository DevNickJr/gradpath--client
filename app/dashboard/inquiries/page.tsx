"use client"

import Link from "next/link"
import { useInquiries } from "@/hooks/use-inquiries"
import { useAuth } from "@/hooks/use-auth"
import { InquiryCard } from "@/components/inquiries/inquiry-card"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"
import { PageLoader } from "@/components/shared/loading-spinner"
import { EmptyState } from "@/components/shared/empty-state"
import { Plus, MessageSquare } from "lucide-react"

export default function InquiriesPage() {
  const { data, isLoading } = useInquiries()

  if (isLoading) return <PageLoader />

  const inquiries = data?.data || []

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inquiries</h1>
          <p className="text-muted-foreground">Send messages to our team.</p>
        </div>
        <Link href={ROUTES.DASHBOARD_INQUIRY_NEW}>
          <Button><Plus className="h-4 w-4 mr-2" />New Inquiry</Button>
        </Link>
      </div>

      {inquiries.length === 0 ? (
        <EmptyState icon={MessageSquare} title="No inquiries" description="You haven't sent any inquiries yet." />
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} />
          ))}
        </div>
      )}
    </div>
  )
}
