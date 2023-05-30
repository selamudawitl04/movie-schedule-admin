<script setup>

const name = useCookie('name')
definePageMeta({
  layout: "movies",
});
 import { Form, Field } from 'vee-validate';
import signupMutation from '@/graphql/auth/signup.gql'

 import * as Yup from 'yup';
 import { ref, watch} from 'vue'
 import { useRouter, useRoute, onBeforeRouteLeave} from 'vue-router'
 import { useAuthStore } from '@/stores/modules/auth'
const authToken = useCookie('auth-token',  { path: '/' }, { maxAge: 60 * 60 * 24 * 10 })

 const router = useRouter();
 const authStore = useAuthStore();
 const {setUser}  = authStore;

const schema = Yup.object().shape({
  fullName: Yup.string("must be letter").
      matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name ")
      .required('Full name is required'),
  email:Yup.string()
    .required('Email is required')
    .email("email is invalid "),
  password: Yup.string()
    .required('Password is required')
    .min(6, "password must be greater than 6")
    .max(16, "password must be less than 16 letter"),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please Confirm Password'),
});

// If there is a account with the same email before


const fullName = ref('')
const email = ref('')
const password = ref('')


const someThingWrong = ref(false);
const invalidCredential = ref(false);
let isloading = ref(false);

function handleSignUp(){
    const {mutate, onDone, loading, onError } = useMutation(
         signupMutation,
         () => ({
           fetchPolicy: "network-only"
         //   clientId: 'authClient'
         })
     );
     isloading = loading
     const variables = {
        data: {
            firstName: fullName.value.split(' ')[0],
            lastName: fullName.value.split(' ')[1],
            email: email.value,
            password: password.value
        }
     }
     mutate(variables)
     onDone((result) => {
         // check if result has value
         if (result && result.data) {
            console.log(result.data.login)
            // store token on cookie
             authToken.value = 'Bearer '+ result.data.login.token
             authStore.setToken(result.data.login.token)
             authStore.setId(result.data.login.id)
             authStore.setRole(result.data.login.role)
             if(result.data.login.role === 'admin'){
                router.push('/admin')
             }else{
                router.push('/user')
             }
         }
     });
     onError((error) => {

        if(error.message.includes('Invalid')){
            invalidCredential.value = true
        }else{
            someThingWrong.value = true
        }
        console.log(error.message , 66767)
        
     });  
}




</script>
<template>
  <div class="register pt-16">
    <base-dialog :show="someThingWrong" @close="someThingWrong = false" title="Some thing Went Wrong"></base-dialog>
    <div id="detail-header-container" class="auth    bg-primary3 bg-no-repeat bg-cover bg-center relative pt-12">
      <div class="back absolute opacity-75 inset-0 z-0" ></div>
       <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div class="flex justify-center self-center z-10">
          <div class="p-8 bg-white mx-auto w-96 rounded-3xl w-100">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-800">Sign up</h3>
              <p class="text-gray-500">Please fill the form to register.</p>
            </div>
            <!-- :validation-schema="schema" -->
            <Form @change="invalidCredential = false" class="space-y-5" @submit="handleSignUp" :validation-schema="schema" v-slot="{ errors }">
            <div class="space-y-3">
                <!-- Full Name -->
              <div class="space-y-1 flex flex-col">
                <label for="fullName"  class=" text-lg font-medium text-gray-700 tracking-wide"> Full Name </label>
                <Field name="fullName"  v-model="fullName" type="text" class="w-full text-base px-4 py-2 border border-gray rounded-lg  focus:border-yellow-bright "  placeholder="Your Full Name" :class="{ 'border-red': errors.fullName }" />
                 <transition name="error">
                    <span class="text-red text-sm" >{{errors.fullName}}</span>
                </transition>
              </div>
              <!-- Email -->
              <div class="space-y-2 flex flex-col">
                 <label class="text-sm font-medium text-gray-700 tracking-wide">Email *</label>
                  <Field name="email" v-model="email" type="email" class="w-full text-base px-4 py-2 border border-gray rounded-lg  focus:border-yellow-bright "  placeholder="Your email" :class="{ 'border-red': errors.email }" />
                  <transition name="error">
                     <span class="text-red text-sm" >{{errors.email}}</span>
                 </transition>
             </div>
             <!-- Password -->
             <div class="space-y-2 flex flex-col">
                 <label class=" text-sm font-medium text-gray-700 tracking-wide">
                     Password *
                 </label>
                  <Field name="password"  v-model="password" type="password" class="w-full text-base px-4 py-2 border border-gray rounded-lg    focus:border focus:border-yellow-bright focus:border-solid "  placeholder="Your Password" :class="{ 'border-red': errors.password }" />
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
                <p class="text-red-700">The email is already used  </p>
              </div>
              <div  class="flex justify-center">
                <button  :disabled="isloading" type="submit" :class="{'bg-yellow-orange':isloading, 'hover:bg-orange-00':isloading,}" class=" w-44 flex justify-center bg-yellow-bright  opacity-80 hover:opacity-100 text-white  p-3  rounded-full  tracking-wide font-semibold shadow-lg  cursor-pointer transition  ease-in duration-400 ">
                     Sign up
                    <span v-if="isloading" a class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                </button>
              </div>
            </div>
              </Form>
            <div class="mt-4">
              <p class="hover:text-orange-500 text-orange-400">
                <NuxtLink class=" text-primary9" to="/auth/signup">Have already an account</NuxtLink>
              </p>
            </div>
            <div class="pt-5 text-center text-gray-400 text-xs">
                <span>
                    Copyright © 2023
                    <a href="" rel="" target="_blank" title="Ajimon" class=" text-yellow-bright font-bold">SDflx</a>
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