"use client"

import { useExperiences, useCreateExperience, useUpdateExperience, useDeleteExperience } from "@/hooks/use-profile-entities"
import { EntityFormDialog, FormField } from "./entity-form-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Briefcase } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Experience } from "@/types/profile-entities"

const EXPERIENCE_FIELDS: FormField[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Research Assistant", required: true },
  { name: "organization", label: "Organization", type: "text", placeholder: "MIT", required: true },
  { name: "type", label: "Type", type: "select", required: true, options: [
    { label: "Work", value: "work" }, { label: "Research", value: "research" },
    { label: "Teaching", value: "teaching" }, { label: "Volunteer", value: "volunteer" },
  ]},
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "isCurrent", label: "Current", type: "checkbox", placeholder: "I currently work here" },
  { name: "location", label: "Location", type: "text", placeholder: "Cambridge, MA" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Describe your role" },
]

export function ExperienceSection() {
  const { data } = useExperiences()
  const { mutate: create, isPending: isCreating } = useCreateExperience()
  const { mutate: update, isPending: isUpdating } = useUpdateExperience()
  const { mutate: remove } = useDeleteExperience()

  const experiences: Experience[] = data?.data || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Experience</h3>
        <EntityFormDialog title="Experience" fields={EXPERIENCE_FIELDS} onSubmit={(data) => create(data as any)} isPending={isCreating} />
      </div>
      {experiences.length === 0 ? (
        <p className="text-sm text-muted-foreground">No experience entries yet.</p>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <Card key={exp.id}>
              <CardContent className="flex items-start justify-between pt-4">
                <div className="flex gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{exp.title}</p>
                      <Badge variant="secondary" className="text-xs">{exp.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{exp.organization}{exp.location ? `, ${exp.location}` : ""}</p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-xs text-muted-foreground">{exp.startDate ? formatDate(exp.startDate) : "?"} - {exp.isCurrent ? "Present" : exp.endDate ? formatDate(exp.endDate) : "?"}</p>
                    )}
                    {exp.description && <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <EntityFormDialog title="Experience" fields={EXPERIENCE_FIELDS} onSubmit={(data) => update({ id: exp.id, data: data as any })} isPending={isUpdating} initialData={exp} />
                  <Button variant="ghost" size="icon" onClick={() => remove(exp.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
