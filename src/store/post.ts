import { defineStore } from 'pinia'
import type { PostCandidate, Post, PostBlockCandidate } from '@/types'
import axios from 'axios'
import { ref } from 'vue'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([])
  const postsTotal = ref(0)
  const searchQuery = ref('')
  const currentPostData = ref({
    post: null,
    postBlocks: [],
  })
  const socket = ref<WebSocket | null>(null)

  async function fetchPosts(offset: number = 0, searchStr: string = '') {
    searchQuery.value = searchStr
    const response = await axios.get('http://localhost:3001/api/posts', {
      params: {
        limit: 6,
        offset,
        search: searchStr.trim(),
      },
    })
    if (response) {
      posts.value = response.data
    }
  }

  function connectWebSocket() {
    socket.value = new WebSocket('ws://localhost:3001')
    // TODO: fetch posts after socket.onmessage (currentPage must be saved)
    socket.value.onmessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data)
      if (msg.type === 'new_post') {
        posts.value.unshift(msg.payload)
      } else if (msg.type === 'delete_post') {
        posts.value = posts.value.filter((post) => post.id !== msg.payload)
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
    const response = await axios.get('http://localhost:3001/api/posts/count', {
      params: {
        search: searchQuery.value.trim(),
      },
    })
    if (response) {
      postsTotal.value = response.data
    }
  }

  async function createPost(post: PostCandidate, postBlocks: PostBlockCandidate[]) {
    const formData = new FormData()
    formData.append('title', post.title)
    formData.append('content', await post.content)
    if (post.photo) {
      formData.append('photo', post.photo as Blob)
    }
    formData.append('isPublished', 'false')
    const res = await axios.post('http://localhost:3001/api/posts/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    if (res) {
      const postId = res.data.id
      postBlocks.forEach(async (postBlock) => {
        await createPostBlock(postBlock, postId)
      })
    }
    return res
  }

  async function createPostBlock(postBlock: PostBlockCandidate, postId: number | undefined) {
    const formData = new FormData()
    formData.append('title', postBlock.title)
    formData.append('content', await postBlock.content)
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

  async function deletePost(postId: number) {
    const response = await axios.delete(`http://localhost:3001/api/posts/${postId}`)
    if (response) {
      posts.value = posts.value.filter((post) => post.id !== postId)
    }
  }

  return {
    posts,
    postsTotal,
    currentPostData,
    searchQuery,
    socket,
    fetchPosts,
    connectWebSocket,
    fetchPostById,
    fetchPostsTotal,
    createPost,
    createPostBlock,
    deletePost,
  }
})
