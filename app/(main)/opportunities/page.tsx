import { Suspense } from "react"
import { API_URL, DegreeLevel, FundingType, OpportunityType } from "@/lib/constants"
import { OpportunitiesContent } from "./opportunities-content"
import { PageLoader } from "@/components/shared/loading-spinner"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { opportunityService } from "@/services/opportunity.service"
import { OpportunityFilters } from "@/types"

export function parseFiltersFromParams(searchParams: URLSearchParams): OpportunityFilters {
  return {
    search: searchParams.get("search") || undefined,
    country: searchParams.get("country") || undefined,
    degreeLevel: (searchParams.get("degreeLevel") as DegreeLevel) || undefined,
    opportunityType: (searchParams.get("opportunityType") as OpportunityType) || undefined,
    fundingType: (searchParams.get("fundingType") as FundingType) || undefined,
    sortBy: (searchParams.get("sortBy") as "createdAt" | "deadline") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 12,
  }
}

async function fetchInitialOpportunities(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const queryClient = new QueryClient();

  const params = new URLSearchParams()

  const get = (key: string) => {
    const val = searchParams[key]
    return typeof val === "string" ? val : undefined
  }

  const filters: OpportunityFilters = parseFiltersFromParams(params)

  if (get("search")) params.set("search", get("search")!)
  if (get("country")) params.set("country", get("country")!)
  if (get("degreeLevel")) params.set("degreeLevel", get("degreeLevel")!)
  if (get("opportunityType")) params.set("opportunityType", get("opportunityType")!)
  if (get("fundingType")) params.set("fundingType", get("fundingType")!)
  if (get("sortBy")) params.set("sortBy", get("sortBy")!)
  if (get("sortOrder")) params.set("sortOrder", get("sortOrder")!)
  if (get("page")) params.set("page", get("page")!)
  params.set("limit", get("limit") || "12")
  const url = `${API_URL}/opportunities?${params.toString()}`


  try {
    await queryClient.prefetchQuery({
      queryKey: ["opportunities", filters],
      queryFn: async () => {
        const data = await opportunityService.getOpportunities(filters);
        return {
          data: data?.data,
        };
      },
    });
    return queryClient
  } catch {
    return queryClient
  }
}

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const queryClient = await fetchInitialOpportunities(params)


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PageLoader />}>
          <OpportunitiesContent />
        </Suspense>
      </HydrationBoundary>
  )
}
