<script setup>

import {useAuthStore} from '~/stores/modules/auth'
const authStore = useAuthStore()
const router = useRouter()
const logout = () => {
    authStore.logout()
    router.push('/')
}

</script>

<template>
    <div class="w-full lg:w-80 mr-6">

        <div class="">
            <NuxtLink class=" block   bg-gray-dark mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/user">Dashboard</NuxtLink>
        </div>
        <div class="">
            <NuxtLink class=" block bg-gray-dark   mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/user/booking">Bookings</NuxtLink>
        </div>
        <div class="">
            <NuxtLink class=" block  bg-gray-dark mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/user/tickets">Tickets</NuxtLink>
        </div>
        <div class="">
            <NuxtLink class=" block  bg-gray-dark mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/user/accounts">Account</NuxtLink>
        </div>
        <div class="">
            <NuxtLink class=" block  bg-gray-dark mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/error">Notification</NuxtLink>
        </div>
        <div class="">
            <button @click="logout"  class="w-full  text-left block  bg-gray-dark mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" >Logout</button >
        </div>
        
    </div>
</template>