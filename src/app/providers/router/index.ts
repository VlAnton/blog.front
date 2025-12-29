import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage'),
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: () => import('@/pages/PostPreview.vue'),
      props: (to) => ({
        postId: to.params.id,
      }),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/pages/ContactsPage.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/pages/CreatePostPage.vue'),
    },
  ],
})

export default router
