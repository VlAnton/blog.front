export type Post = {
  id: number
  title: string
  content: string
  photo: string | null
}

export type PostState = {
  posts: Post[]
}
