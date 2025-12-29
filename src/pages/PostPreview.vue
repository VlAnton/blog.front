<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Post } from '@/shared/types'
import { postApi } from '@/entities/post'

const props = defineProps<{
  postId: string
}>()

const post = ref<Post | null>(null)

onMounted(async () => {
  post.value = (await postApi.fetchPostById(props.postId)).post ?? null
})
</script>

<template>
  <div class="page">
    <div :class="$style['page-body-wrapper']">
      <div :class="$style['page-body']">
        <section :class="$style['page-section']">
          <h1 class="h1-wide">{{ post?.title }}</h1>
          <div class="p1-regular" v-html="post?.contentHtml" />
        </section>
      </div>
    </div>
  </div>
</template>

<style module>
.page-body-wrapper {
  padding: 40px 40px 0;
}

.page-body {
  display: flex;
  flex-direction: column;
  gap: 60px;
  background-color: var(--color-lavender-shallow);
  padding: 24px;
  border-radius: 24px 24px 0 0;
  min-height: calc(100vh - 88px - 40px);
}

.page-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: start;
}
</style>
