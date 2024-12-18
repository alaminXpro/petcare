export interface Feed {
  feedId: string // Changed from id to feedId to match DB schema
  content: string
  visibility: 'Public' | 'Private'
  images: string[]
  created_at: string
  authorId: string
  author: {
    id: string
    name: string
    email: string
    image: string
  }
}
