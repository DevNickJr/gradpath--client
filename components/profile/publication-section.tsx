"use client"

import { usePublications, useCreatePublication, useUpdatePublication, useDeletePublication } from "@/hooks/use-profile-entities"
import { EntityFormDialog, FormField } from "./entity-form-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, BookOpen } from "lucide-react"
import type { Publication } from "@/types/profile-entities"

const PUBLICATION_FIELDS: FormField[] = [
  { name: "title", label: "Title", type: "text", placeholder: "Paper title", required: true },
  { name: "journal", label: "Journal/Venue", type: "text", placeholder: "Nature" },
  { name: "date", label: "Date", type: "date" },
  { name: "type", label: "Type", type: "select", options: [
    { label: "Journal", value: "journal" }, { label: "Conference", value: "conference" },
    { label: "Preprint", value: "preprint" }, { label: "Thesis", value: "thesis" },
  ]},
  { name: "url", label: "URL", type: "url", placeholder: "https://doi.org/..." },
]

export function PublicationSection() {
  const { data } = usePublications()
  const { mutate: create, isPending: isCreating } = useCreatePublication()
  const { mutate: update, isPending: isUpdating } = useUpdatePublication()
  const { mutate: remove } = useDeletePublication()

  const publications: Publication[] = data?.data || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Publications</h3>
        <EntityFormDialog title="Publication" fields={PUBLICATION_FIELDS} onSubmit={(data) => create(data as any)} isPending={isCreating} />
      </div>
      {publications.length === 0 ? (
        <p className="text-sm text-muted-foreground">No publications yet.</p>
      ) : (
        <div className="space-y-3">
          {publications.map((pub) => (
            <Card key={pub.id}>
              <CardContent className="flex items-start justify-between pt-4">
                <div className="flex gap-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{pub.title}</p>
                    {pub.journal && <p className="text-sm text-muted-foreground">{pub.journal}</p>}
                    <div className="flex items-center gap-2 mt-1">
                      {pub.type && <Badge variant="outline" className="text-xs">{pub.type}</Badge>}
                      {pub.url && <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline">View</a>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <EntityFormDialog title="Publication" fields={PUBLICATION_FIELDS} onSubmit={(data) => update({ id: pub.id, data: data as any })} isPending={isUpdating} initialData={pub} />
                  <Button variant="ghost" size="icon" onClick={() => remove(pub.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
