import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:address?',
      name: 'home',
      component: HomeView
    },
    {
      path: '/faq',
      name: 'faq',
      redirect: () => {
        return { path: '/' }
      }
    }
  ]
})

export default router
