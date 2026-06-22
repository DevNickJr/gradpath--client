export interface CommentAuthor {
  firstName: string
  lastName: string
  profileImage?: string
}

export interface Comment {
  id: string
  userId: string
  opportunityId: string
  content: string
  parentId?: string | null
  author?: CommentAuthor
  replies?: Comment[]
  createdAt: string
  updatedAt: string
}

export interface CreateCommentRequest {
  content: string
  parentId?: string
}
