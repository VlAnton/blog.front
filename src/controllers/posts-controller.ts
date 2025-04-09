import { usePostStore } from '@/store/post'
import type { NextTick } from '@/types/controller'
import type { Post, PostCandidate, PostData } from '@/types/post'
import type { PostBlockCandidate } from '@/types/post-block'

export class PostsController {
  private nextTick: NextTick = () => Promise.resolve()
  postsStore = usePostStore()
  posts: Post[] = []
  postsTotal: number = 0
  postInCreation: Post | null = null
  currentPostData: PostData = {
    post: null,
    postBlocks: [],
  }

  static create() {
    return new this()
  }

  async mount(nextTick: NextTick) {
    this.nextTick = nextTick

    await this.postsStore.fetchPosts()
    await this.postsStore.fetchPostsTotal()
    this.postsStore.connectWebSocket()
    this.posts = this.postsStore.posts
    this.postsTotal = this.postsStore.postsTotal
  }

  unmount() {
    this.postsStore.socket?.close()
  }

  async getPostById(postId: string) {
    await this.postsStore.fetchPostById(postId)
    this.currentPostData = this.postsStore.currentPostData
  }

  async goToNextPage(currentPageNo: number) {
    await this.postsStore.fetchPosts((currentPageNo - 1) * 6)
    this.posts = this.postsStore.posts
  }

  async createPost(post: PostCandidate) {
    this.postInCreation = (await this.postsStore.createPost(post)).data || null
  }

  async addPostBlock(postBlock: PostBlockCandidate) {
    await this.postsStore.createPostBlock(postBlock, this.postInCreation?.id)
  }
}
