"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { opportunityService } from "@/services/opportunity.service"
import type { OpportunityFilters, CreateOpportunityRequest, UpdateOpportunityRequest } from "@/types/opportunity"

export function useOpportunities(filters?: OpportunityFilters) {
  return useFetch({
    queryKey: ["opportunities", JSON.stringify(filters)],
    queryFn: () => opportunityService.getOpportunities(filters)
  })
}

export function useOpportunity(id: string) {
  return useFetch({
    queryKey: ["opportunity", id],
    queryFn: () => opportunityService.getOpportunity(id),
    options: { enabled: !!id }
  })
}

export function useCreateOpportunity() {
  return useMutationAction(
    (data: CreateOpportunityRequest) => opportunityService.createOpportunity(data),
    {
      successMessage: "Opportunity created successfully",
      invalidateKeys: [["opportunities"]],
    }
  )
}

export function useUpdateOpportunity(id: string) {
  return useMutationAction(
    (data: UpdateOpportunityRequest) => opportunityService.updateOpportunity(id, data),
    {
      successMessage: "Opportunity updated successfully",
      invalidateKeys: [["opportunities"], ["opportunity", id]],
    }
  )
}

export function useDeleteOpportunity() {
  return useMutationAction(
    (id: string) => opportunityService.deleteOpportunity(id),
    {
      successMessage: "Opportunity deleted successfully",
      invalidateKeys: [["opportunities"]],
    }
  )
}
