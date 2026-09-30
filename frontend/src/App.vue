<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Sessions</RouterLink>
    <RouterLink to="/my-registrations">My registrations</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
  </nav>
  <RouterView />
</template>