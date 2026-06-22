"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Reply, Trash2 } from "lucide-react"
import { formatRelativeTime, getInitials } from "@/lib/utils"
import type { Comment } from "@/types/comment"

interface CommentCardProps {
  comment: Comment
  currentUserId?: string
  onReply: (id: string) => void
  onDelete: (id: string) => void
  isReply?: boolean
}

export function CommentCard({ comment, currentUserId, onReply, onDelete, isReply }: CommentCardProps) {
  const isOwner = currentUserId === comment.userId

  return (
    <div className={isReply ? "ml-8 border-l-2 pl-4" : ""}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={comment.author?.profileImage} />
          <AvatarFallback className="text-xs">
            {getInitials(comment.author?.firstName, comment.author?.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {comment.author?.firstName} {comment.author?.lastName}
            </span>
            <span className="text-xs text-muted-foreground">{formatRelativeTime(comment.createdAt)}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-2">
            {currentUserId && (
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onReply(comment.id)}>
                <Reply className="h-3 w-3 mr-1" />Reply
              </Button>
            )}
            {isOwner && (
              <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={() => onDelete(comment.id)}>
                <Trash2 className="h-3 w-3 mr-1" />Delete
              </Button>
            )}
          </div>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} currentUserId={currentUserId} onReply={onReply} onDelete={onDelete} isReply />
          ))}
        </div>
      )}
    </div>
  )
}
