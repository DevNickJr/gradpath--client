import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { Opportunity, CreateOpportunityRequest, UpdateOpportunityRequest, OpportunityFilters } from "@/types/opportunity"

export const opportunityService = {
  async getOpportunities(filters?: OpportunityFilters) {
    const params = filters as Record<string, string | number | boolean | undefined> | undefined
    return apiClient.get<PaginatedResponse<Opportunity>>("/opportunities", params)
  },

  async getOpportunity(id: string) {
    return apiClient.get<ApiResponse<Opportunity>>(`/opportunities/${id}`)
  },

  async createOpportunity(data: CreateOpportunityRequest) {
    return apiClient.post<ApiResponse<Opportunity>>("/opportunities", data)
  },

  async updateOpportunity(id: string, data: UpdateOpportunityRequest) {
    return apiClient.patch<ApiResponse<Opportunity>>(`/opportunities/${id}`, data)
  },

  async deleteOpportunity(id: string) {
    return apiClient.delete<ApiResponse<{ message: string }>>(`/opportunities/${id}`)
  },
}
