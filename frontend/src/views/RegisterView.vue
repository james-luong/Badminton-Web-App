<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const router = useRouter()
const auth = useAuthStore()
const form = reactive({ name: '', email: '', phone: '', password: '' })
const error = reactive({ message: '' })

async function submit() {
  try {
    await api.post('/auth/register', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password
    })
    await auth.login(form.email, form.password)
    router.push('/')
  } catch (err) {
    error.message = err.response?.data?.error || 'Registration failed'
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.name" type="text" placeholder="Name" required />
    <input v-model="form.email" type="email" placeholder="Email" required />
    <input v-model="form.phone" type="tel" placeholder="Phone" />
    <input v-model="form.password" type="password" placeholder="Password" required />
    <button type="submit">Register</button>
    <p v-if="error.message">{{ error.message }}</p>
  </form>
</template>