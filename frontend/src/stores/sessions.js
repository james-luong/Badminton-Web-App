// src/stores/sessions.js
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useSessionStore = defineStore('sessions', {
  state: () => ({ sessions: [], current: null }),
  actions: {
    async fetchAll() {
      const { data } = await api.get('/sessions')
      this.sessions = data
    },
    async fetchOne(id) {
      const { data } = await api.get(`/sessions/${id}`)
      this.current = data
    },
    async create(payload) {
      const { data } = await api.post('/sessions', payload)
      this.sessions.push(data)
      return data
    }
  }
})