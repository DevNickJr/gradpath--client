"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { savedOpportunityService } from "@/services/saved-opportunity.service"

export function useSavedOpportunities(page = 1, limit = 20) {
  return useFetch(
    ["saved-opportunities", String(page), String(limit)],
    () => savedOpportunityService.getSavedOpportunities(page, limit)
  )
}

export function useSaveStatus(opportunityId: string) {
  return useFetch(
    ["save-status", opportunityId],
    () => savedOpportunityService.getSaveStatus(opportunityId),
    { enabled: !!opportunityId }
  )
}

export function useToggleSave() {
  return useMutationAction(
    (opportunityId: string) => savedOpportunityService.toggleSave(opportunityId),
    {
      invalidateKeys: [["saved-opportunities"], ["save-status"]],
    }
  )
}
