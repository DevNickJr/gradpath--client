"use client"

import { useCertifications, useCreateCertification, useUpdateCertification, useDeleteCertification } from "@/hooks/use-profile-entities"
import { EntityFormDialog, FormField } from "./entity-form-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, BadgeCheck } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Certification } from "@/types/profile-entities"

const CERTIFICATION_FIELDS: FormField[] = [
  { name: "name", label: "Certification Name", type: "text", placeholder: "AWS Solutions Architect", required: true },
  { name: "issuingOrg", label: "Issuing Organization", type: "text", placeholder: "Amazon Web Services" },
  { name: "dateIssued", label: "Date Issued", type: "date" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
  { name: "credentialUrl", label: "Credential URL", type: "url", placeholder: "https://..." },
]

export function CertificationSection() {
  const { data } = useCertifications()
  const { mutate: create, isPending: isCreating } = useCreateCertification()
  const { mutate: update, isPending: isUpdating } = useUpdateCertification()
  const { mutate: remove } = useDeleteCertification()

  const certifications: Certification[] = data?.data || []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Certifications</h3>
        <EntityFormDialog title="Certification" fields={CERTIFICATION_FIELDS} onSubmit={(data) => create(data as any)} isPending={isCreating} />
      </div>
      {certifications.length === 0 ? (
        <p className="text-sm text-muted-foreground">No certifications yet.</p>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <Card key={cert.id}>
              <CardContent className="flex items-start justify-between pt-4">
                <div className="flex gap-3">
                  <BadgeCheck className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    {cert.issuingOrg && <p className="text-sm text-muted-foreground">{cert.issuingOrg}</p>}
                    {cert.dateIssued && <p className="text-xs text-muted-foreground">Issued: {formatDate(cert.dateIssued)}</p>}
                    {cert.credentialUrl && <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline">View credential</a>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <EntityFormDialog title="Certification" fields={CERTIFICATION_FIELDS} onSubmit={(data) => update({ id: cert.id, data: data as any })} isPending={isUpdating} initialData={cert} />
                  <Button variant="ghost" size="icon" onClick={() => remove(cert.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
