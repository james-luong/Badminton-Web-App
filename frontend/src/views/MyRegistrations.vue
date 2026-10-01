<!-- src/views/MyRegistrations.vue -->
<script setup>
import { onMounted } from 'vue'
import { useRegistrationStore } from '@/stores/registrations'

const registrations = useRegistrationStore()
onMounted(() => registrations.fetchMine())

function badgeClass(status) {
  if (status === 'CONFIRMED') return 'badge-success'
  if (status === 'WAITLISTED') return 'badge-warning'
  return 'badge-muted'
}
</script>

<template>
  <div class="container">
    <div class="page-header">
      <h1>My registrations</h1>
    </div>
    <div v-if="registrations.mine.length" class="list">
      <div class="list-row" v-for="r in registrations.mine" :key="r.id">
        <div>
          <div class="title">{{ r.session.title }}</div>
          <div class="sub" v-if="r.status === 'WAITLISTED'">Waitlist position {{ r.waitlistPosition }}</div>
        </div>
        <span class="badge" :class="badgeClass(r.status)">{{ r.status }}</span>
      </div>
    </div>
    <p v-else class="empty-state">You haven't registered for any sessions yet.</p>
  </div>
</template>
