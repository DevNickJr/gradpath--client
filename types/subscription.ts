export interface SubscriptionInfo {
  id: string
  plan: string
  status: string
  startDate: string
  endDate: string
}

export interface SubscriptionStatusResponse {
  plan: "free" | "pro"
  subscription: SubscriptionInfo | null
}

export interface UsageItem {
  used: number
  limit: number
}

export interface UsageSummary {
  documentGeneration: UsageItem
  recommendation: UsageItem
  coldEmail: UsageItem
}

export interface CheckoutRequest {
  plan: "pro" | "basic"
  redirectUrl: string
}

export interface CheckoutResponse {
  checkoutUrl: string
}

export interface StatsData {
  opportunities: number
  universities: number
  countries: number
}
