"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { commentService } from "@/services/comment.service"
import type { CreateCommentRequest } from "@/types/comment"

export function useComments(opportunityId: string, page = 1, limit = 20) {
  return useFetch({
    queryKey: ["comments", opportunityId, page, limit],
    queryFn: () => commentService.getComments(opportunityId, page, limit),
    options: { enabled: !!opportunityId },
  })
}

export function useCreateComment(opportunityId: string) {
  return useMutationAction(
    (data: CreateCommentRequest) => commentService.createComment(opportunityId, data),
    {
      successMessage: "Comment posted",
      invalidateKeys: [["comments", opportunityId]],
    }
  )
}

export function useDeleteComment(opportunityId: string) {
  return useMutationAction(
    (commentId: string) => commentService.deleteComment(opportunityId, commentId),
    {
      successMessage: "Comment deleted",
      invalidateKeys: [["comments", opportunityId]],
    }
  )
}
