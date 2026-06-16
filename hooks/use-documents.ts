"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { documentService } from "@/services/document.service"
import type { GenerateDocumentRequest } from "@/types/document"

export function useDocuments(page = 1, limit = 20) {
  return useFetch(
    ["documents", String(page), String(limit)],
    () => documentService.getDocuments(page, limit)
  )
}

export function useDocument(id: string) {
  return useFetch(
    ["document", id],
    () => documentService.getDocument(id),
    { enabled: !!id }
  )
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
