"use client"

import { useMutationAction } from "./use-mutation"
import { recommendationService } from "@/services/recommendation.service"

export function useRecommendations() {
  return useMutationAction(
    () => recommendationService.getRecommendations(),
    {
      successMessage: "Recommendations generated!",
      invalidateKeys: [["usage"]],
    },
  )
}
