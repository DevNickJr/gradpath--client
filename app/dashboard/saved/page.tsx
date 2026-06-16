"use client"

import { useState } from "react"
import { useSavedOpportunities } from "@/hooks/use-saved-opportunities"
import { OpportunityGrid } from "@/components/opportunities/opportunity-grid"
import { Pagination } from "@/components/shared/pagination"
import { PageLoader } from "@/components/shared/loading-spinner"
import { EmptyState } from "@/components/shared/empty-state"
import { Heart } from "lucide-react"

export default function SavedOpportunitiesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useSavedOpportunities(page, 12)

  if (isLoading) {
    return <PageLoader />
  }

  const savedItems = data?.data ?? []
  const totalPages = data?.totalPages ?? 1

  const opportunities = savedItems
    .filter((item) => item.opportunity)
    .map((item) => item.opportunity!)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Opportunities</h1>
        <p className="text-muted-foreground">
          Opportunities you have bookmarked for later.
        </p>
      </div>

      {savedItems.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved opportunities yet"
          description="Browse opportunities and save the ones that interest you to find them here."
        />
      ) : (
        <>
          <OpportunityGrid opportunities={opportunities} showSaveButton />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
