export interface Education {
  id: string
  userId: string
  institution: string
  degree: string
  fieldOfStudy: string
  gpa?: number
  gpaScale?: number
  startDate?: string
  endDate?: string
  country?: string
  thesis?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Experience {
  id: string
  userId: string
  title: string
  organization: string
  type: string
  startDate?: string
  endDate?: string
  isCurrent: boolean
  description?: string
  location?: string
  createdAt: string
  updatedAt: string
}

export interface Publication {
  id: string
  userId: string
  title: string
  journal?: string
  date?: string
  authors?: string[]
  url?: string
  type?: string
  createdAt: string
  updatedAt: string
}

export interface TestScore {
  id: string
  userId: string
  testName: string
  score: number
  subScores?: Record<string, number>
  dateTaken?: string
  expiryDate?: string
  createdAt: string
  updatedAt: string
}

export interface Certification {
  id: string
  userId: string
  name: string
  issuingOrg?: string
  dateIssued?: string
  expiryDate?: string
  credentialUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Award {
  id: string
  userId: string
  title: string
  issuingOrg?: string
  date?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Referee {
  id: string
  userId: string
  name: string
  title?: string
  institution?: string
  email?: string
  phone?: string
  relationship?: string
  createdAt: string
  updatedAt: string
}

// Request types
export type CreateEducationRequest = Omit<Education, "id" | "userId" | "createdAt" | "updatedAt">
export type UpdateEducationRequest = Partial<CreateEducationRequest>

export type CreateExperienceRequest = Omit<Experience, "id" | "userId" | "createdAt" | "updatedAt">
export type UpdateExperienceRequest = Partial<CreateExperienceRequest>

export type CreatePublicationRequest = Omit<Publication, "id" | "userId" | "createdAt" | "updatedAt">
export type UpdatePublicationRequest = Partial<CreatePublicationRequest>

export type CreateTestScoreRequest = Omit<TestScore, "id" | "userId" | "createdAt" | "updatedAt">
export type UpdateTestScoreRequest = Partial<CreateTestScoreRequest>

export type CreateCertificationRequest = Omit<Certification, "id" | "userId" | "createdAt" | "updatedAt">
export type UpdateCertificationRequest = Partial<CreateCertificationRequest>

export type CreateAwardRequest = Omit<Award, "id" | "userId" | "createdAt" | "updatedAt">
export type UpdateAwardRequest = Partial<CreateAwardRequest>

export type CreateRefereeRequest = Omit<Referee, "id" | "userId" | "createdAt" | "updatedAt">
export type UpdateRefereeRequest = Partial<CreateRefereeRequest>
