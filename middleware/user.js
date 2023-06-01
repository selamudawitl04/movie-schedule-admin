import {useAuthStore} from "@/stores/modules/auth"
export default defineNuxtRouteMiddleware((to, from , next) => {
    const authStore = useAuthStore()
    // authStore.autoLogin()
    console.log('authStore.isLoggedIn: tenh go ', authStore.isLoggedIn)
    if (authStore.isLoggedIn) {
        return
    }
    else {
        return navigateTo('/auth/login')
    }
  })