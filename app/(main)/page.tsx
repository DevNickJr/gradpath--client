import { HeroSection } from "@/components/home/hero-section"
import { FeaturedOpportunities } from "@/components/home/featured-opportunities"
import { HowItWorks } from "@/components/home/how-it-works"
import { CtaSection } from "@/components/home/cta-section"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { statsService } from "@/services/stats.service";
import { opportunityService } from "@/services/opportunity.service";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const data = await statsService.getStats();
      console.log({
        data
      })
      return {
        data: data?.data,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  await queryClient.prefetchQuery({
    queryKey: ["opportunities", { limit: 6, sortBy: "createdAt", sortOrder: "DESC" }],
    queryFn: async () => {
      const data = await opportunityService.getOpportunities({ limit: 6, sortBy: "createdAt", sortOrder: "DESC" });
      return {
        data: data?.data,
      };
    },
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HeroSection />
      </HydrationBoundary>

      <FeaturedOpportunities />
      <HowItWorks />
      <CtaSection />
    </>
  )
}
