<template>
    <header class="bg-indigo-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <NuxtLink to="/admin" class="text-xl font-bold">Lab KCKS</NuxtLink>
        <nav class="flex space-x-4">
          <NuxtLink to="/rules" class="hover:underline">Aturan & Alur</NuxtLink>
          <div v-if="auth.isAuthenticated" class="flex items-center">
            <span class="mr-2">{{ auth.username }}</span>
            <NuxtLink to="/" @click.prevent="logout" class="text-red-500 hover:underline">Logout</NuxtLink>
          </div>
          <div v-else>
            <NuxtLink to="/" class="hover:underline">Login</NuxtLink>
          </div>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  import { useAuthStore } from '~/stores/auth'
  import { useRouter } from 'vue-router'
  
  const auth = useAuthStore()
  const router = useRouter()
  
  const logout = () => {
    auth.logout()
    router.push('/') // Arahkan kembali ke halaman login setelah logout
  }
  </script>