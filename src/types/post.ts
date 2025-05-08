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
  content: string | Promise<string>
  photo: File | null
}

export type PostData = {
  post: Post | null
  postBlocks: PostBlock[]
}

export type PostState = {
  posts: Post[]
  postsTotal: number
  currentPostData: PostData
}
