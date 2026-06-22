"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Message sent! We'll get back to you soon.")
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about GradPath? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 flex items-start gap-4">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">gradpath@gmail.com</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-start gap-4">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+234 (815) 188-4043</p>
                <p className="text-sm text-muted-foreground">+234 (903) 339-8824</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-muted-foreground">No. 8 Johnson Adegoke Street, Unity Estate, off Badore road, Ajah, Lagos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>Fill out the form and we&apos;ll respond within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} required />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
