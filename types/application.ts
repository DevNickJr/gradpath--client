import { ApplicationStatus } from "@/lib/constants"
import type { Opportunity } from "./opportunity"

export interface Application {
  id: string
  userId: string
  opportunityId: string
  status: ApplicationStatus
  notes: string
  submittedAt?: string
  deadlineAt?: string
  opportunity?: Opportunity
  createdAt: string
  updatedAt: string
}

export interface CreateApplicationRequest {
  opportunityId: string
  notes?: string
  deadlineAt?: string
}

export interface UpdateApplicationRequest {
  status?: ApplicationStatus
  notes?: string
  submittedAt?: string
  deadlineAt?: string
}
