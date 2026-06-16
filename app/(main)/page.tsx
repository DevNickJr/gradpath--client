import { HeroSection } from "@/components/home/hero-section"
import { FeaturedOpportunities } from "@/components/home/featured-opportunities"
import { HowItWorks } from "@/components/home/how-it-works"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedOpportunities />
      <HowItWorks />
      <CtaSection />
    </>
  )
}
