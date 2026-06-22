import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { Comment, CreateCommentRequest } from "@/types/comment"

export const commentService = {
  async getComments(opportunityId: string, page = 1, limit = 20) {
    return apiClient.get<PaginatedResponse<Comment>>(
      `/opportunities/${opportunityId}/comments`,
      { page, limit }
    )
  },

  async createComment(opportunityId: string, data: CreateCommentRequest) {
    return apiClient.post<ApiResponse<Comment>>(
      `/opportunities/${opportunityId}/comments`,
      data
    )
  },

  async deleteComment(opportunityId: string, commentId: string) {
    return apiClient.delete<ApiResponse<{ message: string }>>(
      `/opportunities/${opportunityId}/comments/${commentId}`
    )
  },
}
