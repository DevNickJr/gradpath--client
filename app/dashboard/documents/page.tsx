"use client"

import { useState } from "react"
import { useDocuments, useDeleteDocument } from "@/hooks/use-documents"
import {
  ROUTES,
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_STATUS_LABELS,
  DocumentStatus,
} from "@/lib/constants"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Trash2, FileText, Plus } from "lucide-react"
import { PageLoader } from "@/components/shared/loading-spinner"
import { EmptyState } from "@/components/shared/empty-state"
import { Pagination } from "@/components/shared/pagination"
import type { Document } from "@/types/document"

function getStatusColor(status: DocumentStatus) {
  switch (status) {
    case DocumentStatus.COMPLETED:
      return "bg-green-100 text-green-800"
    case DocumentStatus.GENERATING:
    case DocumentStatus.PENDING:
      return "bg-yellow-100 text-yellow-800"
    case DocumentStatus.FAILED:
      return "bg-red-100 text-red-800"
    default:
      return ""
  }
}

export default function DocumentsPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useDocuments(page, 12)
  const { mutate: deleteDocument, isPending: isDeleting } = useDeleteDocument()

  if (isLoading) {
    return <PageLoader />
  }

  const documents = data?.data ?? []
  const totalPages = data?.totalPages ?? 1

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      deleteDocument(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Your AI-generated academic documents.
          </p>
        </div>
        <Link
          href={ROUTES.DASHBOARD_NEW_DOCUMENT}
          className={buttonVariants({ variant: "default" })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Generate Document
        </Link>
      </div>

      {documents.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents yet"
          description="Generate your first AI-powered document to get started with your applications."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc: Document) => (
               <Link
                key={doc.id}
                href={ROUTES.DASHBOARD_DOCUMENT(doc.id)}
              >
                <Card >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="line-clamp-1">{doc.title}</CardTitle>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDelete(doc.id)
                        }}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary">
                        {DOCUMENT_TYPE_LABELS[doc.type]}
                      </Badge>
                      <Badge className={getStatusColor(doc.status)}>
                        {DOCUMENT_STATUS_LABELS[doc.status]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created: {formatDate(doc.createdAt)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
