<script setup>

import {useAuthStore} from '@/stores/modules/auth'
const authStore = useAuthStore()
const user = authStore.getUser
console.log(user)



</script>

<template>
    <div>
        <h1 class=" text-center text-3xl font-bold">User Page</h1>
        <div class=" bg-white shadow-gray-dark flex flex-col lg:flex-row items-center justify-center space-x-14">
            <img width="200" :src="user.image" :alt=" user.firstName + 'Image'">
            <div>
                <h1 class=" text-center text-3xl font-bold">User Information</h1>
                <p>{{ user.firstName }}</p>
                <p>{{ user.lastName }}</p>
                <p>{{ user.email }}</p>
            </div>
        </div>
    </div>

</template>