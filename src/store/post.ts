import { defineStore } from 'pinia'
import type { PostCandidate } from '@/types/post'
import axios from 'axios'
import type { PostBlockCandidate } from '@/types/post-block'
import { ref } from 'vue'

export const usePostStore = defineStore('post', () => {
  const posts = ref([])
  const postsTotal = ref(0)
  const currentPostData = ref({
    post: null,
    postBlocks: [],
  })
  const socket = ref<WebSocket | null>(null)

  async function fetchPosts(offset: number = 0) {
    const response = await axios.get('http://localhost:3001/api/posts', {
      params: {
        limit: 6,
        offset,
      },
    })
    if (response) {
      posts.value = response.data
    }
  }

  function connectWebSocket() {
    socket.value = new WebSocket('ws://localhost:3001')

    socket.value.onmessage = (event: any) => {
      const msg = JSON.parse(event.data)
      if (msg.type === 'new_post') {
        posts.value.unshift(msg.payload)
      }
    }
    socket.value.onopen = () => console.log('WebSocket подключён')
    socket.value.onclose = () => console.log('WebSocket отключён')
  }

  async function fetchPostById(postId: string) {
    const response = await axios.get(`http://localhost:3001/api/posts/${postId}`)

    if (response) {
      currentPostData.value = response.data
    }
  }

  async function fetchPostsTotal() {
    const response = await axios.get('http://localhost:3001/api/posts/count')
    if (response) {
      postsTotal.value = response.data
    }
  }

  async function createPost(post: PostCandidate) {
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
  }

  async function createPostBlock(postBlock: PostBlockCandidate, postId: number | undefined) {
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
  }

  return {
    posts,
    postsTotal,
    currentPostData,
    socket,
    fetchPosts,
    connectWebSocket,
    fetchPostById,
    fetchPostsTotal,
    createPost,
    createPostBlock,
  }
})
