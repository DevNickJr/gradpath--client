"use client"

import { useAuth } from "./use-auth"
import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { savedOpportunityService } from "@/services/saved-opportunity.service"

export function useSavedOpportunities(page = 1, limit = 20) {
  const { isAuthenticated } = useAuth()
  
  return useFetch({
    queryKey: ["saved-opportunities", page, limit],
    queryFn: () => savedOpportunityService.getSavedOpportunities(page, limit),
    options: { enabled: !!isAuthenticated }
  })
}

export function useSaveStatus(opportunityId: string) {
  const { isAuthenticated } = useAuth()

  return useFetch({
    queryKey: ["save-status", opportunityId],
    queryFn: () => savedOpportunityService.getSaveStatus(opportunityId),
    options: { enabled: !!opportunityId && !!isAuthenticated }
  })
}

export function useToggleSave() {
  return useMutationAction(
    (opportunityId: string) => savedOpportunityService.toggleSave(opportunityId),
    {
      invalidateKeys: [["saved-opportunities"], ["save-status"]],
    }
  )
}
