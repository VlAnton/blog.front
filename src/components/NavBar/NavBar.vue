<script setup lang="ts">
import NavBarItem from '@/components/NavBar/NavBarTab.vue'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()

const tabs = [
  {
    id: 0,
    title: 'Главная',
    link: '/',
  },
  {
    id: 1,
    title: 'Обо мне',
    link: '/about',
  },
  {
    id: 2,
    title: 'Контакты',
    link: '/contacts',
  },
]

const currentTabId = ref(0)
watch($route, (newVal) => {
  currentTabId.value = tabs.findIndex(({ link }) => link === newVal.path)
})

const isScrollActive = ref(false)

const onScroll = () => {
  isScrollActive.value = true
  if (window.scrollY === 0) {
    isScrollActive.value = false
  }
}

onMounted(() => {
  document.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    :class="{
      [$style.header]: true,
      [$style['header-shadowed']]: isScrollActive,
    }"
  >
    <router-link to="/">
      <img :class="$style.logo" src="@/assets/images/logo.svg" alt="logo" />
    </router-link>
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
  position: sticky;
  top: 0;
  z-index: 1;

  padding: 24px 48px;
  background-color: var(--color-lavender);
  display: flex;
  gap: 32px;
  align-items: flex-start;
  transition: all ease-out 0.2s;
}

.header-shadowed {
  box-shadow: var(--shadow-medium);
  transition: all ease-in 0.2s;
}

.logo {
  margin-right: 8vw;
}
</style>
