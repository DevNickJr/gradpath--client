"use client"

import { use, useRef } from "react"
import { useDocument } from "@/hooks/use-documents"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import Markdown from "react-markdown"
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
    
  const { data: generatedDocument, isLoading } = useDocument(id)
    const contentRef = useRef<HTMLDivElement>(null);

  // 2. Set up the print hook
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: generatedDocument?.data?.title || "Document",
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

  return (
    <div className="space-y-6 max-w-3xl">
      {generatedDocument && !isLoading && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              <CardTitle>{generatedDocument?.data?.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md p-4 prose" ref={contentRef}>
                <Markdown>{generatedDocument?.data?.content}</Markdown>
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
