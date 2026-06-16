import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Brain, Globe, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
}

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Curated Opportunities",
    description: "We aggregate scholarships, fellowships, assistantships, and funded programs from universities worldwide.",
  },
  {
    icon: Brain,
    title: "AI-Powered Documents",
    description: "Generate tailored CVs, Statements of Purpose, and Research Proposals using our AI document generation tools.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Discover opportunities across 80+ countries and 500+ universities, all in one platform.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Agents and administrators contribute opportunities, keeping our database fresh and comprehensive.",
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About GradPath</h1>
        <p className="text-lg text-muted-foreground">
          GradPath is an AI-powered platform designed to help aspiring graduate students discover
          scholarships, fellowships, and funded academic programs worldwide. We believe every
          talented student deserves access to quality graduate education, regardless of their
          financial background.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {FEATURES.map((feature) => (
          <Card key={feature.title} className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-muted-foreground">
          To democratize access to graduate education opportunities by leveraging AI technology
          to match students with the right programs and help them prepare compelling applications.
          We envision a world where geographic and financial barriers no longer prevent talented
          individuals from pursuing advanced education.
        </p>
      </div>
    </div>
  )
}
