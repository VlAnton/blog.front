import axios from 'axios'
import type { PostCandidate } from '@/shared/types'

export const postApi = {
  async fetchPosts(searchStr = '', currentPage = 1) {
    const response = await axios.get('http://localhost:3001/api/posts', {
      params: {
        limit: 6,
        offset: (currentPage - 1) * 6,
        search: searchStr.trim(),
      },
    })
    if (response.status === 200) {
      return response.data
    }
  },

  async fetchPostById(postId: string) {
    const response = await axios.get(`http://localhost:3001/api/posts/${postId}`)

    if (response.status === 200) {
      return response.data
    }
  },

  async fetchPostsTotal(search = '') {
    const response = await axios.get('http://localhost:3001/api/posts/count', {
      params: {
        search: search.trim(),
      },
    })
    if (response.status === 200) {
      return response.data
    }
  },

  async createPost(post: PostCandidate) {
    const response = await axios.post('http://localhost:3001/api/posts/', {
      ...post,
    })
    if (response.status === 200) {
      return response.data
    }
  },

  async deletePost(postId: number) {
    const response = await axios.delete(`http://localhost:3001/api/posts/${postId}`)
    if (response.status === 204) {
      return true
    }
    return false
  },
}
