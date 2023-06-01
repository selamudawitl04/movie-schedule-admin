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
            
            <NuxtLink class=" items-center flex  space-x-4   bg-gray-dark mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/user">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     width="20"
                    height="20"
                    class="text-white cursor-pointer"
                viewBox="0 0 24 24">
                <path
                fill="currentColor"

                 d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
                </svg>
                Dashboard</NuxtLink>
        </div>
        <div class="">
            <NuxtLink class=" items-center flex  space-x-4  bg-gray-dark   mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/user/booking">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     width="20"
                    height="20"
                    class="text-white cursor-pointer"
                viewBox="0 0 24 24">
                <path
                fill="currentColor"
            d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M18 14L15.5 12.5L13 14V6H18V14Z"

                  />
                </svg>
                Bookings</NuxtLink>
        </div>
        <div class="">
            <NuxtLink class=" items-center flex  space-x-4  bg-gray-dark   mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/user/tickets">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     width="20"
                    height="20"
                    class="text-white cursor-pointer"
                viewBox="0 0 24 24">
                <path
                fill="currentColor"
            d="M15.58,16.8L12,14.5L8.42,16.8L9.5,12.68L6.21,10L10.46,9.74L12,5.8L13.54,9.74L17.79,10L14.5,12.68M20,12C20,10.89 20.9,10 22,10V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V10C3.11,10 4,10.9 4,12A2,2 0 0,1 2,14V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V14A2,2 0 0,1 20,12Z"
                  />
                </svg>
                Tickets</NuxtLink>
        </div>
        <div class="">
            <NuxtLink class=" items-center flex  space-x-4  bg-gray-dark   mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/user/accounts">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     width="20"
                    height="20"
                    class="text-white cursor-pointer"
                viewBox="0 0 24 24">
                <path
                fill="currentColor"
            d="M6,17C6,15 10,13.9 12,13.9C14,13.9 18,15 18,17V18H6M15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6A3,3 0 0,1 15,9M3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5C3.89,3 3,3.9 3,5Z"
                  />
                </svg>
                Account</NuxtLink>
        </div>
        <div class="">
            <NuxtLink class=" items-center flex  space-x-4  bg-gray-dark   mb-2 text-white font-bold p-4 hover:bg-yellow-bright" active-class="bg-yellow-bright" to="/error">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     width="20"
                    height="20"
                    class="text-white cursor-pointer"
                viewBox="0 0 24 24">
                <path
                fill="currentColor"
            d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"
                  />
                </svg>
                Notification</NuxtLink>
        </div>
    
       
        <div class="">
            <button @click="logout"  class="w-full items-center flex  space-x-4   text-left   bg-gray-dark mb-2 text-white font-bold p-4 hover:bg-yellow-bright" >
                <svg xmlns="http://www.w3.org/2000/svg" 
                     width="20"
                    height="20"
                    class="text-white cursor-pointer"
                viewBox="0 0 24 24">
                <path
                fill="currentColor"
            d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
                  />
                </svg>
                Logout</button >
        </div>
        
    </div>
</template>