"use client"

import { useReferees, useCreateReferee, useUpdateReferee, useDeleteReferee } from "@/hooks/use-profile-entities"
import { EntityFormDialog, FormField } from "./entity-form-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Users } from "lucide-react"
import type { Referee } from "@/types/profile-entities"

const REFEREE_FIELDS: FormField[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Dr. Jane Smith", required: true },
  { name: "title", label: "Title", type: "text", placeholder: "Professor" },
  { name: "institution", label: "Institution", type: "text", placeholder: "MIT" },
  { name: "email", label: "Email", type: "email", placeholder: "jane@mit.edu" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+1 555-0123" },
  { name: "relationship", label: "Relationship", type: "text", placeholder: "Thesis Supervisor" },
]

export function RefereeSection() {
  const { data } = useReferees()
  const { mutate: create, isPending: isCreating } = useCreateReferee()
  const { mutate: update, isPending: isUpdating } = useUpdateReferee()
  const { mutate: remove } = useDeleteReferee()

  const referees: Referee[] = data?.data || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Referees</h3>
        <EntityFormDialog title="Referee" fields={REFEREE_FIELDS} onSubmit={(data) => create(data as any)} isPending={isCreating} />
      </div>
      {referees.length === 0 ? (
        <p className="text-sm text-muted-foreground">No referees yet.</p>
      ) : (
        <div className="space-y-3">
          {referees.map((ref) => (
            <Card key={ref.id}>
              <CardContent className="flex items-start justify-between pt-4">
                <div className="flex gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{ref.name}</p>
                    {ref.title && <p className="text-sm text-muted-foreground">{ref.title}{ref.institution ? ` at ${ref.institution}` : ""}</p>}
                    {ref.email && <p className="text-sm text-muted-foreground">{ref.email}</p>}
                    {ref.relationship && <p className="text-xs text-muted-foreground">{ref.relationship}</p>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <EntityFormDialog title="Referee" fields={REFEREE_FIELDS} onSubmit={(data) => update({ id: ref.id, data: data as any })} isPending={isUpdating} initialData={ref} />
                  <Button variant="ghost" size="icon" onClick={() => remove(ref.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
