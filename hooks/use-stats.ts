"use client"

import { useFetch } from "./use-fetch"
import { statsService } from "@/services/stats.service"

export function useStats() {
  return useFetch({
    queryKey: ["stats"],
    queryFn: () => statsService.getStats(),
    options: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  })
}
