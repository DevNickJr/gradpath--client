"use client"

import { useState } from "react"
import Link from "next/link"
import { useRecommendations } from "@/hooks/use-recommendations"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/constants"
import { OpportunityGrid } from "@/components/opportunities/opportunity-grid"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Loader2, UserCircle } from "lucide-react"
import type { Opportunity } from "@/types/opportunity"

export default function RecommendationsPage() {
  const { user } = useAuth()
  const { mutateAsync: fetchRecommendations, isPending } = useRecommendations()
  const [recommendations, setRecommendations] = useState<Opportunity[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const profileIncomplete =
    !user?.profile?.targetCountries?.length &&
    !user?.profile?.researchInterests?.length

  const handleGetRecommendations = async () => {
    setError(null)
    try {
      const response = await fetchRecommendations()
      setRecommendations(response.data ?? [])
      setHasSearched(true)
    } catch (err: any) {
      if (err?.statusCode === 403 || err?.status === 403) {
        setError(err.message || "Usage limit reached. Upgrade to Pro for unlimited recommendations.")
      } else {
        setError(err.message || "Failed to get recommendations.")
      }
      setHasSearched(true)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recommendations</h1>
        <p className="text-muted-foreground">
          Get personalized opportunity recommendations based on your profile
        </p>
      </div>

      {profileIncomplete && (
        <Card className="p-4 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <UserCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Complete your profile for better results</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add your target countries and research interests to get more relevant recommendations.
              </p>
              <Link href={ROUTES.DASHBOARD_PROFILE}>
                <Button variant="outline" size="sm" className="mt-2">
                  Update Profile
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      <div className="flex items-center gap-3">
        <Button
          onClick={handleGetRecommendations}
          disabled={isPending}
          className="gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Finding matches...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Get Recommendations
            </>
          )}
        </Button>
        {user?.subscriptionPlan !== "pro" && (
          <p className="text-xs text-muted-foreground">
            Free plan: 1 request/month.{" "}
            <Link href={ROUTES.PRICING} className="text-primary hover:underline">
              Upgrade for unlimited
            </Link>
          </p>
        )}
      </div>

      {error && (
        <Card className="p-4 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          {error.includes("Upgrade") && (
            <Link href={ROUTES.PRICING}>
              <Button variant="outline" size="sm" className="mt-2">
                View Plans
              </Button>
            </Link>
          )}
        </Card>
      )}

      {hasSearched && !error && recommendations.length === 0 && (
        <Card className="p-8 text-center">
          <Sparkles className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No matching opportunities found</h3>
          <p className="text-sm text-muted-foreground">
            Try updating your profile with more specific target countries and research interests.
          </p>
        </Card>
      )}

      {recommendations.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Top {recommendations.length} Matches for You
          </h2>
          <OpportunityGrid opportunities={recommendations} showSaveButton />
        </div>
      )}
    </div>
  )
}
