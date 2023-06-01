import {useAuthStore} from "@/stores/modules/auth"
export default defineNuxtRouteMiddleware((to, from , next) => {
    const authStore = useAuthStore()
    if (authStore.isLoggedIn && authStore.user.role === 'admin') {
        return
    }
    else {
        return navigateTo('/')
    }
  })