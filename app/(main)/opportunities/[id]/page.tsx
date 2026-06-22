"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import {
  MapPin,
  Calendar,
  Heart,
  ExternalLink,
  ArrowLeft,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PageLoader } from "@/components/shared/loading-spinner"
import { useOpportunity } from "@/hooks/use-opportunities"
import { useToggleSave, useSaveStatus } from "@/hooks/use-saved-opportunities"
import { useCreateApplication } from "@/hooks/use-applications"
import { useAuth } from "@/hooks/use-auth"
import {
  ROUTES,
  DEGREE_LEVEL_LABELS,
  FUNDING_TYPE_LABELS,
  OPPORTUNITY_TYPE_LABELS,
} from "@/lib/constants"
import { cn, formatDate, daysUntil } from "@/lib/utils"
import Link from "next/link"
import { CommentSection } from "@/components/comments/comment-section"

interface OpportunityDetailPageProps {
  params: Promise<{ id: string }>
}

export default function OpportunityDetailPage({ params }: OpportunityDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const { data: opportunityData, isLoading } = useOpportunity(id)
  const { data: saveStatusData } = useSaveStatus(id)
  const { mutate: toggleSave, isPending: isSaving } = useToggleSave()
  const { mutate: createApplication, isPending: isCreatingApplication } = useCreateApplication()

  if (isLoading) {
    return <PageLoader />
  }

  const opportunity = opportunityData?.data
  if (!opportunity) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Opportunity not found.</p>
        <Button variant="outline" onClick={() => router.push(ROUTES.OPPORTUNITIES)} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Opportunities
        </Button>
      </div>
    )
  }

  const days = daysUntil(opportunity.deadline)
  const isExpired = days < 0
  const isSaved = saveStatusData?.data?.saved ?? false

  const handleTrackApplication = () => {
    createApplication({ opportunityId: opportunity.id })
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push(ROUTES.OPPORTUNITIES)}
        className="gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Opportunities
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{opportunity.university}</p>
            <h1 className="text-3xl font-bold tracking-tight">{opportunity.title}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {DEGREE_LEVEL_LABELS[opportunity.degreeLevel]}
              </Badge>
              <Badge variant="secondary">
                {FUNDING_TYPE_LABELS[opportunity.fundingType]}
              </Badge>
              <Badge variant="outline">
                {OPPORTUNITY_TYPE_LABELS[opportunity.opportunityType]}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          {opportunity.benefits && opportunity.benefits.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Benefits</h2>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {opportunity.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {opportunity.fieldsOfStudy && opportunity.fieldsOfStudy.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Fields of Study</h2>
                <div className="flex flex-wrap gap-2">
                  {opportunity.fieldsOfStudy.map((field, index) => (
                    <Badge key={index} variant="outline">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <CommentSection opportunityId={id} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>{opportunity.country}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <span className={cn(isExpired && "text-destructive")}>
                    {isExpired ? "Expired" : `${days} days left`}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    ({formatDate(opportunity.deadline)})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>{opportunity.university}</span>
              </div>

              <Separator />

              <a
                href={opportunity.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "w-full", isExpired && "pointer-events-none opacity-50")}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Apply Now
              </a>

           

              {isAuthenticated && (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toggleSave(opportunity.id)}
                    disabled={isSaving}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 mr-1",
                        isSaved && "fill-red-500 text-red-500"
                      )}
                    />
                    {isSaved ? "Saved" : "Save Opportunity"}
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleTrackApplication}
                    disabled={isCreatingApplication}
                  >
                    {isCreatingApplication ? "Tracking..." : "Track Application"}
                  </Button>
                </>
              )}
              <Link href={`${ROUTES.DASHBOARD_NEW_DOCUMENT}?opportunityId=${id}`}>
                <Button variant="outline" className="w-full">
                    Generate a Document
                </Button>
              </Link>


              {opportunity.sourceUrl && (
                <a
                  href={opportunity.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Source
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
