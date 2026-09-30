<!-- src/views/Login.vue -->
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const form = reactive({ email: '', password: '' })
const error = reactive({ message: '' })

async function submit() {
  try {
    await auth.login(form.email, form.password)
    router.push('/')
  } catch {
    error.message = 'Invalid email or password'
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.email" type="email" placeholder="Email" required />
    <input v-model="form.password" type="password" placeholder="Password" required />
    <button type="submit">Log in</button>
    <p v-if="error.message">{{ error.message }}</p>
  </form>
</template>