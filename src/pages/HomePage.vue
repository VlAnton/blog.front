<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import MainPageCard from '@/components/MainPageCard.vue'
import { QPagination } from 'quasar'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'
import { UserController } from '@/controllers/user-controller'
import { usePostStore } from '@/store/post'

const postsStore = usePostStore()

const usersController = reactive(UserController.create())
const page = ref(1)

const isLoggedIn = ref(false)
watch(
  () => usersController.user,
  (newVal) => {
    isLoggedIn.value = !!newVal
  },
)

onMounted(async () => {
  await postsStore.fetchPosts()
  await postsStore.fetchPostsTotal()
  postsStore.connectWebSocket()
  usersController.mount(nextTick)

  isLoggedIn.value = !!usersController.user || !!localStorage.getItem('user')
})

watch(page, () => {
  nextTick(async () => {
    await postsStore.fetchPosts((page.value - 1) * 6, postsStore.searchQuery)
  })
})

watch(
  () => postsStore.searchQuery,
  () => {
    postsStore.fetchPostsTotal()
  },
)

onUnmounted(() => {
  postsStore.socket?.close()
})
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="h1-wide">Главная</h1>
      <p class="p1-regular">
        Здесь располагаются мои посты, вы можете их читать или не читать, как хотите
      </p>
      <CustomButton v-show="isLoggedIn" size="lg" icon="add" to="/create">
        Создать пост
      </CustomButton>
    </div>

    <div v-if="postsStore.postsTotal > 0" :class="$style['page-body']">
      <main-page-card v-for="post in postsStore.posts" :key="post.id" :post="post" />
    </div>
    <div v-if="postsStore.postsTotal === 0" :class="$style['page-body--empty']">
      <h3 class="h3-wide">Постов нет</h3>
      <p class="p3-regular">
        Постов нет, но вы можете создать свой собственный пост, нажав на кнопку "Создать пост"
      </p>
    </div>

    <div v-if="postsStore.postsTotal > 0" :class="$style['pagination-wrapper']">
      <q-pagination
        v-model="page"
        active-color="white"
        active-text-color="white"
        text-color="black"
        color="black"
        size="20px"
        :max="Math.ceil(postsStore.postsTotal / 6)"
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
.page-body,
.page-body--empty {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 40px 48px;
}

.page-body--empty {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-text-primary);
}

.pagination-wrapper {
  position: sticky;
  bottom: 40px;
  padding: 0 48px;
}
</style>
