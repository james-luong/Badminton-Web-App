<!-- src/components/RegistrationButton.vue -->
<script setup>
import { computed } from 'vue'
import { useRegistrationStore } from '@/stores/registrations'

const props = defineProps({ session: Object, myRegistration: Object })
const emit = defineEmits(['changed'])
const registrations = useRegistrationStore()

const label = computed(() => {
  if (!props.myRegistration || props.myRegistration.status === 'CANCELLED') return 'Register'
  if (props.myRegistration.status === 'WAITLISTED') return `On waitlist (position ${props.myRegistration.waitlistPosition})`
  return 'Cancel registration'
})

async function handleClick() {
  if (!props.myRegistration || props.myRegistration.status === 'CANCELLED') {
    await registrations.register(props.session.id)
  } else {
    await registrations.cancel(props.session.id)
  }
  emit('changed')
}
</script>

<template>
  <button @click="handleClick">{{ label }}</button>
</template>