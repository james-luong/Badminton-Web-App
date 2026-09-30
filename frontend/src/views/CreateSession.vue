<!-- src/views/CreateSession.vue -->
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessions'

const router = useRouter()
const sessions = useSessionStore()
const form = reactive({ title: '', location: '', startTime: '', endTime: '', capacity: 10, costPerPerson: 5 })

async function submit() {
  await sessions.create(form)
  router.push('/admin')
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.title" placeholder="Title" required />
    <input v-model="form.location" placeholder="Location" required />
    <input v-model="form.startTime" type="datetime-local" required />
    <input v-model="form.endTime" type="datetime-local" required />
    <input v-model.number="form.capacity" type="number" min="1" required />
    <input v-model.number="form.costPerPerson" type="number" step="0.01" required />
    <button type="submit">Create session</button>
  </form>
</template>