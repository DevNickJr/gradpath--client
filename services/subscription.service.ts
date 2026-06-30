import { apiClient } from "@/lib/api-client"
import type { ApiResponse } from "@/types/api"
import type {
  SubscriptionStatusResponse,
  UsageSummary,
  CheckoutRequest,
  CheckoutResponse,
} from "@/types/subscription"

export const subscriptionService = {
  async initiateCheckout(data: CheckoutRequest) {
    return apiClient.post<ApiResponse<CheckoutResponse>>("/subscriptions/checkout", data)
  },

  async getStatus() {
    return apiClient.get<ApiResponse<SubscriptionStatusResponse>>("/subscriptions/status")
  },

  async getUsage() {
    return apiClient.get<ApiResponse<UsageSummary>>("/subscriptions/usage")
  },
}
