"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DegreeLevel,
  OpportunityType,
  FundingType,
  DEGREE_LEVEL_LABELS,
  OPPORTUNITY_TYPE_LABELS,
  FUNDING_TYPE_LABELS,
} from "@/lib/constants"
import type { OpportunityFilters } from "@/types/opportunity"

interface OpportunityFiltersProps {
  filters: OpportunityFilters
  onChange: (filters: OpportunityFilters) => void
}

export function OpportunityFiltersComponent({ filters, onChange }: OpportunityFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="space-y-1.5">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search opportunities..."
          value={filters.search ?? ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value || undefined, page: 1 })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="Filter by country..."
          value={filters.country ?? ""}
          onChange={(e) => onChange({ ...filters, country: e.target.value || undefined, page: 1 })}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Degree Level</Label>
        <Select
          value={filters.degreeLevel ?? "all"}
          onValueChange={(val) =>
            val && onChange({
              ...filters,
              degreeLevel: val === "all" ? undefined : (val as DegreeLevel),
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Degrees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Degrees</SelectItem>
            {Object.values(DegreeLevel).map((level) => (
              <SelectItem key={level} value={level}>
                {DEGREE_LEVEL_LABELS[level]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Opportunity Type</Label>
        <Select
          value={filters.opportunityType ?? "all"}
          onValueChange={(val) =>
            val && onChange({
              ...filters,
              opportunityType: val === "all" ? undefined : (val as OpportunityType),
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.values(OpportunityType).map((type) => (
              <SelectItem key={type} value={type}>
                {OPPORTUNITY_TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Funding Type</Label>
        <Select
          value={filters.fundingType ?? "all"}
          onValueChange={(val) =>
            val && onChange({
              ...filters,
              fundingType: val === "all" ? undefined : (val as FundingType),
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Funding" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Funding</SelectItem>
            {Object.values(FundingType).map((type) => (
              <SelectItem key={type} value={type}>
                {FUNDING_TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Sort By</Label>
        <Select
          value={filters.sortBy ?? "createdAt"}
          onValueChange={(val) =>
            val && onChange({
              ...filters,
              sortBy: val as "createdAt" | "deadline",
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Date Added</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Sort Order</Label>
        <Select
          value={filters.sortOrder ?? "DESC"}
          onValueChange={(val) =>
            val && onChange({
              ...filters,
              sortOrder: val as "ASC" | "DESC",
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DESC">Newest First</SelectItem>
            <SelectItem value="ASC">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
