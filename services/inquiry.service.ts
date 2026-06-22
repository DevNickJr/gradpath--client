import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { Inquiry, CreateInquiryRequest, ReplyInquiryRequest } from "@/types/inquiry"

export const inquiryService = {
  async getMyInquiries(page = 1, limit = 20) {
    return apiClient.get<PaginatedResponse<Inquiry>>("/inquiries", { page, limit })
  },

  async getAllInquiries(page = 1, limit = 20) {
    return apiClient.get<PaginatedResponse<Inquiry>>("/inquiries/all", { page, limit })
  },

  async getInquiry(id: string) {
    return apiClient.get<ApiResponse<Inquiry>>(`/inquiries/${id}`)
  },

  async createInquiry(data: CreateInquiryRequest) {
    return apiClient.post<ApiResponse<Inquiry>>("/inquiries", data)
  },

  async replyToInquiry(id: string, data: ReplyInquiryRequest) {
    return apiClient.post<ApiResponse<Inquiry>>(`/inquiries/${id}/reply`, data)
  },

  async updateInquiryStatus(id: string, status: string) {
    return apiClient.patch<ApiResponse<Inquiry>>(`/inquiries/${id}/status`, { status })
  },
}
