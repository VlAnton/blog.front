import { defineStore } from 'pinia'
import type { Post, PostCandidate, PostState } from '@/types/post'
import axios from 'axios'

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: [],
    postsTotal: 0,
  }),

  actions: {
    async fetchPosts(offset: number = 0) {
      const response = await axios.get('http://localhost:3001/api/posts', {
        params: {
          limit: 6,
          offset,
        },
      })
      if (response) {
        this.posts = response.data
      }
    },
    async fetchPostsTotal() {
      const response = await axios.get('http://localhost:3001/api/posts/count')
      if (response) {
        this.postsTotal = response.data
      }
    },
    async createPost(post: PostCandidate) {
      const formData = new FormData()
      formData.append('title', post.title)
      formData.append('content', post.content)
      if (post.photo) {
        formData.append('photo', post.photo as Blob)
      }
      formData.append('isPublished', 'false')
      const response = await axios.post('http://localhost:3001/api/posts/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(response)
    },
  },

  getters: {
    postsIndexed: (state) =>
      state.posts.reduce((postsIndexed: Record<number, Post>, post: Post) => {
        postsIndexed[post.id] = post
        return postsIndexed
      }, {}),
  },
})
