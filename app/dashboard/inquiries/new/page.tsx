"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCreateInquiry } from "@/hooks/use-inquiries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ROUTES } from "@/lib/constants"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewInquiryPage() {
  const router = useRouter()
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const { mutate: createInquiry, isPending } = useCreateInquiry()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createInquiry({ subject, message }, {
      onSuccess: () => router.push(ROUTES.DASHBOARD_INQUIRIES),
    })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Link href={ROUTES.DASHBOARD_INQUIRIES}>
        <Button variant="ghost" className="gap-1"><ArrowLeft className="h-4 w-4" />Back</Button>
      </Link>
      <Card>
        <CardHeader><CardTitle>New Inquiry</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is your inquiry about?" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe your inquiry in detail..." value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required />
            </div>
            <Button type="submit" disabled={isPending || !subject || !message} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Submit Inquiry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
