"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { GraduationCap } from "lucide-react"
import { useOpportunities } from "@/hooks/use-opportunities"
import { OpportunityFiltersComponent } from "@/components/opportunities/opportunity-filters"
import { OpportunityGrid } from "@/components/opportunities/opportunity-grid"
import { Pagination } from "@/components/shared/pagination"
import { PageLoader } from "@/components/shared/loading-spinner"
import type { OpportunityFilters } from "@/types/opportunity"
import OpportunityMobileFilter from "@/components/opportunities/opportunity-mobile-filter"
import { sendGTMEvent } from "@next/third-parties/google"
import { parseFiltersFromParams } from "./page"

// interface InitialData {
//   data: Opportunity[]
//   total: number
//   page: number
//   limit: number
//   totalPages: number
//   success: boolean
// }

function filtersToParams(filters: OpportunityFilters): string {
  const params = new URLSearchParams()
  if (filters.search) params.set("search", filters.search)
  if (filters.country) params.set("country", filters.country)
  if (filters.degreeLevel) params.set("degreeLevel", filters.degreeLevel)
  if (filters.opportunityType) params.set("opportunityType", filters.opportunityType)
  if (filters.fundingType) params.set("fundingType", filters.fundingType)
  if (filters.sortBy && filters.sortBy !== "createdAt") params.set("sortBy", filters.sortBy)
  if (filters.sortOrder && filters.sortOrder !== "DESC") params.set("sortOrder", filters.sortOrder)
  if (filters.page && filters.page > 1) params.set("page", String(filters.page))
  return params.toString()
}

export function OpportunitiesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [filters, setFilters] = useState<OpportunityFilters>(() =>
    parseFiltersFromParams(searchParams)
  )
  const [apiFilters, setAPIFilters] = useState<OpportunityFilters>(() =>
    parseFiltersFromParams(searchParams)
  )

  let timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    sendGTMEvent({ event: 'view', value: 'view_opportunities' })
  }, [])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setAPIFilters((prev) => ({
        ...prev,
        ...filters,
        page: filters.page ?? 1,
        limit: filters.limit ?? 12,
        sortBy: filters.sortBy ?? "createdAt",
        sortOrder: filters.sortOrder ?? "DESC" ,
      }))
    }, 600) // 600ms debounce
  }, [filters])

  const { data, isLoading } = useOpportunities(apiFilters)

  const handleFiltersChange = useCallback(
    (newFilters: OpportunityFilters) => {
      setFilters(newFilters)
      const queryString = filtersToParams(newFilters)
      router.push(queryString ? `?${queryString}` : "/opportunities", { scroll: false })
    },
    [router]
  )

  const resetFilters = useCallback(() => {
    setFilters({ page: 1, limit: 12, sortBy: "createdAt", sortOrder: "DESC" })
  }, [])

  const handlePageChange = useCallback(
    (page: number) => {
      handleFiltersChange({ ...filters, page })
    },
    [filters, handleFiltersChange]
  )

  // Use server data for first render, then switch to client data
  const opportunities = data?.data ?? []
  const totalPages = data?.totalPages ?? 0
  const currentPage = data?.page ?? filters.page ?? 1

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7" />
          <h1 className="text-3xl font-bold tracking-tight">Discover Opportunities</h1>
        </div>
        <p className="text-muted-foreground">
          Browse and filter graduate scholarships, fellowships, and funded programs worldwide.
        </p>
      </div>

      <OpportunityFiltersComponent filters={filters} onChange={handleFiltersChange} />
      <OpportunityMobileFilter
        filters={filters}
        onFilterChange={handleFiltersChange}
        onReset={resetFilters}
      />

      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <OpportunityGrid opportunities={opportunities} showSaveButton />
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}
