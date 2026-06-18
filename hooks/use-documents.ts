"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { documentService } from "@/services/document.service"
import type { GenerateDocumentRequest } from "@/types/document"

export function useDocuments(page = 1, limit = 20) {
  return useFetch({
    queryKey: ["documents", page, limit],
    queryFn: () => documentService.getDocuments(page, limit),
    options: { }
  })
}

export function useDocument(id: string) {
  return useFetch({
    queryKey: ["document", id],
    queryFn: () => documentService.getDocument(id),
    options: { enabled: !!id }
  })
}

export function useGenerateDocument() {
  return useMutationAction(
    (data: GenerateDocumentRequest) => documentService.generateDocument(data),
    {
      successMessage: "Document generated successfully",
      invalidateKeys: [["documents"]],
    }
  )
}

export function useDeleteDocument() {
  return useMutationAction(
    (id: string) => documentService.deleteDocument(id),
    {
      successMessage: "Document deleted",
      invalidateKeys: [["documents"]],
    }
  )
}
