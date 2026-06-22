export interface InquiryAuthor {
  firstName: string
  lastName: string
  profileImage?: string
}

export interface Inquiry {
  id: string
  userId: string
  subject: string
  message: string
  status: string
  parentId?: string | null
  author?: InquiryAuthor
  replies?: Inquiry[]
  createdAt: string
  updatedAt: string
}

export interface CreateInquiryRequest {
  subject: string
  message: string
}

export interface ReplyInquiryRequest {
  message: string
}
