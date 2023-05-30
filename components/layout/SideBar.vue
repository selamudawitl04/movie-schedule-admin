
<script setup>
import { ref } from "vue";
const selectedLink = ref('')

</script>

<template>
    <aside class="bg-gradient-to-br from-gray-dark  to-gray-dark  overflow-hidden z-0 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-80 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <div class="relative border-b border-white/20">
            <NuxtLink  class="flex items-center gap-4 py-6  px-8" to="/">
                <img src="../../assets/img/logo.png" class="inline-block relative object-cover object-center  rounded-md">
                <span class=" text-xl tracking-normal font-sans  font-semibold leading-relaxed text-white"> Admin Panel</span>
            </NuxtLink>
        </div>
        <div class="m-4">
            <ul class="mb-4 flex flex-col gap-1  text-white font-bold">
                <li class="  ">
                    <NuxtLink class=" block py-4 rounded-md w-full  hover:bg-primary7"  to="/admin" >
                        <img class="w-5 mr-2.5 inline" src="../../assets/img/home-svgrepo-com1.svg" alt="Home Image">
                        Dashboard
                    </NuxtLink>
                </li>
                <li class=" ">
                    <NuxtLink class=" block py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright" to="/admin">
                        <img class="w-5 mr-2.5 inline" src="../../assets/img/home-svgrepo-com1.svg" alt="Home Image">
                        
                        Movies List</NuxtLink>
                </li>
                <li class=" ">
                    <NuxtLink class=" block py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright" to="/admin/actors">
                        <img class="w-5 mr-2.5 inline" src="../../assets/img/home-svgrepo-com1.svg" alt="Home Image">
                        Actors List</NuxtLink>
                </li>
                <li class=" ">
                    <NuxtLink class=" block py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright" to="/admin/directors">
                        <img class="w-5 mr-2.5 inline" src="../../assets/img/home-svgrepo-com1.svg" alt="Home Image">
                        Directors List</NuxtLink>
                </li>

                <h3 class=" text-primary5 font-bold p-4">ADD PAGES</h3>
                <li class="">
                    <NuxtLink class=" block py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright" to="/admin/actors/addActor">
                        <img class="w-5 mr-2.5 inline" src="../../assets/img/home-svgrepo-com1.svg" alt="Home Image">
                        Add Actor</NuxtLink>
                </li>
                <li class="  ">
                    <NuxtLink class=" block py-4 rounded-md w-full  hover:bg-primary7" active-class="bg-yellow-bright" to="/admin/movies/addMovie">
                        <img class="w-5 mr-2.5 inline" src="../../assets/img/home-svgrepo-com1.svg" alt="Home Image">
                        Add Movie</NuxtLink>
                </li>
                <li class="">
                    <NuxtLink active-class="bg-yellow-bright" class=" block py-4 rounded-md w-full  hover:bg-primary7"  to="/admin/directors/addDirector">
                        <img class="w-5 mr-2.5 inline" src="../../assets/img/home-svgrepo-com1.svg" alt="Home Image">
                        Add Director</NuxtLink>
                </li>
                
                <!-- <li class=" p-4 rounded-md hover:bg-primary7 ">
                    <NuxtLink to="/admin/movies">
                        Logout</NuxtLink>
                </li> -->
            </ul>
          
        </div>
    </aside>
       
</template>
<style scoped>
.bg-yellow-bright{
    background-color: #E4D804;
}

</style>