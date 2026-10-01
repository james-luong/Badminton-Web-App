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
  <div class="container">
    <div class="card form-card">
      <h1>Welcome back</h1>
      <form @submit.prevent="submit">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" placeholder="you@example.com" required />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" v-model="form.password" type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Log in</button>
        <p v-if="error.message" class="form-error">{{ error.message }}</p>
      </form>
      <p class="form-footer">Don't have an account? <RouterLink to="/register">Register</RouterLink></p>
    </div>
  </div>
</template>
