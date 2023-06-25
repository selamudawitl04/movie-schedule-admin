<script setup>
import { Form, Field } from 'vee-validate';
import resetPassword from '@/graphql/auth/resetPassword.gql'
import authentication from '@/composables/authentication'
import * as Yup from 'yup';
import { ref, watch} from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave} from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
const authToken = useCookie('auth-token',  { path: '/' }, { expires: 60 * 60 * 24 * 10 })
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
 
// vee-validate

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, "password must be greater than 6")
    .max(16, "password must be less than 16 letter"),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please Confirm Password'),
});

// reactive datas
const invalidCredential = ref(false);
const variables = ref({password: ""});
const someThingWrong = ref(false);

const {mutate, onDone, loading, onError } = authentication(resetPassword)
// on done the user data has to setted so on done setAuthData is called
onDone((result) => {
  authToken.value = 'Bearer '+ result.data.resetPassword.token
    if(result.data.resetPassword.role == 'admin'){
        authStore.setToken(authToken.value)
        router.push('/')   
    }else{
        router.push('/error')
    }
});

// on error the type of error is checked from error message
// if error messge includes the word Invalid then the error is the result of invalid data
// else the error come for diffirent reasons such internet connection, server erros and so on

onError((error) => {
    if(error.message.includes('Invalid')){
        invalidCredential.value = true
    }else{
        someThingWrong.value = true
    }
    console.log(error , "When Login")
});  

// function to handle mutate
function handleResetPassword() {
    console.log('is called')
    const resetInput ={
        data:{
            password: variables.value.password,
            token: route.params.token

        }
    }
    mutate(resetInput)
} 
// layout
definePageMeta({
  layout: "movies", 
});

// tommorow contact us, and notification, page send message to user movie detail page
 </script>
<template>
  <div class="register  ">
    <base-dialog :show="someThingWrong" @close="someThingWrong = false" title="Some thing Went Wrong"></base-dialog>
    <div id="detail-header-container" class="auth    bg-primary3 bg-no-repeat bg-cover bg-center relative py-12">
      <div class="back absolute opacity-75 inset-0 z-0" ></div>
       <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div class="flex justify-center self-center z-10">
          <div class="p-8 bg-white mx-auto w-96 rounded-3xl w-100">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-dark">Reset Password</h3>
              <p class="text-gray">Please provide new password.</p>
            </div>
            <!-- :validation-schema="schema" -->
            <Form @change="invalidCredential = false" class="space-y-5" @submit="handleResetPassword" :validation-schema="schema" v-slot="{ errors }">
            <div class="space-y-3">
             
             <!-- Password -->
             <div class="space-y-2 flex flex-col">
                 <label class=" text-sm font-medium text-gray-700 tracking-wide">
                    New Password *
                 </label>
                  <Field name="password"  v-model="variables.password" type="password" class="w-full text-base px-4 py-2 border border-gray rounded-lg    focus:border focus:border-yellow-bright focus:border-solid "  placeholder="New Password" :class="{ 'border-red': errors.password }" />
                  <transition name="error">
                     <span class="text-red text-sm" >{{errors.password}}</span>
                 </transition>
             </div>
             <div class="space-y-2 flex flex-col">
                 <label class=" text-sm font-medium text-gray-700 tracking-wide">
                     Confirm Password *
                 </label>
                  <Field name="confirm"   type="password" class="w-full text-base px-4 py-2 border border-gray rounded-lg    focus:border focus:border-yellow-bright focus:border-solid "  placeholder="Confirm Password" :class="{ 'border-red': errors.password }" />
                  <transition name="error">
                     <span class="text-red text-sm" >{{errors.confirm}}</span>
                 </transition>
             </div>
              
              <div class="" v-show="invalidCredential">
                <p class="text-red-700">Invalid token  </p>
              </div>
              <div  class="flex justify-center">
                <button  :disabled="loading" type="submit" :class="{'bg-yellow-orange':loading, 'hover:bg-orange-00':loading,}" class=" w-44 flex justify-center bg-yellow-bright  opacity-80 hover:opacity-100 text-white  p-3  rounded-full  tracking-wide font-semibold shadow-lg  cursor-pointer transition  ease-in duration-400 ">
                     Submit
                    <span v-if="loading" a class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                </button>
              </div>
            </div>
              </Form>
            <div class="mt-4">
              <p class="hover:text-orange-500 text-orange-400">
                <NuxtLink class=" text-primary9" to="/auth/login">Login</NuxtLink>
              </p>
            </div>
            <div class="pt-5 text-center text-gray-400 text-xs">
                <span>
                    Copyright © 2023
                    <a href="" rel="" target="_blank" title="Ajimon" class=" text-yellow-bright font-bold">SolFlx</a>
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</template>

<style>
#detail-header-container{
    background-image: url(../assets/img/movie_details_bg.jpg);
 }
@media (max-width: 660px) {
  .back {
    display: none;
    }
  }
 .auth{
    background-image:url("");
  }
</style>