<script setup lang="ts">
import MainPageCard from '@/components/MainPageCard.vue'
import { QPagination } from 'quasar'
import { PostsController } from '@/controllers/posts-controller'
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'

const controller = reactive(PostsController.create())
const page = ref(1)

onMounted(() => {
  controller.mount(nextTick)
})

watch(page, () => {
  nextTick(() => {
    controller.goToNextPage(page.value)
  })
})

onUnmounted(() => {
  controller.unmount()
})
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="h1-wide">Главная</h1>
      <p class="p1-regular">
        Здесь располагаются мои посты, вы можете их читать или не читать, как хотите
      </p>
      <CustomButton size="lg" icon="add" to="/create">Создать пост</CustomButton>
    </div>

    <div :class="$style['page-body']">
      <main-page-card v-for="post in controller.posts" :key="post.id" :post="post" />
    </div>

    <div :class="$style['pagination-wrapper']">
      <q-pagination
        v-model="page"
        active-color="white"
        active-text-color="white"
        text-color="black"
        color="black"
        size="20px"
        :max="Math.ceil(controller.postsTotal / 6)"
        gutter="16px"
        :ripple="false"
        boundary-numbers
        direction-links
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.card-wrapper) {
  flex-basis: calc(33% - 19px);
  flex-shrink: 0;
}

:deep(.q-pagination) {
  padding: 24px;
  background-color: var(--color-lavender);
  border-radius: 100px;
  box-shadow: var(--shadow-medium);
  place-content: center;
}

:deep(.disabled) {
  visibility: hidden !important;
}

:deep(.q-pagination__middle .q-btn) {
  border-radius: 100px;
  background-color: #fff;
  font:
    500 20px/35px ALS Gorizont,
    sans-serif;
}

:deep(.bg-white) {
  background-color: var(--color-lavender-accent) !important;
}

:deep(.q-focus-helper) {
  opacity: 0 !important;
  background-color: transparent !important;
}
</style>

<style module>
.page-body {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 40px 48px;
}

.pagination-wrapper {
  position: sticky;
  bottom: 40px;
  padding: 0 48px;
}
</style>
