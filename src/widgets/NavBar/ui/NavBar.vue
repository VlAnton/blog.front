<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBarItem from './NavBarTab.vue'
import CustomInput from '@/shared/ui/CustomControllers/CustomInput.vue'
import CustomButton from '@/shared/ui/CustomControllers/CustomButton.vue'
import RegistrationModal from '@/shared/ui/Modal/RegistrationModal.vue'
import { TABS } from '@/shared/constants/tabs'
import { postApi, usePostStore } from '@/entities/post'
import { usersApi, useUserStore } from '@/entities/user'

const $route = useRoute()

const userStore = useUserStore()
const postsStore = usePostStore()

const currentTabId = ref(0)

const searchValue = ref('')

watch(searchValue, async (newVal) => {
  postsStore.setPosts((await postApi.fetchPosts(newVal)) ?? [])
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

async function onSubmitRegistraion(email: string, username: string, password: string) {
  userStore.setUser((await usersApi.register({ email, password, username })) ?? null)
}
async function onSubmitLogin(email: string, password: string) {
  userStore.setUser((await usersApi.login(email, password)) ?? null)
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
    <div :class="$style['left-menu']">
      <RouterLink to="/">
        <img :class="$style.logo" src="@/shared/assets/images/svgs/logo.svg" alt="logo" />
      </RouterLink>
      <div :class="$style.tabs">
        <NavBarItem
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
      <CustomInput
        v-if="$route.path === '/'"
        v-model="searchValue"
        v-show="!!userStore.user"
        :class="$style['search-input']"
        type="text"
        placeholder="Поиск по постам"
        icon="search"
      />
      <CustomButton
        v-show="!userStore.user"
        size="md"
        color="var(--color-lavender-shallow)"
        @click="onRegistrationFormOpened()"
      >
        Войти
      </CustomButton>
      <CustomButton
        v-show="!!userStore.user"
        size="md"
        color="var(--color-lavender-shallow)"
        @click="usersApi.logout()"
      >
        Выйти
      </CustomButton>
      <RegistrationModal
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
