import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { Document, GenerateDocumentRequest } from "@/types/document"

export const documentService = {
  async generateDocument(data: GenerateDocumentRequest) {
    return apiClient.post<ApiResponse<Document>>("/documents/generate", data)
  },

  async getDocuments(page = 1, limit = 20) {
    return apiClient.get<PaginatedResponse<Document>>("/documents", { page, limit })
  },

  async getDocument(id: string) {
    return apiClient.get<ApiResponse<Document>>(`/documents/${id}`)
  },

  async deleteDocument(id: string) {
    return apiClient.delete<ApiResponse<{ message: string }>>(`/documents/${id}`)
  },
}
