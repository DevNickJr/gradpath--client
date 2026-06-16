"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useOpportunity, useUpdateOpportunity } from "@/hooks/use-opportunities"
import { ROUTES } from "@/lib/constants"
import { OpportunityForm } from "@/components/opportunities/opportunity-form"
import { PageLoader } from "@/components/shared/loading-spinner"
import type { CreateOpportunityRequest } from "@/types/opportunity"

export default function EditOpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { data, isLoading } = useOpportunity(id)
  const { mutate: updateOpportunity, isPending } = useUpdateOpportunity(id)

  if (isLoading) {
    return <PageLoader />
  }

  const opportunity = data?.data

  if (!opportunity) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Opportunity not found.</p>
      </div>
    )
  }

  const handleSubmit = (formData: CreateOpportunityRequest) => {
    updateOpportunity(formData, {
      onSuccess: () => {
        router.push(ROUTES.DASHBOARD_OPPORTUNITIES)
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Opportunity</h1>
        <p className="text-muted-foreground">
          Update the details of this opportunity.
        </p>
      </div>

      <OpportunityForm
        initialData={opportunity}
        onSubmit={handleSubmit}
        isLoading={isPending}
      />
    </div>
  )
}
