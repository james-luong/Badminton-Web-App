<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="navbar-brand">🏸 Badminton Club</RouterLink>
    <div class="navbar-links">
      <RouterLink to="/">Sessions</RouterLink>
      <RouterLink v-if="auth.token" to="/my-registrations">My registrations</RouterLink>
      <RouterLink v-if="auth.user?.role === 'ADMIN'" to="/admin">Admin</RouterLink>
      <template v-if="auth.token">
        <span class="navbar-user">{{ auth.user?.name }}</span>
        <button class="link" @click="handleLogout">Log out</button>
      </template>
      <template v-else>
        <RouterLink to="/login">Log in</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </template>
    </div>
  </nav>
  <RouterView />
</template>
