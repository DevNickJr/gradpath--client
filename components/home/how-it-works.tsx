import { Search, ClipboardList, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const STEPS = [
  {
    icon: Search,
    title: "Discover",
    description: "Search scholarships, fellowships, and funded programs by country, degree level, and field of study.",
  },
  {
    icon: ClipboardList,
    title: "Apply",
    description: "Track your applications, generate AI-powered documents, and stay on top of deadlines.",
  },
  {
    icon: Trophy,
    title: "Succeed",
    description: "Get accepted into your dream graduate program with the right preparation and support.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground">Your journey to graduate success starts here</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {STEPS.map((step, index) => (
            <Card key={step.title} className="text-center border-none bg-background shadow-sm">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-2">
                  STEP {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
