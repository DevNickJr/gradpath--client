import { apiClient } from "@/lib/api-client"
import type { ApiResponse } from "@/types/api"
import type { Opportunity } from "@/types/opportunity"

export const recommendationService = {
  async getRecommendations() {
    return apiClient.get<ApiResponse<Opportunity[]>>("/recommendations")
  },
}
