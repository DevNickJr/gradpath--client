"use client"

import { useRouter } from "next/navigation"
import { useCreateOpportunity } from "@/hooks/use-opportunities"
import { ROUTES } from "@/lib/constants"
import { OpportunityForm } from "@/components/opportunities/opportunity-form"
import type { CreateOpportunityRequest } from "@/types/opportunity"

export default function NewOpportunityPage() {
  const router = useRouter()
  const { mutate: createOpportunity, isPending } = useCreateOpportunity()

  const handleSubmit = (data: CreateOpportunityRequest) => {
    createOpportunity(data, {
      onSuccess: () => {
        router.push(ROUTES.DASHBOARD_OPPORTUNITIES)
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Post New Opportunity</h1>
        <p className="text-muted-foreground">
          Create a new scholarship or funding opportunity.
        </p>
      </div>

      <OpportunityForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  )
}
