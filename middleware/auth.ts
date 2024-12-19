export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  
  // Initialize auth state from localStorage
  auth.initAuth()

  // Public routes
  if (to.path === '/' || to.path === '/#rules') {
    return
  }

  // Protected routes
  if (!auth.isAuthenticated) {
    return navigateTo('/')
  }

  // Admin routes
  if (to.path.startsWith('/admin') && !auth.isAdmin) {
    return navigateTo('/')
  }

  // Operator routes
  if (to.path.startsWith('/operator') && !auth.isOperator) {
    return navigateTo('/')
  }
})