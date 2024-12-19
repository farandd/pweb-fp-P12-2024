<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow pb-24 mx-auto px-4 sm:px-6 lg:px-8">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/ui/Header.vue'
import Footer from '~/components/ui/Footer.vue'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>