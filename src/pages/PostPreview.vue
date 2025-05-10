<script setup lang="ts">
import { reactive, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PostsController } from '@/controllers/posts-controller'
import type { PostData } from '@/types'
import { BACKEND_URL } from '@/constants/env'

const controller = reactive(PostsController.create())
const route = useRoute()
const postData = ref<PostData>({
  post: null,
  postBlocks: [],
})

onMounted(async () => {
  await controller.mount(nextTick)
  if (route && typeof route.params.id === 'string') {
    await controller.getPostById(route.params.id)
    postData.value = controller.currentPostData
  }
})
</script>

<template>
  <div class="page">
    <div :class="$style['page-body-wrapper']">
      <div :class="$style['page-body']">
        <section :class="$style['page-section']">
          <img
            v-if="postData.post?.photo"
            :class="$style.photo"
            :src="`${BACKEND_URL}/static/${postData.post?.photo}`"
            alt="card photo"
          />
          <h1 class="h1-wide">{{ postData.post?.title }}</h1>
          <p class="p1-regular" v-html="postData.post?.content"></p>
        </section>
        <section
          v-for="postBlock in postData.postBlocks"
          :key="postBlock.id"
          :class="$style['page-section']"
        >
          <img
            v-if="postBlock.photo"
            :class="$style.photo"
            :src="`${BACKEND_URL}/static/${postBlock?.photo}`"
            alt="card photo"
          />
          <h1 class="h1-wide">{{ postBlock?.title }}</h1>
          <p class="p1-regular" v-html="postBlock.content"></p>
        </section>
      </div>
    </div>
  </div>
</template>

<style module>
.page-body-wrapper {
  padding: 40px 48px;
  margin-bottom: 48px;
}

.page-body {
  display: flex;
  flex-direction: column;
  gap: 60px;
  background-color: var(--color-lavender-shallow);
  padding: 24px;
  border-radius: 24px;
}

.page-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.photo {
  width: 50%;
  object-fit: cover;
  border-radius: 24px;
}
</style>
