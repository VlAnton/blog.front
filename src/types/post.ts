export type Post = {
  id: number
  title: string
  content: string
  photo: string | null
}

export type PostCandidate = {
  title: string
  content: string
  photo: File | null
}

export type PostState = {
  posts: Post[]
  postsTotal: number
}
