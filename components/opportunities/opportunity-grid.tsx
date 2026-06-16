import { Search } from "lucide-react"
import { OpportunityCard } from "@/components/opportunities/opportunity-card"
import { EmptyState } from "@/components/shared/empty-state"
import type { Opportunity } from "@/types/opportunity"

interface OpportunityGridProps {
  opportunities: Opportunity[]
  showSaveButton?: boolean
}

export function OpportunityGrid({ opportunities, showSaveButton }: OpportunityGridProps) {
  if (opportunities.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No opportunities found"
        description="Try adjusting your filters or search criteria to find more opportunities."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          showSaveButton={showSaveButton}
        />
      ))}
    </div>
  )
}
