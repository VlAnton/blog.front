import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/shared/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  function setUser(val: User) {
    user.value = val
  }

  return {
    user,
    setUser,
  }
})
