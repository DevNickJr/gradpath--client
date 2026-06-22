"use client"

import { DocumentGenerator } from "@/components/documents/document-generator"

export default function NewDocumentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Academic Document Generator</h1>
        <p className="text-muted-foreground">
          Create tailored academic documents for your applications in seconds.
        </p>
        <span className="text-muted-foreground text-xs">Note: Complete your profile to unlock highly personalized and accurate results</span>
      </div>

      <DocumentGenerator />
    </div>
  )
}
