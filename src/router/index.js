//TO DO: CHANGE VOTE TO CANDIDATE

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'
import VoteView from '@/views/VoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404.vue')
    },
    {
      path: '/',
      component: HomeView,
      name: 'home'
    },
    {
      path: '/vote',
      component: VoteView,
      name: 'vote',
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  //  klo urlnya gada di public pages brrti perlu login
  const auth = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authRequired && (!auth.user || auth.user.token === null)) {
      auth.returnUrl = to.fullPath
      return next('/')
    } else next()
  } else {
    next()
  }
})

export default router
