<!-- The header -->
<script setup>

import {useAuthStore} from '@/stores/modules/auth'
import updateUserMutation from '@/graphql/auth/updateUser.gql'
import mutation from '@/composables/mutation'
const authStore = useAuthStore()

const user = ref({
    firstName:null,
    lastName: null,
    email: null,
    password: null,
    newPassword: null,
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
    user.value.email = authStore.getUser.email

}

const updated = ref(false)
const serverError = reactive({
    error: false,
    message: ''
})
const {mutate, onDone, onError, loading} = mutation(updateUserMutation, 'user')
function updateUser(){
    const data = {
        firstName: user.value.firstName,
        lastName: user.value.lastName,
        email: user.value.email,
        password: user.value.password,
        newPassword: user.value.newPassword,
    }
    mutate({data})
}

onDone((result)=>{
    updated.value = true
    setTimeout(()=>{
        updated.value = false
    }, 5000)
    console.log('Updated Succesfully')
})

onError(error=>{
    console.log(error)
    serverError.error = true
    serverError.message = error.message
    
})

definePageMeta({
    layout: "userpanel",
    // middleware: '[user]'

});

</script>

<template>
    <div v-if="user" class=" lg:ml-6  w-full">
        <form @submit.prevent="updateUser" action="">
            <!-- first name and last name -->
            <div class=" w-full  mb-4  flex">
                <div  class=" w-full mr-4 text-primary9 ">
                    <label for="first_name" >First Name<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="text" id="first_name" v-model="user.firstName" class="w-full border border-gray p-3 ">
                </div>
                <div class=" w-full ml-4 text-primary9">
                    <label for="last_name">Last Name<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="text" id="last_name" v-model="user.lastName" class="w-full border border-gray p-3 ">
                </div>
            </div>  
            <div class=" w-full text-primary9">
                <label for="last_name">Email Address<span class=" text-red font-bold  text-lg">*</span></label>
                <input type="text" id="email" v-model="user.email" class="w-full border border-gray p-3 ">
            </div>

            <!-- Password Change -->
            <div class=" relative p-4 border border-gray mt-6">
                <p class=" text-primary9 absolute -top-3 z-30 bg-white">Change Password</p>
                <div class=" my-6 w-full text-primary9">
                    <label for="last_name">Current password (leave blank to leave unchanged)<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="password" id="password" v-model="user.password" class="w-full border border-gray p-3 ">
                </div>
                <div class=" my-6 w-full text-primary9">
                    <label for="last_name">New password (leave blank to leave unchanged)<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="password" id="new-password" v-model="user.newPassword" class="w-full border border-gray p-3 ">
                </div>
                <div class=" mt-6 w-full text-primary9">
                    <label for="last_name">Confirm new password<span class=" text-red font-bold  text-lg">*</span></label>
                    <input type="password" id="confirm"  class="w-full border border-gray p-3 ">
                </div>    
            </div>
            <div class=" relative m-0 bg-gray-dark py-4 w-48 text-center font-bold text-white">
                <button >Save Changes</button>
                <span v-if="loading" a class=" absolute left-20 top-3 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent  text-yellow-bright rounded-full" role="status" aria-label="loading"></span>

            </div>
        </form>
        <teleport to="body">
            <transition name="book">
                <div v-if="updated"
                    class=" top-28 right-4 text-white font-bold bg-gray-dark p-4 fixed ">
                    <p>Updated Succssefully</p>
                </div>
            </transition>
            <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error =false">
                Something Wrong Happened
            </BaseDialog>
        </teleport>  
    </div>
</template>