"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import {
  educationService,
  experienceService,
  publicationService,
  testScoreService,
  certificationService,
  awardService,
  refereeService,
} from "@/services/profile-entities.service"
import type {
  CreateEducationRequest, UpdateEducationRequest,
  CreateExperienceRequest, UpdateExperienceRequest,
  CreatePublicationRequest, UpdatePublicationRequest,
  CreateTestScoreRequest, UpdateTestScoreRequest,
  CreateCertificationRequest, UpdateCertificationRequest,
  CreateAwardRequest, UpdateAwardRequest,
  CreateRefereeRequest, UpdateRefereeRequest,
} from "@/types/profile-entities"

// Generic hook factory
function useEntityList<T>(key: string, service: { getAll: () => Promise<any> }) {
  return useFetch({ queryKey: [key], queryFn: () => service.getAll() })
}

function useEntityCreate<C>(key: string, service: { create: (data: C) => Promise<any> }, label: string) {
  return useMutationAction(
    (data: C) => service.create(data),
    { successMessage: `${label} added`, invalidateKeys: [[key]] }
  )
}

function useEntityUpdate<U>(key: string, service: { update: (id: string, data: U) => Promise<any> }, label: string) {
  return useMutationAction(
    ({ id, data }: { id: string; data: U }) => service.update(id, data),
    { successMessage: `${label} updated`, invalidateKeys: [[key]] }
  )
}

function useEntityDelete(key: string, service: { remove: (id: string) => Promise<any> }, label: string) {
  return useMutationAction(
    (id: string) => service.remove(id),
    { successMessage: `${label} deleted`, invalidateKeys: [[key]] }
  )
}

// Education
export const useEducations = () => useEntityList("educations", educationService)
export const useCreateEducation = () => useEntityCreate<CreateEducationRequest>("educations", educationService, "Education")
export const useUpdateEducation = () => useEntityUpdate<UpdateEducationRequest>("educations", educationService, "Education")
export const useDeleteEducation = () => useEntityDelete("educations", educationService, "Education")

// Experience
export const useExperiences = () => useEntityList("experiences", experienceService)
export const useCreateExperience = () => useEntityCreate<CreateExperienceRequest>("experiences", experienceService, "Experience")
export const useUpdateExperience = () => useEntityUpdate<UpdateExperienceRequest>("experiences", experienceService, "Experience")
export const useDeleteExperience = () => useEntityDelete("experiences", experienceService, "Experience")

// Publication
export const usePublications = () => useEntityList("publications", publicationService)
export const useCreatePublication = () => useEntityCreate<CreatePublicationRequest>("publications", publicationService, "Publication")
export const useUpdatePublication = () => useEntityUpdate<UpdatePublicationRequest>("publications", publicationService, "Publication")
export const useDeletePublication = () => useEntityDelete("publications", publicationService, "Publication")

// TestScore
export const useTestScores = () => useEntityList("test-scores", testScoreService)
export const useCreateTestScore = () => useEntityCreate<CreateTestScoreRequest>("test-scores", testScoreService, "Test score")
export const useUpdateTestScore = () => useEntityUpdate<UpdateTestScoreRequest>("test-scores", testScoreService, "Test score")
export const useDeleteTestScore = () => useEntityDelete("test-scores", testScoreService, "Test score")

// Certification
export const useCertifications = () => useEntityList("certifications", certificationService)
export const useCreateCertification = () => useEntityCreate<CreateCertificationRequest>("certifications", certificationService, "Certification")
export const useUpdateCertification = () => useEntityUpdate<UpdateCertificationRequest>("certifications", certificationService, "Certification")
export const useDeleteCertification = () => useEntityDelete("certifications", certificationService, "Certification")

// Award
export const useAwards = () => useEntityList("awards", awardService)
export const useCreateAward = () => useEntityCreate<CreateAwardRequest>("awards", awardService, "Award")
export const useUpdateAward = () => useEntityUpdate<UpdateAwardRequest>("awards", awardService, "Award")
export const useDeleteAward = () => useEntityDelete("awards", awardService, "Award")

// Referee
export const useReferees = () => useEntityList("referees", refereeService)
export const useCreateReferee = () => useEntityCreate<CreateRefereeRequest>("referees", refereeService, "Referee")
export const useUpdateReferee = () => useEntityUpdate<UpdateRefereeRequest>("referees", refereeService, "Referee")
export const useDeleteReferee = () => useEntityDelete("referees", refereeService, "Referee")
