import { defineStore } from 'pinia'
import type { User, UserCandidate } from '@/types'
import axios from 'axios'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  async function login(email: string, password: string) {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    const response = await axios.post('http://localhost:3001/api/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (response) {
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  async function logout() {
    user.value = null
  }

  async function register(userCandidate: UserCandidate) {
    const formData = new FormData()
    formData.append('username', userCandidate.username)
    formData.append('email', userCandidate.email)
    formData.append('password', userCandidate.password)
    const response = await axios.post('http://localhost:3001/api/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    if (response) {
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  return {
    user,
    login,
    logout,
    register,
  }
})
