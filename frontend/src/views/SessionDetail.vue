<!-- src/views/SessionDetail.vue -->
<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSessionStore } from '@/stores/sessions'
import { useAuthStore } from '@/stores/auth'
import RegistrationButton from '@/components/RegistrationButton.vue'

const route = useRoute()
const sessions = useSessionStore()
const auth = useAuthStore()

onMounted(() => sessions.fetchOne(route.params.id))

const myRegistration = computed(() =>
  sessions.current?.registrations?.find(r => r.userId === auth.user.id)
)
</script>

<template>
  <div class="container">
    <div v-if="sessions.current" class="card" style="max-width: 480px; margin: 0 auto;">
      <RouterLink to="/" class="back-link">← Back to sessions</RouterLink>
      <div class="detail-header">
        <h1>{{ sessions.current.title }}</h1>
      </div>
      <div class="detail-facts">
        <p>📍 {{ sessions.current.location }}</p>
        <p>🗓️ {{ new Date(sessions.current.startTime).toLocaleString() }}</p>
        <p>💲 ${{ sessions.current.costPerPerson }} per person</p>
      </div>
      <RegistrationButton :session="sessions.current" :my-registration="myRegistration" @changed="sessions.fetchOne(route.params.id)" />
    </div>
  </div>
</template>
