"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { inquiryService } from "@/services/inquiry.service"
import type { CreateInquiryRequest, ReplyInquiryRequest } from "@/types/inquiry"

export function useInquiries(page = 1, limit = 20) {
  return useFetch({
    queryKey: ["inquiries", page, limit],
    queryFn: () => inquiryService.getMyInquiries(page, limit),
  })
}

export function useAllInquiries(page = 1, limit = 20) {
  return useFetch({
    queryKey: ["all-inquiries", page, limit],
    queryFn: () => inquiryService.getAllInquiries(page, limit),
  })
}

export function useInquiry(id: string) {
  return useFetch({
    queryKey: ["inquiry", id],
    queryFn: () => inquiryService.getInquiry(id),
    options: { enabled: !!id },
  })
}

export function useCreateInquiry() {
  return useMutationAction(
    (data: CreateInquiryRequest) => inquiryService.createInquiry(data),
    {
      successMessage: "Inquiry submitted",
      invalidateKeys: [["inquiries"]],
    }
  )
}

export function useReplyInquiry(id: string) {
  return useMutationAction(
    (data: ReplyInquiryRequest) => inquiryService.replyToInquiry(id, data),
    {
      successMessage: "Reply sent",
      invalidateKeys: [["inquiry", id], ["inquiries"]],
    }
  )
}

export function useUpdateInquiryStatus(id: string) {
  return useMutationAction(
    (status: string) => inquiryService.updateInquiryStatus(id, status),
    {
      successMessage: "Status updated",
      invalidateKeys: [["inquiry", id], ["inquiries"], ["all-inquiries"]],
    }
  )
}
