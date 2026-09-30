// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'session-list', component: () => import('@/views/SessionList.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/Login.vue') },
  { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },
  { path: '/sessions/:id', name: 'session-detail', component: () => import('@/views/SessionDetail.vue'), meta: { requiresAuth: true } },
  { path: '/my-registrations', name: 'my-registrations', component: () => import('@/views/MyRegistrations.vue'), meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin-dashboard', component: () => import('@/views/AdminDashboard.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/sessions/new', name: 'create-session', component: () => import('@/views/CreateSession.vue'), meta: { requiresAuth: true, requiresAdmin: true } }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) return '/login'
  if (to.meta.requiresAdmin && auth.user?.role !== 'ADMIN') return '/'
})

export default router