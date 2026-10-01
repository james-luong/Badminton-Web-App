<!-- src/views/RegisterView.vue -->
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
  <div class="container">
    <div class="card form-card">
      <h1>Create your account</h1>
      <form @submit.prevent="submit">
        <div class="field">
          <label for="name">Name</label>
          <input id="name" v-model="form.name" type="text" placeholder="Jane Smith" required />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" placeholder="you@example.com" required />
        </div>
        <div class="field">
          <label for="phone">Phone</label>
          <input id="phone" v-model="form.phone" type="tel" placeholder="Optional" />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" v-model="form.password" type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Register</button>
        <p v-if="error.message" class="form-error">{{ error.message }}</p>
      </form>
      <p class="form-footer">Already have an account? <RouterLink to="/login">Log in</RouterLink></p>
    </div>
  </div>
</template>
