import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { SavedOpportunity, SaveStatusResponse } from "@/types/saved-opportunity"

export const savedOpportunityService = {
  async toggleSave(opportunityId: string) {
    return apiClient.post<ApiResponse<SavedOpportunity | { message: string }>>("/saved-opportunities", { opportunityId })
  },

  async getSavedOpportunities(page = 1, limit = 20) {
    return apiClient.get<PaginatedResponse<SavedOpportunity>>("/saved-opportunities", { page, limit })
  },

  async getSaveStatus(opportunityId: string) {
    return apiClient.get<ApiResponse<SaveStatusResponse>>(`/saved-opportunities/${opportunityId}/status`)
  },
}
