import { DocumentType, DocumentStatus } from "@/lib/constants"

export interface Document {
  id: string
  userId: string
  type: DocumentType
  title: string
  prompt: string
  content: string
  status: DocumentStatus
  metadata: Record<string, unknown>
  opportunityId?: string
  createdAt: string
  updatedAt: string
}

export interface GenerateDocumentRequest {
  type: DocumentType
  prompt: string
  opportunityId?: string
}
