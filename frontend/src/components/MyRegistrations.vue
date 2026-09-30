<!-- src/views/MyRegistrations.vue -->
<script setup>
import { onMounted } from 'vue'
import { useRegistrationStore } from '@/stores/registrations'

const registrations = useRegistrationStore()
onMounted(() => registrations.fetchMine())
</script>

<template>
  <h1>My registrations</h1>
  <ul>
    <li v-for="r in registrations.mine" :key="r.id">
      {{ r.session.title }} — {{ r.status }}
      <span v-if="r.status === 'WAITLISTED'">(position {{ r.waitlistPosition }})</span>
    </li>
  </ul>
</template>