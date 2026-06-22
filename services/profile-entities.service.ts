import { apiClient } from "@/lib/api-client"
import type { ApiResponse } from "@/types/api"
import type {
  Education, CreateEducationRequest, UpdateEducationRequest,
  Experience, CreateExperienceRequest, UpdateExperienceRequest,
  Publication, CreatePublicationRequest, UpdatePublicationRequest,
  TestScore, CreateTestScoreRequest, UpdateTestScoreRequest,
  Certification, CreateCertificationRequest, UpdateCertificationRequest,
  Award, CreateAwardRequest, UpdateAwardRequest,
  Referee, CreateRefereeRequest, UpdateRefereeRequest,
} from "@/types/profile-entities"

function createEntityService<T, C, U>(basePath: string) {
  return {
    async getAll() {
      return apiClient.get<ApiResponse<T[]>>(basePath)
    },
    async getOne(id: string) {
      return apiClient.get<ApiResponse<T>>(`${basePath}/${id}`)
    },
    async create(data: C) {
      return apiClient.post<ApiResponse<T>>(basePath, data)
    },
    async update(id: string, data: U) {
      return apiClient.patch<ApiResponse<T>>(`${basePath}/${id}`, data)
    },
    async remove(id: string) {
      return apiClient.delete<ApiResponse<{ message: string }>>(`${basePath}/${id}`)
    },
  }
}

export const educationService = createEntityService<Education, CreateEducationRequest, UpdateEducationRequest>("/users/me/educations")
export const experienceService = createEntityService<Experience, CreateExperienceRequest, UpdateExperienceRequest>("/users/me/experiences")
export const publicationService = createEntityService<Publication, CreatePublicationRequest, UpdatePublicationRequest>("/users/me/publications")
export const testScoreService = createEntityService<TestScore, CreateTestScoreRequest, UpdateTestScoreRequest>("/users/me/test-scores")
export const certificationService = createEntityService<Certification, CreateCertificationRequest, UpdateCertificationRequest>("/users/me/certifications")
export const awardService = createEntityService<Award, CreateAwardRequest, UpdateAwardRequest>("/users/me/awards")
export const refereeService = createEntityService<Referee, CreateRefereeRequest, UpdateRefereeRequest>("/users/me/referees")
