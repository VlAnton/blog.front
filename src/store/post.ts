import { defineStore } from 'pinia'
import type { Post, PostState } from '@/types/post'
import axios from 'axios'

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: [],
    postsTotal: 0,
  }),

  actions: {
    async fetchPosts(offset: number = 0) {
      console.log(offset)
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
  },

  getters: {
    postsIndexed: (state) =>
      state.posts.reduce((postsIndexed: Record<number, Post>, post: Post) => {
        postsIndexed[post.id] = post
        return postsIndexed
      }, {}),
  },
})
