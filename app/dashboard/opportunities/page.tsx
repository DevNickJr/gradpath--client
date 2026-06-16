"use client"

import { useAuth } from "@/hooks/use-auth"
import { useOpportunities, useDeleteOpportunity } from "@/hooks/use-opportunities"
import { ROUTES, ADMIN_ROLES } from "@/lib/constants"
import { formatDate, daysUntil } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, Pencil, Plus, GraduationCap } from "lucide-react"
import { PageLoader } from "@/components/shared/loading-spinner"
import { EmptyState } from "@/components/shared/empty-state"

export default function DashboardOpportunitiesPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { data, isLoading } = useOpportunities()
  const { mutate: deleteOpportunity, isPending: isDeleting } = useDeleteOpportunity()

  if (authLoading || isLoading) {
    return <PageLoader />
  }

  const isAdmin = user && ADMIN_ROLES.includes(user.role)

  if (!isAdmin) {
    router.push(ROUTES.DASHBOARD)
    return null
  }

  const opportunities = data?.data ?? []

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      deleteOpportunity(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Opportunities</h1>
          <p className="text-muted-foreground">
            Manage opportunities you have posted.
          </p>
        </div>
        <Link
          href={ROUTES.DASHBOARD_NEW_OPPORTUNITY}
          className={buttonVariants({ variant: "default" })}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Opportunity
        </Link>
      </div>

      {opportunities.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No opportunities yet"
          description="You haven't posted any opportunities. Create one to get started."
          action={{
            label: "Post Opportunity",
            onClick: () => router.push(ROUTES.DASHBOARD_NEW_OPPORTUNITY),
          }}
        />
      ) : (
        <div className="space-y-3">
          {opportunities.map((opportunity) => {
            const days = daysUntil(opportunity.deadline)
            const isExpired = days < 0
            return (
              <Card key={opportunity.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={ROUTES.OPPORTUNITY_DETAIL(opportunity.id)}
                      className="font-semibold hover:underline line-clamp-1"
                    >
                      {opportunity.title}
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>{opportunity.university}</span>
                      <span>&middot;</span>
                      <span>{opportunity.country}</span>
                      <span>&middot;</span>
                      <span className={isExpired ? "text-destructive" : ""}>
                        {isExpired
                          ? "Expired"
                          : `Deadline: ${formatDate(opportunity.deadline)}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {opportunity.isFeatured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                    <Link
                      href={ROUTES.DASHBOARD_EDIT_OPPORTUNITY(opportunity.id)}
                      className={buttonVariants({ variant: "outline", size: "icon" })}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(opportunity.id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
