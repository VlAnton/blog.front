<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

onMounted(() => {
  const userFromStorage = localStorage.getItem('user')
  if (userFromStorage) {
    userStore.user = JSON.parse(userFromStorage)
  }
})
</script>

<template>
  <main>
    <nav-bar />

    <RouterView />
  </main>
</template>

<style>
.page-header {
  background-color: var(--color-lavender);
  padding: 8px 48px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  color: var(--color-text-primary);
}

.page {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
