<script setup>
import getUser from '@/graphql/auth/getUser.gql'
import authQuery  from '@/composables/authQuery'


import {useAuthStore} from '@/stores/modules/auth'
const authStore = useAuthStore()

const user = ref({
    firstName:null,
    lastName: null
})


function getUserId(){
    return authStore.getUserId
}
watch(getUserId, (newVal, oldVal) => {
    if(!newVal) return
    const {onResult, loading, onError, refetch} = authQuery(getUser,'user', {id:newVal})
    onResult((result) => { 
        authStore.setUser(result.data.users_by_pk)
        user.value.firstName = result.data.users_by_pk.firstName
        user.value.lastName = result.data.users_by_pk.lastName
    })
    onError((error) => {
        console.log(error)
    })
       
})


definePageMeta({
    layout: "userpanel",
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