"use client"

import { use } from "react"
import { useDocument } from "@/hooks/use-documents"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
    
  const { data: generatedDocument, isLoading } = useDocument(id)
  
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
            <div className="rounded-md bg-muted/50 p-4">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                {generatedDocument?.data?.content}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
