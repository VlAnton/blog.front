import { defineStore } from 'pinia'
import type { Post, PostCandidate, PostState } from '@/types/post'
import axios from 'axios'
import type { PostBlockCandidate } from '@/types/post-block'

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: [],
    postsTotal: 0,
    currentPostData: {
      post: null,
      postBlocks: [],
    },
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
    async fetchPostById(postId: string) {
      const response = await axios.get(`http://localhost:3001/api/posts/${postId}`)

      if (response) {
        this.currentPostData = response.data
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
      return await axios.post('http://localhost:3001/api/posts/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
    async createPostBlock(postBlock: PostBlockCandidate, postId: number | undefined) {
      const formData = new FormData()
      formData.append('title', postBlock.title)
      formData.append('content', postBlock.content)
      if (postBlock.photo) {
        formData.append('photo', postBlock.photo as Blob)
      }
      if (postId) {
        formData.append('postId', postId.toString())
      }
      return await axios.post('http://localhost:3001/api/post-blocks/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
  },

  getters: {
    postsIndexed: (state) =>
      state.posts.reduce((postsIndexed: Record<number, Post>, post: Post) => {
        if (post.id) {
          postsIndexed[post.id] = post
        }
        return postsIndexed
      }, {}),
    postsPublished: (state) => state.posts.filter((post: Post) => post.isPublished),
  },
})
