import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import type { User, UserCandidate } from '@/types'
import { ROLES } from '@/constants/roles'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  async function login(email: string, password: string) {
    const formData = new FormData()
    formData.append('email', email.trim())
    formData.append('password', password.trim())
    const response = await axios.post('http://localhost:3001/api/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (response) {
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  async function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  async function register(userCandidate: UserCandidate) {
    const formData = new FormData()
    formData.append('username', userCandidate.username.trim())
    formData.append('email', userCandidate.email.trim())
    formData.append('password', userCandidate.password.trim())
    const response = await axios.post('http://localhost:3001/api/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: {
        roleId: ROLES.USER,
      },
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
