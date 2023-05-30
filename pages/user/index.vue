<script setup>
import getUser from '@/graphql/auth/getUser.gql'
import authQuery  from '@/composables/authQuery'


import {useAuthStore} from '@/stores/modules/auth'
const authStore = useAuthStore()


function getUserId(){
    return authStore.getUserId
}
watch(getUserId, (newVal, oldVal) => {
    if(!newVal) return
    const {onResult, loading, onError, refetch} = authQuery(getUser,'user', {id:newVal})
    onResult((result) => { 
        authStore.setUser(result.data.users_by_pk)
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
    <div>
    </div>
</template>