export type Post = {
  id?: number
  title: string
  contentText: string
  contentMd: string
  contentHtml: string
  photo: string | null
  isPublished?: boolean
}

export type PostCandidate = {
  title: string
  contentText: string
}

export type PostState = {
  posts: Post[]
  postsTotal: number
}
