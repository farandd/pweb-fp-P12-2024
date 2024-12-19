import { defineStore } from 'pinia'
import { Role } from '~/types'
import { AUTH_CREDENTIALS } from '~/constants/auth'

interface AuthState {
  user: {
    username: string;
    role: Role;
  } | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === Role.ADMIN,
    isOperator: (state) => state.user?.role === Role.USER,
  },

  actions: {
    login(username: string, password: string, role: Role) {
      const credentials = role === Role.ADMIN ? AUTH_CREDENTIALS.ADMIN : AUTH_CREDENTIALS.OPERATOR
      
      if (username === credentials.username && password === credentials.password) {
        this.user = { username, role }
        localStorage.setItem('user', JSON.stringify(this.user))
        return true
      }
      return false
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    },

    initAuth() {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
      }
    }
  }
})