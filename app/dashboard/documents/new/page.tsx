"use client"

import { DocumentGenerator } from "@/components/documents/document-generator"

export default function NewDocumentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Generate AI Document</h1>
        <p className="text-muted-foreground">
          Use AI to generate tailored academic documents for your applications.
        </p>
      </div>

      <DocumentGenerator />
    </div>
  )
}
