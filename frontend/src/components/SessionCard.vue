<script setup>
import { computed } from 'vue'

const props = defineProps({ session: Object })

const spotsLeft = computed(() => props.session.capacity - props.session._count.registrations)
const isFull = computed(() => spotsLeft.value <= 0)
</script>

<template>
  <RouterLink :to="`/sessions/${session.id}`" class="session-card">
    <h3>{{ session.title }}</h3>
    <p class="meta">{{ session.location }} · {{ new Date(session.startTime).toLocaleString() }}</p>
    <span class="badge" :class="isFull ? 'badge-danger' : 'badge-success'">
      {{ isFull ? 'Full' : `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left` }}
    </span>
  </RouterLink>
</template>
