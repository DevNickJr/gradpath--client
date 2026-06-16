"use client"

import { useState } from "react"
import {
  useApplications,
  useUpdateApplication,
  useDeleteApplication,
} from "@/hooks/use-applications"
import {
  ApplicationStatus,
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
  ROUTES,
} from "@/lib/constants"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { Trash2, ClipboardList, Calendar, StickyNote, Check } from "lucide-react"
import { PageLoader } from "@/components/shared/loading-spinner"
import { EmptyState } from "@/components/shared/empty-state"

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  ...Object.values(ApplicationStatus).map((status) => ({
    value: status,
    label: APPLICATION_STATUS_LABELS[status],
  })),
]

export default function ApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null)
  const [editNotesValue, setEditNotesValue] = useState("")

  const filterValue = statusFilter === "all" ? undefined : statusFilter
  const { data, isLoading } = useApplications(filterValue)
  const { mutate: deleteApplication, isPending: isDeleting } = useDeleteApplication()

  if (isLoading) {
    return <PageLoader />
  }

  const applications = data?.data ?? []

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this application?")) {
      deleteApplication(id)
    }
  }

  const handleStartEditNotes = (id: string, currentNotes: string) => {
    setEditingNotesId(id)
    setEditNotesValue(currentNotes)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-muted-foreground">
          Track and manage your scholarship applications.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={statusFilter}
          onValueChange={(val) => {
            if (val) setStatusFilter(val)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTERS.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No applications found"
          description={
            statusFilter === "all"
              ? "You haven't started tracking any applications yet. Browse opportunities to get started."
              : `No applications with status "${APPLICATION_STATUS_LABELS[statusFilter as ApplicationStatus]}".`
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              isDeleting={isDeleting}
              onDelete={handleDelete}
              editingNotesId={editingNotesId}
              editNotesValue={editNotesValue}
              onEditNotesValueChange={setEditNotesValue}
              onStartEditNotes={handleStartEditNotes}
              onCancelEditNotes={() => setEditingNotesId(null)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ApplicationCard({
  application,
  isDeleting,
  onDelete,
  editingNotesId,
  editNotesValue,
  onEditNotesValueChange,
  onStartEditNotes,
  onCancelEditNotes,
}: {
  application: import("@/types/application").Application
  isDeleting: boolean
  onDelete: (id: string) => void
  editingNotesId: string | null
  editNotesValue: string
  onEditNotesValueChange: (val: string) => void
  onStartEditNotes: (id: string, notes: string) => void
  onCancelEditNotes: () => void
}) {
  const { mutate: updateApplication, isPending: isUpdating } = useUpdateApplication(
    application.id
  )

  const handleStatusChange = (newStatus: string) => {
    if (newStatus) {
      updateApplication({ status: newStatus as ApplicationStatus })
    }
  }

  const handleSaveNotes = () => {
    updateApplication(
      { notes: editNotesValue },
      {
        onSuccess: () => {
          onCancelEditNotes()
        },
      }
    )
  }

  const isEditingNotes = editingNotesId === application.id
  const title = application.opportunity?.title ?? `Application ${application.opportunityId.slice(0, 8)}...`

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {application.opportunity ? (
              <Link
                href={ROUTES.OPPORTUNITY_DETAIL(application.opportunityId)}
                className="font-semibold hover:underline line-clamp-1"
              >
                {title}
              </Link>
            ) : (
              <CardTitle className="line-clamp-1">{title}</CardTitle>
            )}
          </div>
          <Badge
            className={
              APPLICATION_STATUS_COLORS[application.status]
            }
          >
            {APPLICATION_STATUS_LABELS[application.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {application.deadlineAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>Deadline: {formatDate(application.deadlineAt)}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>Added: {formatDate(application.createdAt)}</span>
          </div>
        </div>

        {isEditingNotes ? (
          <div className="space-y-2">
            <Input
              value={editNotesValue}
              onChange={(e) => onEditNotesValueChange(e.target.value)}
              placeholder="Add notes..."
            />
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleSaveNotes}
                disabled={isUpdating}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onCancelEditNotes}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          application.notes && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              <StickyNote className="inline h-3.5 w-3.5 mr-1" />
              {application.notes}
            </p>
          )
        )}

        <div className="flex items-center justify-between gap-2 pt-2 border-t">
          <div className="flex items-center gap-2">
            <Select
              value={application.status}
              onValueChange={(val) => {
                if (val) handleStatusChange(val)
              }}
            >
              <SelectTrigger className="w-[140px]" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ApplicationStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {APPLICATION_STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onStartEditNotes(application.id, application.notes ?? "")
              }
            >
              <StickyNote className="h-3.5 w-3.5 mr-1" />
              Notes
            </Button>
          </div>
          <Button
            variant="destructive"
            size="icon-sm"
            onClick={() => onDelete(application.id)}
            disabled={isDeleting}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
