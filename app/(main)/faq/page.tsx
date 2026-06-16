import type { Metadata } from "next"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ",
}

const FAQS = [
  {
    question: "What is GradPath?",
    answer: "GradPath is an AI-powered platform that helps students discover graduate scholarships, fellowships, assistantships, and funded programs worldwide. We also offer AI document generation tools to help you prepare your applications.",
  },
  {
    question: "Is GradPath free to use?",
    answer: "Yes! Browsing opportunities, saving them, and tracking your applications is completely free. Our AI document generation features are also available to all registered users.",
  },
  {
    question: "How does the AI document generation work?",
    answer: "Our AI uses your profile information and a prompt you provide to generate tailored academic documents like CVs, Statements of Purpose, and Research Proposals. You can optionally link a specific opportunity to further customize the output.",
  },
  {
    question: "What types of opportunities are listed?",
    answer: "We list scholarships, fellowships, assistantships, funded programs, and grants across all degree levels including Bachelor's, Master's, PhD, and PostDoc positions.",
  },
  {
    question: "How do I track my applications?",
    answer: "Once you find an opportunity you're interested in, you can add it to your application tracker. Track your progress through six stages: Interested, Applying, Submitted, Accepted, Rejected, or Withdrawn.",
  },
  {
    question: "Can I post opportunities on GradPath?",
    answer: "Yes! If you're a university representative, scholarship provider, or agent, you can register as an Agent to post and manage opportunities on the platform.",
  },
  {
    question: "How do I save opportunities for later?",
    answer: "Simply click the heart icon on any opportunity card or detail page to save it. Access all your saved opportunities from your dashboard.",
  },
  {
    question: "What funding types are available?",
    answer: "Opportunities are categorized as Fully Funded (covers tuition and living expenses), Partially Funded (covers some costs), or Self Funded (requires personal funding).",
  },
]

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about GradPath
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion>
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
