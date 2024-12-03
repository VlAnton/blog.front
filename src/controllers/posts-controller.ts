import { usePostStore } from '@/store/post'
import type { NextTick } from '@/types/controller'
import type { Post } from '@/types/post'

export class PostsController {
  private nextTick: NextTick = () => Promise.resolve()
  postsStore = usePostStore()
  posts: Post[] = []
  postsTotal: number = 0

  static create() {
    return new this()
  }

  async mount(nextTick: NextTick) {
    this.nextTick = nextTick

    await this.postsStore.fetchPosts()
    await this.postsStore.fetchPostsTotal()
    this.posts = this.postsStore.posts
    this.postsTotal = this.postsStore.postsTotal
  }

  async goToNextPage(currentPageNo: number) {
    await this.postsStore.fetchPosts((currentPageNo - 1) * 6)
    this.posts = this.postsStore.posts
  }
}
