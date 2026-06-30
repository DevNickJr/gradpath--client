import { RolesEnum } from "@/lib/constants"

export interface UserProfile {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  bio?: string
  profileImage?: string
  countryOfOrigin?: string
  targetCountries?: string[]
  researchInterests?: string[]
}

export interface User {
  id: string
  email: string
  role: RolesEnum
  isVerified: boolean
  subscriptionPlan?: "free" | "basic" | "pro"
  profile?: UserProfile | null
  createdAt: string
  updatedAt?: string
}

export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  bio?: string
  profileImage?: string
  countryOfOrigin?: string
  targetCountries?: string[]
  researchInterests?: string[]
}
