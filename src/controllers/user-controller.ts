import { useUserStore } from '@/store/user'
import type { NextTick, User } from '@/types'

export class UserController {
  private nextTick: NextTick = () => Promise.resolve()
  user: User | null = null
  userStore = useUserStore()

  static create() {
    return new this()
  }

  async mount(nextTick: NextTick) {
    this.nextTick = nextTick
  }

  async login(email: string, password: string) {
    await this.userStore.login(email, password)
    this.user = this.userStore.user
  }

  async register(email: string, password: string, username: string) {
    await this.userStore.register({ email, password, username })
    this.user = this.userStore.user
  }

  async logout() {
    await this.userStore.logout()
    this.user = null
  }
}
