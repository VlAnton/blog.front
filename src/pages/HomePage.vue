<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import MainPageCard from '@/components/MainPageCard.vue'
import { QPagination } from 'quasar'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'
import { usePostStore } from '@/store/post'
import { useUserStore } from '@/store/user'
import { ROLES } from '@/constants/roles'

const postsStore = usePostStore()
const userStore = useUserStore()

const isUserAdmin = ref(false)

onMounted(async () => {
  await postsStore.fetchPosts()
  await postsStore.fetchPostsTotal()
  postsStore.connectWebSocket()

  isUserAdmin.value = userStore.user?.roleId === ROLES.ADMIN
})

watch(
  () => userStore.user,
  () => {
    isUserAdmin.value = userStore.user?.roleId === ROLES.ADMIN
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
      <CustomButton v-show="isUserAdmin" size="lg" icon="add" to="/create">
        Создать пост
      </CustomButton>
    </div>

    <div v-if="postsStore.postsTotal > 0" :class="$style['page-body']">
      <main-page-card
        v-for="post in postsStore.posts"
        :key="post.id"
        :post="post"
        :is-user-admin="isUserAdmin"
        @delete="postsStore.deletePost(post.id)"
      />
    </div>
    <div v-if="postsStore.postsTotal === 0" :class="$style['page-body--empty']">
      <h3 class="h3-wide">Постов нет</h3>
      <p class="p3-regular">
        Постов нет, но вы можете создать свой собственный пост, нажав на кнопку "Создать пост"
      </p>
    </div>

    <div v-if="postsStore.postsTotal > 0" :class="$style['pagination-wrapper']">
      <q-pagination
        v-model="postsStore.currentPage"
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
  flex: 1 0 calc(33.333% - 32px);
  max-width: calc(33.333% - 32px);
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

@media screen and (min-width: 2000px) {
  :deep(.card-wrapper) {
    flex: 1 0 calc(25% - 32px);
    max-width: calc(25% - 32px);
  }
}
@media screen and (max-width: 1200px) {
  :deep(.card-wrapper) {
    flex: 1 0 calc(50% - 32px);
    max-width: calc(50% - 32px);
  }
}
@media screen and (max-width: 486px) {
  :deep(.card-wrapper) {
    flex: 1 0 100%;
    max-width: 100%;
  }
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
