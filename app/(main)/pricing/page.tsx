"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useInitiateCheckout } from "@/hooks/use-subscription"
import { ROUTES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Sparkles, Loader2 } from "lucide-react"
import { toast } from "sonner"

const PLANS = [
  {
    id: "free",
    title: "Free",
    name: "free",
    description: "Get started with essential features",
    price: "0",
    period: "/month",
    recommended: false,
    features: [
      { text: "Browse all opportunities", included: true },
      { text: "Save opportunities", included: true },
      { text: "Track applications", included: true },
      { text: "Community comments", included: true },
      { text: "3 AI document generations/month", included: true },
      { text: "1 recommendation request/month", included: true },
      { text: "Cold email generation", included: false },
      { text: "Unlimited document generation", included: false },
      { text: "Unlimited recommendations", included: false },
    ],
  },
  {
    id: "basic",
    title: "Basic",
    name: "basic",
    description: "More AI power for active applicants",
    price: "2.99",
    period: "/month",
    recommended: false,
    features: [
      { text: "Everything in Free", included: true },
      { text: "25 AI document generations/month", included: true },
      { text: "5 recommendation requests/month", included: true },
      { text: "Cold email generation", included: true },
      { text: "Fee waiver requests", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "pro",
    title: "Pro",
    name: "pro",
    description: "Unlock unlimited access to all features",
    price: "9.99",
    period: "/month",
    recommended: true,
    features: [
      { text: "Everything in Basic", included: true },
      { text: "Unlimited AI document generations", included: true },
      { text: "Unlimited recommendation requests", included: true },
      { text: "Cold email generation", included: true },
      { text: "Fee waiver requests", included: true },
      { text: "Priority support", included: true },
    ],
  },
] as const

export default function PricingPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { mutateAsync: checkout, isPending } = useInitiateCheckout()

  const currentPlan = user?.subscriptionPlan;

  const handleUpgrade = async (plan: typeof PLANS[number]) => {
    if (!isAuthenticated) {
      router.push(`${ROUTES.LOGIN}?path=/pricing?plan=pro`)
      return
    }

    try {
      if (plan.name  == 'free') {
        return toast.info("You already have access to free plan")
      }
      const response = await checkout({
        plan: plan.name,
        redirectUrl: `${window.location.origin}/dashboard?payment=success`,
      })
      if (response.data?.checkoutUrl) {
        window.location.href = response.data.checkoutUrl
      }
    } catch {
      // Error handled by mutation hook toast
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get started for free or unlock the full power of GradPath with Pro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {PLANS.map((plan) => (
          <Card key={plan.id} className="p-8 flex flex-col border-primary relative overflow-visible">
            {
              plan.recommended &&
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Recommended
                  </Badge>
                </div>
            }
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
              <p className="text-muted-foreground text-sm">
                {plan.description}
              </p>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-3">
                {feature.included ? (
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                )}
                <span
                  className={
                    feature.included ? "" : "text-muted-foreground/60"
                  }
                >
                  {feature.text}
                </span>
              </li>
              ))}
            </ul>

            {(isAuthenticated && plan.name === currentPlan) ? (
              <Badge variant="outline" className="w-full justify-center py-2 text-sm">
                Current Plan
              </Badge>
            ): (plan.recommended) ? (
              <Button
                className="w-full gap-2"
                onClick={() => handleUpgrade(plan)}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Upgrade to Pro
                  </>
                )}
              </Button>
            ):
              <Button
                className="w-full gap-2 bg-white text-black/70 border-black/50"
                onClick={() => handleUpgrade(plan)}
                disabled={isPending}
              >
                Get Started
              </Button>
            
              }
          </Card>
        ))}
      </div>
    </div>
  )
}
