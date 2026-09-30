<!-- src/views/SessionList.vue -->
<script setup>
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/sessions'
import SessionCard from '@/components/SessionCard.vue'

const sessions = useSessionStore()
onMounted(() => sessions.fetchAll())
</script>

<template>
  <h1>Upcoming sessions</h1>
  <SessionCard v-for="s in sessions.sessions" :key="s.id" :session="s" />
</template>