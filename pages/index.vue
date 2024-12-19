<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Sign in to Lab KCKS
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="mb-4">
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="sr-only">Password</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                name="password"
                required
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              <input
                type="checkbox"
                id="togglePassword"
                @change="togglePassword"
                class="absolute right-3 top-3 cursor-pointer"
              />
              <label for="togglePassword" class="absolute right-10 top-3 text-sm">Show</label>
            </div>
          </div>
          <div class="mb-6">
            <label for="role" class="sr-only">Role</label>
            <select
              id="role"
              v-model="role"
              name="role"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Role</option>
              <option :value="Role.ADMIN">Admin</option>
              <option :value="Role.USER">Operator</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="mr-2">➡️</span> Sign in
          </button>
        </div>
      </form>

      <div v-if="error" class="mt-4 text-red-600 text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Role } from '~/types'
import { ref } from 'vue'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const role = ref('')
const error = ref('')
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  error.value = ''
  
  if (!username.value || !password.value || !role.value) {
    error.value = 'Please fill in all fields'
    return
  }

  const success = auth.login(username.value, password.value, role.value as Role)
  
  if (success) {
    if (role.value === Role.ADMIN) {
      router.push('/admin')
    } else {
      router.push('/operator/book-equipment')
    }
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>

<style scoped>
/* Tambahkan gaya tambahan jika diperlukan */
</style>