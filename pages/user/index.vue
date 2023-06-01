<script setup>

import {useAuthStore} from '@/stores/modules/auth'
const authStore = useAuthStore()

const user = ref({
    firstName:null,
    lastName: null
})

function getUser(){
    return authStore.getUser
}
watch(getUser, (newVal, oldVal) => {
    if(newVal){
        user.value.firstName = newVal.firstName
        user.value.lastName = newVal.lastName
    }
})

if(authStore.getUser){
    
    user.value.firstName = authStore.getUser.firstName
    user.value.lastName = authStore.getUser.lastName
}


definePageMeta({
    layout: "userpanel",
    // middleware:["user"]
});



</script>

<template>
    <div v-if="user.firstName" class=" lg:ml-6  w-full">
        <p class=" text-primary9">Hello {{ user.firstName + ' '+ user.lastName }} (not {{ user.firstName }} ? <span class=" text-yellow-bright">Logout</span>) </p>
        <div class=" my-8 text-primary9">
            <p>
                From your account dashboard you can view <span class=" text-yellow-bright">your recent tickets</span> , 
                manage your bookings,
                 and<span class=" text-yellow-bright"> edit your password and account details.</span> 
            </p>
        </div>

    </div>
</template>