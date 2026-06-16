import type { Opportunity } from "./opportunity"

export interface SavedOpportunity {
  id: string
  userId: string
  opportunityId: string
  opportunity?: Opportunity
  createdAt: string
}

export interface SaveStatusResponse {
  saved: boolean
}
