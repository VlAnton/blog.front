<script setup lang="ts">
import NavBarItem from '@/components/NavBar/NavBarTab.vue'
import { ref } from 'vue'

const tabs = [
  {
    id: 0,
    title: 'Главная',
    link: 'home',
  },
  {
    id: 1,
    title: 'Обо мне',
    link: 'about',
  },
  {
    id: 2,
    title: 'Контакты',
    link: 'contacts',
  },
]

const currentTabId = ref(0)
</script>

<template>
  <header :class="$style.header">
    <nav-bar-item
      v-for="tab in tabs"
      :key="tab.id"
      :active="tab.id === currentTabId"
      :title="tab.title"
      :link="tab.link"
      @click="currentTabId = tab.id"
    />
  </header>
</template>

<style module>
.header {
  padding: 48px 24px;
  background-color: #f1ebff;
  display: flex;
  gap: 32px;
}
</style>
