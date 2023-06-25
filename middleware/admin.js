import {useAuthStore} from "@/stores/modules/auth"
export default defineNuxtRouteMiddleware((to, from , next) => {
    const authStore = useAuthStore()
    authStore.autoLogin()
    if (authStore.isLoggedIn) {
        return
    }
    else {
        return navigateTo('/auth/login')
    }
  })