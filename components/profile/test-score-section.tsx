"use client"

import { useTestScores, useCreateTestScore, useUpdateTestScore, useDeleteTestScore } from "@/hooks/use-profile-entities"
import { EntityFormDialog, FormField } from "./entity-form-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Award } from "lucide-react"
import type { TestScore } from "@/types/profile-entities"

const TEST_SCORE_FIELDS: FormField[] = [
  { name: "testName", label: "Test Name", type: "select", required: true, options: [
    { label: "GRE", value: "GRE" }, { label: "TOEFL", value: "TOEFL" },
    { label: "IELTS", value: "IELTS" }, { label: "GMAT", value: "GMAT" }, { label: "Other", value: "Other" },
  ]},
  { name: "score", label: "Score", type: "number", required: true, min: 0 },
  { name: "dateTaken", label: "Date Taken", type: "date" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
]

export function TestScoreSection() {
  const { data } = useTestScores()
  const { mutate: create, isPending: isCreating } = useCreateTestScore()
  const { mutate: update, isPending: isUpdating } = useUpdateTestScore()
  const { mutate: remove } = useDeleteTestScore()

  const scores: TestScore[] = data?.data || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Test Scores</h3>
        <EntityFormDialog title="Test Score" fields={TEST_SCORE_FIELDS} onSubmit={(data) => create(data as any)} isPending={isCreating} />
      </div>
      {scores.length === 0 ? (
        <p className="text-sm text-muted-foreground">No test scores yet.</p>
      ) : (
        <div className="space-y-3">
          {scores.map((ts) => (
            <Card key={ts.id}>
              <CardContent className="flex items-start justify-between pt-4">
                <div className="flex gap-3">
                  <Award className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{ts.testName}: {ts.score}</p>
                    {ts.subScores && Object.keys(ts.subScores).length > 0 && (
                      <p className="text-sm text-muted-foreground">{Object.entries(ts.subScores).map(([k, v]) => `${k}: ${v}`).join(", ")}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <EntityFormDialog title="Test Score" fields={TEST_SCORE_FIELDS} onSubmit={(data) => update({ id: ts.id, data: data as any })} isPending={isUpdating} initialData={ts} />
                  <Button variant="ghost" size="icon" onClick={() => remove(ts.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
