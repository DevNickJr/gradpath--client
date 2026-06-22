"use client"

import { useState } from "react"
import { useComments, useCreateComment, useDeleteComment } from "@/hooks/use-comments"
import { useAuth } from "@/hooks/use-auth"
import { CommentCard } from "./comment-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, MessageSquare } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface CommentSectionProps {
  opportunityId: string
}

export function CommentSection({ opportunityId }: CommentSectionProps) {
  const { isAuthenticated, user } = useAuth()
  const [content, setContent] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)

  const { data, isLoading } = useComments(opportunityId)
  const { mutate: createComment, isPending } = useCreateComment(opportunityId)
  const { mutate: deleteComment } = useDeleteComment(opportunityId)

  const comments = data?.data || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    createComment(
      { content, parentId: replyTo || undefined },
      { onSuccess: () => { setContent(""); setReplyTo(null) } }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Comments</h2>
        {data?.total !== undefined && <span className="text-muted-foreground text-sm">({data.total})</span>}
      </div>

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="space-y-3">
          {replyTo && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Replying to a comment</span>
              <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>Cancel</Button>
            </div>
          )}
          <Textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            maxLength={2000}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending || !content.trim()} size="sm">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Comment
            </Button>
          </div>
        </form>
      )}

      <Separator />

      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserId={user?.id}
              onReply={(id) => setReplyTo(id)}
              onDelete={(id) => deleteComment(id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
