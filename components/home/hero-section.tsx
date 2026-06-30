"use client"

import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/constants"
import { useStats } from "@/hooks/use-stats"
import { Button } from "@/components/ui/button"
import { GraduationCap, Search, Plus } from "lucide-react"
import { motion } from "motion/react"

export function HeroSection() {
  const router = useRouter()
  const { data: statsResponse } = useStats()
  const statsData = statsResponse?.data

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <GraduationCap className="h-4 w-4" />
            AI-Powered Scholarship Discovery
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Unlock Fully Funded Graduate{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Opportunities Worldwide
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover scholarships, fellowships, and funded graduate programs worldwide.
            Find perfect-match opportunities and generate professional application documents in minutes with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => router.push(ROUTES.OPPORTUNITIES)} className="gap-2">
              <Search className="h-4 w-4" />
              Explore Opportunities
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push(ROUTES.DASHBOARD_NEW_DOCUMENT)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Application Docs with AI
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {[
            { label: "Opportunities", value: statsData ? `${statsData.opportunities.toLocaleString()}+` : "..." },
            { label: "Universities", value: statsData ? `${statsData.universities.toLocaleString()}+` : "..." },
            { label: "Countries", value: statsData ? `${statsData.countries.toLocaleString()}+` : "..." },
            { label: "Success Stories", value: "10+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 md:z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-1/9 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/9 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
