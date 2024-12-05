import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ContactsPage from '@/pages/ContactsPage.vue'
import CreatePostPage from '@/pages/CreatePostPage.vue'
import PostPreview from '@/pages/PostPreview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostPreview,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsPage,
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePostPage,
    },
  ],
})

export default router
