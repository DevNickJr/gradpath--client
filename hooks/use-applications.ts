"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { applicationService } from "@/services/application.service"
import type { CreateApplicationRequest, UpdateApplicationRequest } from "@/types/application"

export function useApplications(status?: string, page = 1, limit = 20) {
  return useFetch({
      queryKey: ["applications", status ?? "all", page, limit],
      queryFn: () => applicationService.getApplications(status, page, limit)
    }
  )
}

export function useApplication(id: string) {
  return useFetch({
    queryKey: ["application", id],
    queryFn: () => applicationService.getApplication(id),
    options: { enabled: !!id }
  })
}

export function useCreateApplication() {
  return useMutationAction(
    (data: CreateApplicationRequest) => applicationService.createApplication(data),
    {
      successMessage: "Application tracking started",
      invalidateKeys: [["applications"]],
    }
  )
}

export function useUpdateApplication(id: string) {
  return useMutationAction(
    (data: UpdateApplicationRequest) => applicationService.updateApplication(id, data),
    {
      successMessage: "Application updated",
      invalidateKeys: [["applications"], ["application", id]],
    }
  )
}

export function useDeleteApplication() {
  return useMutationAction(
    (id: string) => applicationService.deleteApplication(id),
    {
      successMessage: "Application removed",
      invalidateKeys: [["applications"]],
    }
  )
}
