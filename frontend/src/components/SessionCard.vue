<script setup>
defineProps({ session: Object })
</script>

<template>
  <RouterLink :to="`/sessions/${session.id}`" class="session-card">
    <h3>{{ session.title }}</h3>
    <p>{{ session.location }} · {{ new Date(session.startTime).toLocaleString() }}</p>
    <p>{{ session._count.registrations }} / {{ session.capacity }} confirmed</p>
  </RouterLink>
</template>