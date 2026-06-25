"use client"

import { useEffect, useState } from "react"
import { useGenerateDocument } from "@/hooks/use-documents"
import { DocumentType, DOCUMENT_TYPE_LABELS, ROUTES } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, FileText, Sparkles } from "lucide-react"
import type { GenerateDocumentRequest } from "@/types/document"
import type { Document } from "@/types/document"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Markdown from "react-markdown"
import { useRef } from "react"
import { useDocument } from "@/hooks/use-documents"
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner"

const PROMPT_PLACEHOLDERS: Record<DocumentType, string> = {
  [DocumentType.CV]:
    "Describe your academic background, research experience, and key achievements to generate a professional academic CV...",
  [DocumentType.SOP]:
    "Describe your motivation, academic goals, and why you are a strong candidate for this program...",
  [DocumentType.RESEARCH_PROPOSAL]:
    "Describe your research topic, methodology, expected outcomes, and significance of the research...",
  [DocumentType.COLD_EMAIL]:
    "Describe the supervisor you want to contact, their research area, and why you are interested in their work...",
  [DocumentType.FEE_WAIVER]:
    "Describe your financial situation and academic achievements that justify a fee waiver request...",
  [DocumentType.PERSONAL_STATEMENT]:
    "Share your personal story, motivations, challenges overcome, and what drives your academic journey...",
}

export function DocumentGenerator() {
  const searchParams = useSearchParams()
  const [type, setType] = useState<DocumentType | null>(null)
  const [prompt, setPrompt] = useState("")
  const [opportunityId, setOpportunityId] = useState(searchParams.get('opportunityId') || '')
  const [generatedDocument, setGeneratedDocument] = useState<Document | null>(null)
  
  const { mutate: generateDocument, isPending } = useGenerateDocument()
       
  const contentRef = useRef<HTMLDivElement>(null);
  
  // 2. Set up the print hook
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: generatedDocument?.title || "Document",
    onAfterPrint: () => {
      toast.success("Document printed successfully!");
    },
    onBeforePrint: async () => {
      toast.success("Preparing document for printing...");
    },
    onPrintError: async (error) => {
      toast.error("Failed to print document.");
    },
    pageStyle: `
      @page { 
        size: auto; 
        margin: 0mm; /* Forces browser headers and footers to disappear */
      } 
      @media print { 
        body { 
          padding: 20mm; /* Re-establishes your printable document margins safely */
        } 
    }
    `,
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!type) return

    const data: GenerateDocumentRequest = {
      type,
      prompt,
      opportunityId: opportunityId || undefined,
    }

    generateDocument(data, {
      onSuccess: (response) => {
        if (response.data) {
          setGeneratedDocument(response.data)
        }
      },
    })
  }

  const isValid = type && (opportunityId || prompt.length >= 10 && prompt.length <= 5000);

  return (
    <div className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Document Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select
                value={type}
                onValueChange={(val) => {
                  if (val) setType(val as DocumentType)
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(DocumentType).map((docType) => (
                    <SelectItem key={docType} value={docType}>
                      {DOCUMENT_TYPE_LABELS[docType]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="opportunityId">
                Opportunity{" "}
                {/* <span className="text-muted-foreground font-normal">(optional)</span> */}
              </Label>
              <Input
                id="opportunityId"
                placeholder="No opportunity Selected"
                value={opportunityId}
                onChange={(e) => setOpportunityId(e.target.value)}
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Select an opportunity to tailor the document to its requirements, eligibility criteria, and objectives. {" "}
                <Link href={ROUTES.OPPORTUNITIES} className="text-primary text-xs underline">
                  Browse Opportunities
                </Link>
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt">
                Prompt
                <span className="text-muted-foreground font-normal">
                [{prompt.length}/5000]
                </span>
                <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Textarea
                id="prompt"
                placeholder={
                  type
                    ? PROMPT_PLACEHOLDERS[type]
                    : "Select a document type first..."
                }
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                minLength={10}
                maxLength={5000}
              />
              {prompt.length > 0 && prompt.length < 10 && (
                <p className="text-xs text-destructive">
                  Prompt must be at least 10 characters.
                </p>
              )}
            </div>
            <Button type="submit" disabled={!isValid || isPending} className="w-full">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating your document...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Document
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPending && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="text-center">
              <p className="font-semibold">Generating your document...</p>
              <p className="text-sm text-muted-foreground">
                This may take a moment. Our AI is crafting your personalized document.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {generatedDocument && !isPending && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              <CardTitle>{generatedDocument.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md p-4 prose" ref={contentRef}>
              <Markdown>
                  {generatedDocument.content}
              </Markdown>
            </div>
            <Button 
              onClick={() => handlePrint()} 
              className="px-4 py-2 mt-4"
            >
              Print Document
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
