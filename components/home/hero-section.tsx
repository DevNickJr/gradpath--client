"use client"

import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { GraduationCap, Search, Plus } from "lucide-react"
import { motion } from "motion/react"

export function HeroSection() {
  const router = useRouter()

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
            Find Your Path to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Graduate Success
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover scholarships, fellowships, and funded graduate programs worldwide.
            Let AI help you find and apply for the opportunities that match your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => router.push(ROUTES.OPPORTUNITIES)} className="gap-2">
              <Search className="h-4 w-4" />
              Browse Opportunities
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push(ROUTES.DASHBOARD_NEW_OPPORTUNITY)} className="gap-2">
              <Plus className="h-4 w-4" />
              Post an Opportunity
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
            { label: "Opportunities", value: "2,000+" },
            { label: "Universities", value: "500+" },
            { label: "Countries", value: "80+" },
            { label: "Success Stories", value: "10,000+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
