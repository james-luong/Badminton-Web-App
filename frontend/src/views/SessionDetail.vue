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
  <div v-if="sessions.current">
    <h1>{{ sessions.current.title }}</h1>
    <p>{{ sessions.current.location }}</p>
    <p>{{ new Date(sessions.current.startTime).toLocaleString() }}</p>
    <RegistrationButton :session="sessions.current" :my-registration="myRegistration" @changed="sessions.fetchOne(route.params.id)" />
  </div>
</template>