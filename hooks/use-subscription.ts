"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { subscriptionService } from "@/services/subscription.service"
import type { CheckoutRequest } from "@/types/subscription"

export function useSubscriptionStatus() {
  return useFetch({
    queryKey: ["subscription-status"],
    queryFn: () => subscriptionService.getStatus(),
  })
}

export function useUsage() {
  return useFetch({
    queryKey: ["usage"],
    queryFn: () => subscriptionService.getUsage(),
  })
}

export function useInitiateCheckout() {
  return useMutationAction(
    (data: CheckoutRequest) => subscriptionService.initiateCheckout(data),
    {
      successMessage: "Redirecting to payment...",
    },
  )
}
