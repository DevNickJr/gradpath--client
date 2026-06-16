import { RolesEnum } from "@/lib/constants"

export interface UserProfile {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  bio?: string
  profileImage?: string
  university?: string
  degree?: string
  fieldOfStudy?: string
  gpa?: number
  graduationYear?: number
  countryOfOrigin?: string
  targetCountries?: string[]
  researchInterests?: string[]
  publications?: string[]
  workExperience?: string
  skills?: string[]
}

export interface User {
  id: string
  email: string
  role: RolesEnum
  isVerified: boolean
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
  university?: string
  degree?: string
  fieldOfStudy?: string
  gpa?: number
  graduationYear?: number
  countryOfOrigin?: string
  targetCountries?: string[]
  researchInterests?: string[]
  publications?: string[]
  workExperience?: string
  skills?: string[]
}
