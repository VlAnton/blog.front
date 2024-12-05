export type PostBlock = {
  id?: number
  title: string
  content: string
  photo: string | null
  isPublished?: boolean
}

export type PostBlockCandidate = {
  title: string
  content: string
  photo: File | null
}

// export type PostBlockState = {
//   posts: PostBlock[]
//   postsTotal: number
// }
