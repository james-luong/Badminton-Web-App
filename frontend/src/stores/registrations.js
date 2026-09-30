// src/stores/registrations.js
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useRegistrationStore = defineStore('registrations', {
  state: () => ({ mine: [] }),
  actions: {
    async register(sessionId) {
      const { data } = await api.post(`/sessions/${sessionId}/register`)
      return data
    },
    async cancel(sessionId) {
      await api.delete(`/sessions/${sessionId}/register`)
    },
    async fetchMine() {
      const { data } = await api.get('/users/me/registrations')
      this.mine = data
    }
  }
})