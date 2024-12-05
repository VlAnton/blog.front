import type { PostBlock } from './post-block'

export type Post = {
  id?: number
  title: string
  content: string
  photo: string | null
  isPublished?: boolean
}

export type PostCandidate = {
  title: string
  content: string
  photo: File | null
}

export type PostData = Record<string, Post | PostBlock[] | null>

export type PostState = {
  posts: Post[]
  postsTotal: number
  currentPostData: PostData
}
