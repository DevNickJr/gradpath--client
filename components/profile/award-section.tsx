"use client"

import { useAwards, useCreateAward, useUpdateAward, useDeleteAward } from "@/hooks/use-profile-entities"
import { EntityFormDialog, FormField } from "./entity-form-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Trophy } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Award } from "@/types/profile-entities"

const AWARD_FIELDS: FormField[] = [
  { name: "title", label: "Award Title", type: "text", placeholder: "Dean's List", required: true },
  { name: "issuingOrg", label: "Issuing Organization", type: "text", placeholder: "University" },
  { name: "date", label: "Date", type: "date" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Details about the award" },
]

export function AwardSection() {
  const { data } = useAwards()
  const { mutate: create, isPending: isCreating } = useCreateAward()
  const { mutate: update, isPending: isUpdating } = useUpdateAward()
  const { mutate: remove } = useDeleteAward()

  const awards: Award[] = data?.data || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Awards & Honours</h3>
        <EntityFormDialog title="Award" fields={AWARD_FIELDS} onSubmit={(data) => create(data as any)} isPending={isCreating} />
      </div>
      {awards.length === 0 ? (
        <p className="text-sm text-muted-foreground">No awards yet.</p>
      ) : (
        <div className="space-y-3">
          {awards.map((award) => (
            <Card key={award.id}>
              <CardContent className="flex items-start justify-between pt-4">
                <div className="flex gap-3">
                  <Trophy className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{award.title}</p>
                    {award.issuingOrg && <p className="text-sm text-muted-foreground">{award.issuingOrg}</p>}
                    {award.date && <p className="text-xs text-muted-foreground">{formatDate(award.date)}</p>}
                    {award.description && <p className="text-sm text-muted-foreground mt-1">{award.description}</p>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <EntityFormDialog title="Award" fields={AWARD_FIELDS} onSubmit={(data) => update({ id: award.id, data: data as any })} isPending={isUpdating} initialData={award} />
                  <Button variant="ghost" size="icon" onClick={() => remove(award.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
