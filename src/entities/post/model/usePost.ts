import { postApi } from '@/entities/post'
import type { Post } from '@/shared/types'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([])
  const postsTotal = ref(0)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const socket = ref<WebSocket | null>(null)

  watch(currentPage, async (newVal) => {
    await postApi.fetchPosts(searchQuery.value, newVal)
  })
  watch(searchQuery, async () => {
    await postApi.fetchPosts(searchQuery.value)
  })

  function setPosts(val: Post[]) {
    posts.value = val
  }

  function setPostsCount(val: number) {
    postsTotal.value = val
  }

  function connectWebSocket() {
    socket.value = new WebSocket('ws://localhost:3001')
    socket.value.onmessage = async (event: MessageEvent) => {
      const msg = JSON.parse(event.data)
      if (msg.type === 'new_post' || msg.type === 'delete_post') {
        posts.value = (await postApi.fetchPosts()) ?? []
      }
    }
    socket.value.onopen = () => console.log('WebSocket подключён')
    socket.value.onclose = () => console.log('WebSocket отключён')
  }

  return {
    posts,
    postsTotal,
    searchQuery,
    currentPage,
    socket,
    setPostsCount,
    setPosts,
    connectWebSocket,
  }
})
