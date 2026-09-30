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
  <h1>Manage sessions</h1>
  <RouterLink to="/admin/sessions/new">+ New session</RouterLink>
  <table>
    <tr v-for="s in sessions.sessions" :key="s.id">
      <td>{{ s.title }}</td>
      <td>{{ s._count.registrations }} / {{ s.capacity }}</td>
      <td><button @click="cancelSession(s.id)">Cancel</button></td>
    </tr>
  </table>
</template>