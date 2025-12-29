import type { UserCandidate } from '@/shared/types'
import axios from 'axios'

export const usersApi = {
  async login(email: string, password: string) {
    const response = await axios.post('http://localhost:3001/api/login', {
      email,
      password,
    })

    if (response.status === 200) {
      const { user } = response.data
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
  },

  async logout() {
    localStorage.removeItem('user')
  },

  async register(userCandidate: UserCandidate) {
    const response = await axios.post('http://localhost:3001/api/register', {
      userCandidate,
    })
    if (response.status === 200) {
      const { user } = response.data
      localStorage.setItem('user', JSON.stringify(user.value))
      return user
    }
  },
}
