import { apiClient } from "@/lib/api-client"
import type { ApiResponse } from "@/types/api"
import type { StatsData } from "@/types/subscription"

export const statsService = {
  async getStats() {
    return apiClient.get<ApiResponse<StatsData>>("/opportunities/stats")
  },
}
