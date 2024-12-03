<script setup lang="ts">
import MainPageCard from '@/components/MainPageCard/MainPageCard.vue'
import { PostsController } from '@/controllers/posts-controller'
import { nextTick, onMounted, reactive } from 'vue'
const controller = reactive(PostsController.create())

onMounted(() => {
  controller.mount(nextTick)
})
// onBeforeUnmount(() => {
//   controller.unmount()
// })
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="h1-wide">Главная</h1>
      <p class="p1-regular">
        Здесь располагаются мои посты, вы можете их читать или не читать, как хотите
      </p>
    </div>

    <div :class="$style['page-body']">
      <main-page-card
        v-for="post in controller.posts"
        :key="post.id"
        :title="post.title"
        :content="post.content"
        :photo="post.photo"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.card-wrapper) {
  flex-basis: calc(33% - 19px);
  flex-shrink: 0;
}
</style>

<style module>
.page-body {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 40px 48px 168px;
}
</style>
