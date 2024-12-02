import { usePostStore } from '@/store/post'
import type { Post } from '@/types/post'

export class PostsController {
  private nextTick: any = () => Promise.resolve()
  postsStore = usePostStore()
  posts: Post[] = []

  static create() {
    return new this()
  }

  async mount(nextTick: any) {
    this.nextTick = nextTick

    await this.postsStore.fetchPosts()
    this.posts = this.postsStore.posts
  }
}
