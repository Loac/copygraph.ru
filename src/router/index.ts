// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'copybook',
        name: 'Copybook',
        component: () => import('@/views/CopybookView.vue'),
      },
      {
        path: 'workbook',
        name: 'Workbook',
        component: () => import('@/views/WorkbookView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
