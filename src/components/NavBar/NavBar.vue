<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { UserController } from '@/controllers/user-controller'
import NavBarItem from '@/components/NavBar/NavBarTab.vue'
import CustomInput from '@/components/CustomControllers/CustomInput.vue'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import { TABS } from '@/constants/tabs'
import { usePostStore } from '@/store/post'

const $route = useRoute()

const usersController = reactive(UserController.create())
const postsStore = usePostStore()

const currentTabId = ref(0)

const searchValue = ref('')

watch(searchValue, (newVal) => {
  postsStore.fetchPosts(0, newVal)
})

watch($route, (newVal) => {
  currentTabId.value = TABS.findIndex(({ link }) => link === newVal.path)
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

const onSubmitRegistraion = (email: string, username: string, password: string) => {
  usersController.register(email, password, username)
}
const onSubmitLogin = (email: string, password: string) => {
  usersController.login(email, password)
}

onMounted(() => {
  document.addEventListener('scroll', onScroll)
  usersController.mount(nextTick)
  const userFromStorage = localStorage.getItem('user')
  if (userFromStorage) {
    usersController.user = JSON.parse(userFromStorage)
  }
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
    <div :class="$style['left-menu']">
      <router-link to="/">
        <img :class="$style.logo" src="@/assets/images/logo.svg" alt="logo" />
      </router-link>
      <div :class="$style.tabs">
        <nav-bar-item
          v-for="tab in TABS"
          :key="tab.id"
          :active="tab.id === currentTabId"
          :title="tab.title"
          :link="tab.link"
          @click="currentTabId = tab.id"
        />
      </div>
    </div>
    <div :class="$style['right-menu']">
      <custom-input
        v-if="$route.path === '/'"
        v-model="searchValue"
        v-show="!!usersController.user"
        :class="$style['search-input']"
        type="text"
        placeholder="Поиск по постам"
        icon="search"
      />
      <custom-button
        v-show="!usersController.user"
        size="md"
        color="var(--color-lavender-shallow)"
        @click="onRegistrationFormOpened()"
      >
        Войти
      </custom-button>
      <custom-button
        v-show="!!usersController.user"
        size="md"
        color="var(--color-lavender-shallow)"
        @click="usersController.logout()"
      >
        Выйти
      </custom-button>
      <registration-modal
        v-if="registrationFormOpened"
        @close="onRegistrationFormClosed()"
        @submit-registration="onSubmitRegistraion"
        @submit-login="onSubmitLogin"
      />
    </div>
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
  align-items: baseline;
  justify-content: space-between;
  transition: all ease-out 0.2s;
}

.header-shadowed {
  box-shadow: var(--shadow-medium);
  transition: all ease-in 0.2s;
}

.left-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8vw;
}

.right-menu {
  display: flex;
  align-items: center;
  gap: 32px;
}

.tabs {
  display: flex;
  gap: 32px;
}
</style>
