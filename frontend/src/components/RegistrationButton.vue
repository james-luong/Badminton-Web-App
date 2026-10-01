<!-- src/components/RegistrationButton.vue -->
<script setup>
import { computed } from 'vue'
import { useRegistrationStore } from '@/stores/registrations'

const props = defineProps({ session: Object, myRegistration: Object })
const emit = defineEmits(['changed'])
const registrations = useRegistrationStore()

const isRegistered = computed(() =>
  props.myRegistration && props.myRegistration.status !== 'CANCELLED'
)

const label = computed(() => {
  if (!isRegistered.value) return 'Register'
  if (props.myRegistration.status === 'WAITLISTED') return `On waitlist (position ${props.myRegistration.waitlistPosition})`
  return 'Cancel registration'
})

async function handleClick() {
  if (!isRegistered.value) {
    await registrations.register(props.session.id)
  } else {
    await registrations.cancel(props.session.id)
  }
  emit('changed')
}
</script>

<template>
  <button class="btn" :class="isRegistered ? 'btn-outline' : 'btn-primary'" @click="handleClick">{{ label }}</button>
</template>
