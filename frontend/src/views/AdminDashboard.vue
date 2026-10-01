<!-- src/views/AdminDashboard.vue -->
<script setup>
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/sessions'
import api from '@/services/api'

const sessions = useSessionStore()
onMounted(() => sessions.fetchAll())

async function cancelSession(id) {
  await api.delete(`/sessions/${id}`)
  await sessions.fetchAll()
}
</script>

<template>
  <div class="container">
    <div class="page-header">
      <h1>Manage sessions</h1>
      <RouterLink to="/admin/sessions/new" class="btn btn-primary">+ New session</RouterLink>
    </div>
    <table v-if="sessions.sessions.length">
      <thead>
        <tr>
          <th>Session</th>
          <th>Registered</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in sessions.sessions" :key="s.id">
          <td>{{ s.title }}</td>
          <td>{{ s._count.registrations }} / {{ s.capacity }}</td>
          <td><button class="btn btn-danger" @click="cancelSession(s.id)">Cancel</button></td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty-state">No sessions yet — create one to get started.</p>
  </div>
</template>
