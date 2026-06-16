"use client"

import Link from "next/link"
import { MapPin, Calendar, Heart } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToggleSave, useSaveStatus } from "@/hooks/use-saved-opportunities"
import { useAuth } from "@/hooks/use-auth"
import {
  ROUTES,
  DEGREE_LEVEL_LABELS,
  FUNDING_TYPE_LABELS,
  OPPORTUNITY_TYPE_LABELS,
} from "@/lib/constants"
import { cn, daysUntil } from "@/lib/utils"
import type { Opportunity } from "@/types/opportunity"

interface OpportunityCardProps {
  opportunity: Opportunity
  showSaveButton?: boolean
}

export function OpportunityCard({ opportunity, showSaveButton }: OpportunityCardProps) {
  const { isAuthenticated } = useAuth()
  const { data: saveStatusData } = useSaveStatus(opportunity.id)
  const { mutate: toggleSave, isPending: isSaving } = useToggleSave()

  const days = daysUntil(opportunity.deadline)
  const isExpired = days < 0
  const isSaved = saveStatusData?.data?.saved ?? false

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSave(opportunity.id)
  }

  return (
    <Link href={ROUTES.OPPORTUNITY_DETAIL(opportunity.id)} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">{opportunity.university}</p>
              <h3 className="font-semibold leading-snug line-clamp-2">
                {opportunity.title}
              </h3>
            </div>
            {showSaveButton && isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveClick}
                disabled={isSaving}
                className="shrink-0"
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isSaved && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{opportunity.country}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span className={cn(isExpired && "text-destructive")}>
                {isExpired ? "Expired" : `${days} days left`}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
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
        </CardContent>
      </Card>
    </Link>
  )
}
