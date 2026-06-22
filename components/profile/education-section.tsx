"use client"

import { useEducations, useCreateEducation, useUpdateEducation, useDeleteEducation } from "@/hooks/use-profile-entities"
import { EntityFormDialog, FormField } from "./entity-form-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, GraduationCap } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Education } from "@/types/profile-entities"

const EDUCATION_FIELDS: FormField[] = [
  { name: "institution", label: "Institution", type: "text", placeholder: "University name", required: true },
  { name: "degree", label: "Degree", type: "select", required: true, options: [
    { label: "BSc", value: "BSc" }, { label: "MSc", value: "MSc" }, { label: "PhD", value: "PhD" },
    { label: "PostDoc", value: "PostDoc" }, { label: "Other", value: "Other" },
  ]},
  { name: "fieldOfStudy", label: "Field of Study", type: "text", placeholder: "Computer Science", required: true },
  { name: "gpa", label: "GPA", type: "number", placeholder: "3.8", step: "0.01", min: 0, max: 10 },
  { name: "gpaScale", label: "GPA Scale", type: "number", placeholder: "4.0", step: "0.1", min: 1, max: 10 },
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "country", label: "Country", type: "text", placeholder: "Nigeria" },
  { name: "thesis", label: "Thesis Title", type: "text", placeholder: "Thesis title" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Additional details" },
]

export function EducationSection() {
  const { data } = useEducations()
  const { mutate: create, isPending: isCreating } = useCreateEducation()
  const { mutate: update, isPending: isUpdating } = useUpdateEducation()
  const { mutate: remove } = useDeleteEducation()

  const educations: Education[] = data?.data || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <EntityFormDialog
          title="Education"
          fields={EDUCATION_FIELDS}
          onSubmit={(data) => create(data as any)}
          isPending={isCreating}
        />
      </div>
      {educations.length === 0 ? (
        <p className="text-sm text-muted-foreground">No education entries yet.</p>
      ) : (
        <div className="space-y-3">
          {educations.map((edu) => (
            <Card key={edu.id}>
              <CardContent className="flex items-start justify-between pt-4">
                <div className="flex gap-3">
                  <GraduationCap className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{edu.degree} in {edu.fieldOfStudy}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution}{edu.country ? `, ${edu.country}` : ""}</p>
                    {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}{edu.gpaScale ? `/${edu.gpaScale}` : ""}</p>}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-xs text-muted-foreground">{edu.startDate ? formatDate(edu.startDate) : "?"} - {edu.endDate ? formatDate(edu.endDate) : "Present"}</p>
                    )}
                    {edu.thesis && <p className="text-sm text-muted-foreground mt-1">Thesis: {edu.thesis}</p>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <EntityFormDialog
                    title="Education"
                    fields={EDUCATION_FIELDS}
                    onSubmit={(data) => update({ id: edu.id, data: data as any })}
                    isPending={isUpdating}
                    initialData={edu}
                  />
                  <Button variant="ghost" size="icon" onClick={() => remove(edu.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
