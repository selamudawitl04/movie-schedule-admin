
<script setup>
import { ref } from "vue";
const selectedLink = ref('')


import {useAuthStore} from '~/stores/modules/auth'
const authStore = useAuthStore()
const router = useRouter()
const logout = () => {
    authStore.logout()
    router.push('/auth/login')
}

</script>

<template>
    <aside class=" bg-gradient-to-br from-gray-dark  to-gray-dark  overflow-hidden fixed inset-0 z-50 my-4 ml-4  w-80 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <div class="relative border-b border-white/20">
            <NuxtLink  class="flex justify-center items-center gap-4 py-6  px-8" to="/">
                <img src="@/assets/img/logo.png" class="inline-block relative object-cover object-center  rounded-md">
                <!-- <span class=" text-xl tracking-normal font-sans  font-semibold leading-relaxed text-white"> Admin Panel</span> -->
            </NuxtLink>
        </div>
        <div class=" mx- h-[calc(100vh-32px)]   overflow-y-scroll">
            <ul class="mb-24 mt-2 space-y-2 flex flex-col justify-center px-4   text-white font-bold">
                <li class="  ">
                    <NuxtLink class="px-2  block py-4 rounded-md w-full  hover:bg-primary7"  to="/" >
            
                        <BaseIcon path="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"/>

                        Dashboard
                    </NuxtLink>
                </li>
                <li class=" ">
                    <NuxtLink class=" block px-2 bg-opacity-40 py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright "  to="/">
        
                        <BaseIcon path="M11.03 20H4C2.9 20 2 19.1 2 18L2 6C2 4.9 2.9 4 4 4H5L7 8H10L8 4H10L12 8H15L13 4H15L17 8H20L18 4H22V13.05C20.85 11.22 18.82 10 16.5 10C12.92 10 10 12.92 10 16.5C10 17.79 10.38 19 11.03 20M23.39 22L22 23.39L18.88 20.32C18.19 20.75 17.37 21 16.5 21C14 21 12 19 12 16.5S14 12 16.5 12 21 14 21 16.5C21 17.38 20.75 18.21 20.31 18.9L23.39 22M19 16.5C19 15.12 17.88 14 16.5 14S14 15.12 14 16.5 15.12 19 16.5 19 19 17.88 19 16.5Z"/>

                        Movies List</NuxtLink>
                </li>
                <li class=" ">
                    <NuxtLink class=" block px-2 bg-opacity-40 py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright bg-opacity-40"  to="/actors">
                        
                        <BaseIcon path="M19.5 1L18.41 3.41L16 4.5L18.41 5.59L19.5 8L20.6 5.59L23 4.5L20.6 3.41L19.5 1M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 10.53 21.67 9.13 21.1 7.87L19.86 10.57C19.95 11.04 20 11.5 20 12C20 16.43 16.43 20 12 20C7.57 20 4 16.43 4 12C4 11.95 4 11.91 4 11.86A10 10 0 0 0 9.74 6.31C11.61 8.61 14.44 10 17.5 10C17.94 10 18.39 9.97 18.83 9.91L17.96 8C17.81 8 17.65 8 17.5 8C14.68 8 12.1 6.5 10.66 4.12C11.1 4.05 11.54 4 12 4C12.5 4 12.96 4.05 13.42 4.13L16.13 2.91C14.87 2.33 13.47 2 12 2M8.09 5A8 8 0 0 1 4.41 9.5C5.04 7.57 6.37 6 8.09 5M9 11.75A1.25 1.25 0 0 0 7.75 13A1.25 1.25 0 0 0 9 14.25A1.25 1.25 0 0 0 10.25 13A1.25 1.25 0 0 0 9 11.75M15 11.75A1.25 1.25 0 0 0 13.75 13A1.25 1.25 0 0 0 15 14.25A1.25 1.25 0 0 0 16.25 13A1.25 1.25 0 0 0 15 11.75Z"/>

                        Actors List</NuxtLink>
                </li>
                <li class=" ">
                    <NuxtLink class=" block px-2 bg-opacity-40 py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright bg-opacity-40"  to="/directors">
                        <BaseIcon path="M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z"/>
                        Directors List</NuxtLink>
                </li>
                <li class=" ">
                    <NuxtLink class=" block px-2 bg-opacity-40 py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright bg-opacity-40"  to="/users">
                        <BaseIcon path="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>

                        Users List</NuxtLink>
                </li>

                <h3 class=" text-primary5 font-bold p-4">ADD PAGES</h3>
                <li class="">
                    <NuxtLink class=" block px-2 bg-opacity-40 py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright bg-opacity-40"  to="/actors/addActor">
                        <BaseIcon path="M5.8 21L7.4 14L2 9.2L9.2 8.6L12 2L14.8 8.6L22 9.2L18.8 12H18C14.9 12 12.4 14.3 12 17.3L5.8 21M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z"/>

                        Add Actor</NuxtLink>
                </li>
                <li class="  ">
                    <NuxtLink class=" block px-2 bg-opacity-40 py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright bg-opacity-40"  to="/movies/addMovie">
                        
                        <BaseIcon path="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.9 4 4 4H5L7 8H10L8 4H10L12 8H15L13 4H15L17 8H20L18 4H22V13.81C21.12 13.3 20.1 13 19 13C15.69 13 13 15.69 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z"/>

                        Add Movie</NuxtLink>
                </li>
                <li class="">
                    <NuxtLink active-class="bg-yellow-bright bg-opacity-40"  class=" block px-2 bg-opacity-40 py-4 rounded-md w-full  hover:bg-primary7"  to="/directors/addDirector">
                        <BaseIcon path="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"/>

                        Add Director</NuxtLink>
                </li>
               
                <li class="">
                    <NuxtLink active-class="bg-yellow-bright bg-opacity-40"  class=" block px-1.5 bg-opacity-40 py-4 rounded-md w-full  hover:bg-primary7"  to="/notifications">

                        <BaseIcon path="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>

                        Notification</NuxtLink>
                </li>
                <div class="">
                    <button @click="logout"  class="w-full items-center flex   text-left   bg-gray-dark mb-2 text-white font-bold p-1.5 px-2 hover:bg-yellow-bright" >
                        <BaseIcon path="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
                        Logout</button >
                </div>
                
            </ul>
          
        </div>
    </aside>
       
</template>
<style scoped>
.bg-yellow-bright{
    background-color: #E4D804;
}

</style>