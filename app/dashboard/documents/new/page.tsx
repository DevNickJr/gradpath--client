"use client"

import { DocumentGenerator } from "@/components/documents/document-generator"
import { ROUTES } from "@/lib/constants"
import Link from "next/link"


export default function NewDocumentPage() {
 
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Academic Document Generator</h1>
        <p className="text-muted-foreground">
          Create tailored academic documents for your applications in seconds.
        </p>
        <span className="text-muted-foreground text-xs">
          Note: {" "}
             <Link
              href={ROUTES.DASHBOARD_PROFILE}
              className={"underline text-primary underline-offset-2"}
            >
              Complete your profile
            </Link>
           {" "} to unlock highly personalized and accurate results</span>
      </div>

      <DocumentGenerator />
    </div>
  )
}
