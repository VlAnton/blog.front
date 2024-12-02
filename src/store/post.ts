import { defineStore } from 'pinia'
import type { Post, PostState } from '@/types/post'
import axios from 'axios'

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: [],
  }),

  actions: {
    async fetchPosts() {
      const response = await axios.get('http://localhost:3001/api/posts')
      if (response) {
        this.posts = response.data
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
