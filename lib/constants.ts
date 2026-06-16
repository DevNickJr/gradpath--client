export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001/api/v1"

export const ROUTES = {
  HOME: "/",
  OPPORTUNITIES: "/opportunities",
  OPPORTUNITY_DETAIL: (id: string) => `/opportunities/${id}`,
  ABOUT: "/about",
  CONTACT: "/contact",
  FAQ: "/faq",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  DASHBOARD_PROFILE: "/dashboard/profile",
  DASHBOARD_OPPORTUNITIES: "/dashboard/opportunities",
  DASHBOARD_NEW_OPPORTUNITY: "/dashboard/opportunities/new",
  DASHBOARD_EDIT_OPPORTUNITY: (id: string) => `/dashboard/opportunities/${id}/edit`,
  DASHBOARD_SAVED: "/dashboard/saved",
  DASHBOARD_APPLICATIONS: "/dashboard/applications",
  DASHBOARD_DOCUMENTS: "/dashboard/documents",
  DASHBOARD_NEW_DOCUMENT: "/dashboard/documents/new",
  DASHBOARD_NOTIFICATIONS: "/dashboard/notifications",
} as const

export enum OpportunityType {
  SCHOLARSHIP = "scholarship",
  FELLOWSHIP = "fellowship",
  ASSISTANTSHIP = "assistantship",
  FUNDED_PROGRAM = "funded_program",
  GRANT = "grant",
}

export enum DegreeLevel {
  BACHELORS = "bachelors",
  MASTERS = "masters",
  PHD = "phd",
  POSTDOC = "postdoc",
}

export enum FundingType {
  FULLY_FUNDED = "fully_funded",
  PARTIALLY_FUNDED = "partially_funded",
  SELF_FUNDED = "self_funded",
}

export enum ApplicationStatus {
  INTERESTED = "interested",
  APPLYING = "applying",
  SUBMITTED = "submitted",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  WITHDRAWN = "withdrawn",
}

export enum DocumentType {
  CV = "cv",
  SOP = "sop",
  RESEARCH_PROPOSAL = "research_proposal",
}

export enum DocumentStatus {
  PENDING = "pending",
  GENERATING = "generating",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum RolesEnum {
  STUDENT = "student",
  AGENT = "agent",
  ADMIN = "admin",
}

export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  [OpportunityType.SCHOLARSHIP]: "Scholarship",
  [OpportunityType.FELLOWSHIP]: "Fellowship",
  [OpportunityType.ASSISTANTSHIP]: "Assistantship",
  [OpportunityType.FUNDED_PROGRAM]: "Funded Program",
  [OpportunityType.GRANT]: "Grant",
}

export const DEGREE_LEVEL_LABELS: Record<DegreeLevel, string> = {
  [DegreeLevel.BACHELORS]: "Bachelor's",
  [DegreeLevel.MASTERS]: "Master's",
  [DegreeLevel.PHD]: "PhD",
  [DegreeLevel.POSTDOC]: "PostDoc",
}

export const FUNDING_TYPE_LABELS: Record<FundingType, string> = {
  [FundingType.FULLY_FUNDED]: "Fully Funded",
  [FundingType.PARTIALLY_FUNDED]: "Partially Funded",
  [FundingType.SELF_FUNDED]: "Self Funded",
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.INTERESTED]: "Interested",
  [ApplicationStatus.APPLYING]: "Applying",
  [ApplicationStatus.SUBMITTED]: "Submitted",
  [ApplicationStatus.ACCEPTED]: "Accepted",
  [ApplicationStatus.REJECTED]: "Rejected",
  [ApplicationStatus.WITHDRAWN]: "Withdrawn",
}

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.INTERESTED]: "bg-blue-100 text-blue-800",
  [ApplicationStatus.APPLYING]: "bg-yellow-100 text-yellow-800",
  [ApplicationStatus.SUBMITTED]: "bg-purple-100 text-purple-800",
  [ApplicationStatus.ACCEPTED]: "bg-green-100 text-green-800",
  [ApplicationStatus.REJECTED]: "bg-red-100 text-red-800",
  [ApplicationStatus.WITHDRAWN]: "bg-gray-100 text-gray-800",
}

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  [DocumentType.CV]: "Academic CV",
  [DocumentType.SOP]: "Statement of Purpose",
  [DocumentType.RESEARCH_PROPOSAL]: "Research Proposal",
}

export const DOCUMENT_STATUS_LABELS: Record<DocumentStatus, string> = {
  [DocumentStatus.PENDING]: "Pending",
  [DocumentStatus.GENERATING]: "Generating",
  [DocumentStatus.COMPLETED]: "Completed",
  [DocumentStatus.FAILED]: "Failed",
}

export const ROLE_LABELS: Record<RolesEnum, string> = {
  [RolesEnum.STUDENT]: "Student",
  [RolesEnum.AGENT]: "Agent",
  [RolesEnum.ADMIN]: "Admin",
}

export const ADMIN_ROLES = [RolesEnum.ADMIN, RolesEnum.AGENT]

export const DEGREE_OPTIONS = ["BSc", "MSc", "PhD", "PostDoc", "Other"] as const
