"use client"

import type { ReactElement } from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, Pencil } from "lucide-react"

export interface FormField {
  name: string
  label: string
  type: "text" | "number" | "date" | "textarea" | "select" | "url" | "email" | "tel" | "checkbox"
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  min?: number
  max?: number
  step?: string
}

interface EntityFormDialogProps {
  title: string
  fields: FormField[]
  onSubmit: (data: Record<string, any>) => void
  isPending: boolean
  initialData?: Record<string, any>
  trigger?: ReactElement
}

export function EntityFormDialog({ title, fields, onSubmit, isPending, initialData, trigger }: EntityFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({})
    }
  }, [initialData, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned: Record<string, any> = {}
    for (const field of fields) {
      const val = formData[field.name]
      if (val !== undefined && val !== "" && val !== null) {
        if (field.type === "number") {
          cleaned[field.name] = Number(val)
        } else if (field.type === "checkbox") {
          cleaned[field.name] = Boolean(val)
        } else {
          cleaned[field.name] = val
        }
      }
    }
    onSubmit(cleaned)
    if (!isPending) setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={trigger || (
          <Button variant={initialData ? "ghost" : "outline"} size={initialData ? "icon" : "default"}>
            {initialData ? <Pencil className="h-4 w-4" /> : <><Plus className="h-4 w-4 mr-2" />Add {title}</>}
          </Button>
        )}
      />
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? `Edit ${title}` : `Add ${title}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "select" ? (
                <Select
                  value={formData[field.name] || ""}
                  onValueChange={(val) => setFormData(prev => ({ ...prev, [field.name]: val }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  rows={3}
                />
              ) : field.type === "checkbox" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={field.name}
                    checked={formData[field.name] || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.checked }))}
                  />
                  <Label htmlFor={field.name} className="font-normal">{field.placeholder || field.label}</Label>
                </div>
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update" : "Add"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
