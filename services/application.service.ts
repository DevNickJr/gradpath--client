import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { Application, CreateApplicationRequest, UpdateApplicationRequest } from "@/types/application"

export const applicationService = {
  async createApplication(data: CreateApplicationRequest) {
    return apiClient.post<ApiResponse<Application>>("/applications", data)
  },

  async getApplications(status?: string, page = 1, limit = 20) {
    return apiClient.get<PaginatedResponse<Application>>("/applications", { status, page, limit })
  },

  async getApplication(id: string) {
    return apiClient.get<ApiResponse<Application>>(`/applications/${id}`)
  },

  async updateApplication(id: string, data: UpdateApplicationRequest) {
    return apiClient.patch<ApiResponse<Application>>(`/applications/${id}`, data)
  },

  async deleteApplication(id: string) {
    return apiClient.delete<ApiResponse<{ message: string }>>(`/applications/${id}`)
  },
}
