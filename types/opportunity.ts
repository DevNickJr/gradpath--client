import { OpportunityType, DegreeLevel, FundingType } from "@/lib/constants"

export interface Opportunity {
  id: string
  title: string
  description: string
  university: string
  country: string
  opportunityType: OpportunityType
  degreeLevel: DegreeLevel
  fieldsOfStudy: string[]
  fundingType: FundingType
  benefits: string[]
  deadline: string
  applicationLink: string
  sourceUrl?: string
  isActive: boolean
  isFeatured: boolean
  createdById: string
  createdAt: string
  updatedAt: string
}

export interface CreateOpportunityRequest {
  title: string
  description: string
  university: string
  country: string
  opportunityType: OpportunityType
  degreeLevel: DegreeLevel
  fieldsOfStudy?: string[]
  fundingType: FundingType
  benefits?: string[]
  deadline: string
  applicationLink: string
  sourceUrl?: string
  isFeatured?: boolean
}

export interface UpdateOpportunityRequest extends Partial<CreateOpportunityRequest> {}

export interface OpportunityFilters {
  country?: string
  degreeLevel?: DegreeLevel
  opportunityType?: OpportunityType
  fundingType?: FundingType
  search?: string
  deadlineBefore?: string
  deadlineAfter?: string
  page?: number
  limit?: number
  sortBy?: "deadline" | "createdAt"
  sortOrder?: "ASC" | "DESC"
}
