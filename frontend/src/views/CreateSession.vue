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
  <div class="container">
    <div class="card form-card">
      <h1>New session</h1>
      <form @submit.prevent="submit">
        <div class="field">
          <label for="title">Title</label>
          <input id="title" v-model="form.title" placeholder="Saturday social" required />
        </div>
        <div class="field">
          <label for="location">Location</label>
          <input id="location" v-model="form.location" placeholder="Community Sports Centre" required />
        </div>
        <div class="field">
          <label for="startTime">Start time</label>
          <input id="startTime" v-model="form.startTime" type="datetime-local" required />
        </div>
        <div class="field">
          <label for="endTime">End time</label>
          <input id="endTime" v-model="form.endTime" type="datetime-local" required />
        </div>
        <div class="field">
          <label for="capacity">Capacity</label>
          <input id="capacity" v-model.number="form.capacity" type="number" min="1" required />
        </div>
        <div class="field">
          <label for="cost">Cost per person ($)</label>
          <input id="cost" v-model.number="form.costPerPerson" type="number" step="0.01" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Create session</button>
      </form>
    </div>
  </div>
</template>
