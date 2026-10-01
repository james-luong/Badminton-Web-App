<!-- src/views/SessionList.vue -->
<script setup>
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/sessions'
import SessionCard from '@/components/SessionCard.vue'

const sessions = useSessionStore()
onMounted(() => sessions.fetchAll())
</script>

<template>
  <div class="container">
    <div class="page-header">
      <h1>Upcoming sessions</h1>
    </div>
    <div v-if="sessions.sessions.length" class="session-grid">
      <SessionCard v-for="s in sessions.sessions" :key="s.id" :session="s" />
    </div>
    <p v-else class="empty-state">No upcoming sessions right now — check back soon.</p>
  </div>
</template>
