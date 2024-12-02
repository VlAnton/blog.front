import { usePostStore } from '@/store/post'
import type { NextTick } from '@/types/controller'
import type { Post } from '@/types/post'

export class PostsController {
  private nextTick: NextTick = () => Promise.resolve()
  postsStore = usePostStore()
  posts: Post[] = []

  static create() {
    return new this()
  }

  async mount(nextTick: NextTick) {
    this.nextTick = nextTick

    await this.postsStore.fetchPosts()
    this.posts = this.postsStore.posts
  }
}
