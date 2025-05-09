<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBarItem from '@/components/NavBar/NavBarTab.vue'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'

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

const registrationFormOpened = ref(false)
const onRegistrationFormOpened = () => {
  registrationFormOpened.value = true
}
const onRegistrationFormClosed = () => {
  registrationFormOpened.value = false
}

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
    <div :class="$style.tabs">
      <nav-bar-item
        v-for="tab in tabs"
        :key="tab.id"
        :active="tab.id === currentTabId"
        :title="tab.title"
        :link="tab.link"
        @click="currentTabId = tab.id"
      />
    </div>
    <custom-button
      size="md"
      color="var(--color-lavender-shallow)"
      @click="onRegistrationFormOpened()"
    >
      Регистрация
    </custom-button>
    <registration-modal v-if="registrationFormOpened" @close="onRegistrationFormClosed()" />
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
  align-items: baseline;
  justify-content: space-between;
  transition: all ease-out 0.2s;
}

.header-shadowed {
  box-shadow: var(--shadow-medium);
  transition: all ease-in 0.2s;
}

.tabs {
  display: flex;
  gap: 32px;
}

.logo {
  margin-right: 8vw;
}
</style>
