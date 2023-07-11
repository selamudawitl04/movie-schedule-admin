<script setup>
import { Form, Field } from 'vee-validate';
import loginMutation from '@/graphql/auth/login.gql'
import authentication from '@/composables/authentication'
import * as Yup from 'yup';
import { ref, watch} from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave} from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
const authToken = useCookie('auth-token',  { path: '/' }, { expires: 60 * 60 * 24 * 10 })
const router = useRouter();
const authStore = useAuthStore();
 
// vee-validate
const schema = Yup.object().shape({
    email: Yup.string()
    .required('email is required')
    .email("email is invalid "),
    password: Yup.string().required('Password is required')
});

// reactive datas
const invalidCredential = ref(false);
const variables = ref({email: "",password: ""});
const someThingWrong = ref(false);

const {mutate, onDone, loading, onError } = authentication(loginMutation)
// on done the user data has to setted so on done setAuthData is called
onDone((result) => {
    authToken.value = 'Bearer '+ result.data.login.token
    if(result.data.login.role == 'admin'){
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
function handleLogin() {
    console.log(variables, 'from login')
    mutate({data: {...variables.value}})

} 
// layout
definePageMeta({
  layout: "movies", 
});
 </script>
 <template>
 <div class="login ">
     <base-dialog :show="someThingWrong" @close="someThingWrong = false" title="Some thing Went Wrong"></base-dialog>
     <div id="detail-header-container" class="auth    bg-primary3 bg-no-repeat bg-cover bg-center relative pt-12" style="">
      <div class="back absolute bg-gradient-to-l from-orange-600 to-orange-400 opacity-75 inset-0 z-1"></div>
         <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
             <div class="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
                 <div class="self-start hidden lg:flex flex-col text-white">
                     <img src="" class="mb-3" />
                     <h1 class="mb-3 font-bold text-5xl">Hi 👋 Welcome <span class="text-yellow-bright">Admin</span> </h1>
                     <p class="pr-3"></p>
                 </div>
             </div>
             <div class="flex justify-center self-center  z-10">
                 <div class="p-12 bg-white mx-auto rounded-3xl w-100">
                     <div class="mb-4">
                         <h3 class="font-semibold text-2xl text-gray-800">Sign In</h3>
                         <p class="text-gray-500">Please sign in to your account.</p>
                     </div>
                     <div class="space-y-5">
                         <Form @change="invalidCredential = false" class="space-y-5" @submit="handleLogin" :validation-schema="schema" v-slot="{ errors }">
                         <div class="space-y-2 flex flex-col">
                             <label class="text-sm font-medium text-gray-700 tracking-wide">Email *</label>
                              <Field name="email"  v-model="variables.email" type="email" class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg  focus:border-yellow-bright "  placeholder="Your email" :class="{ 'border-red': errors.email }" />
                              <transition name="error">
                                 <span class="text-red-600 text-sm" >{{errors.email}}</span>
                             </transition>
                         </div>
                         <div class="space-y-2 flex flex-col">
                             <label class=" text-sm font-medium text-gray-700 tracking-wide">
                                 Password *
                             </label>
                              <Field name="password"  v-model="variables.password" type="password" class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg    focus:border focus:border-yellow-bright focus:border-solid "  placeholder="Your password" :class="{ 'border-red': errors.password }" />
                              <transition name="error">
                                 <span class="text-red text-sm" >{{errors.password}}</span>
                             </transition>
                         </div>
                        
                         <div  class=" text-red" v-show="invalidCredential">
                             <transition name="error">
                                 <p class=" text-r">Invalid Email or Password</p>
                             </transition>
                         </div>
                         <div class="flex items-center justify-between space-x-7">
                             <div class="flex items-center">
                                 <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-blue-5 focus:ring-blue-400 border-gray-300 rounded " />
                                 <label for="remember_me" class="ml-2 block text-sm text-gray-800">
                                     Remember me
                                 </label>
                             </div>
                             <div class="text-sm">
                                 <NuxtLink to="/auth/forgotPassword" href="#" class="text-orange-400 hover:text-orange-600">
                                     Forgot your password?
                                 </NuxtLink >
                             </div>
                         </div>
                         <div class="flex justify-center">
                         <button  :disabled="loading" type="submit" :class="{'bg-yellow-orange':loading, 'hover:bg-orange-00':loading,}" class=" w-44 flex justify-center bg-yellow-bright  opacity-80 hover:opacity-100 text-white  p-3  rounded-full  tracking-wide font-semibold shadow-lg  cursor-pointer transition  ease-in duration-400 ">
                             Sign in
                            <span v-if="loading" a class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                         </button>
                         </div>
                     </Form>
                     </div>
                
                     <div class="pt-5 text-center text-gray-400 text-xs">
                         <span>
                             Copyright © 2023
                         <a href="" rel="" target="_blank" title="Ajimon" class=" text-yellow-bright font-bold">SDflx</a></span>
                     </div>
                 </div>
             </div>
         </div>
 
     </div>
     <router-view />
 </div>
 </template>
 
 <style scoped>
 @media (max-width:660px) {
     .back {
        display: none;
    }
 }
 
 .auth {
     background-image: url("");
 
 }
 #detail-header-container{
    background-image: url(../assets/img/movie_details_bg.jpg);
 }
 
 .error-enter-from{
     opacity: 0;
     transform: translateY(-30px);
 }
 .error-enter-active{
     transition: all 5s ease-in;   
 }
 
 .error-enter-to, .error-leave-from{
     opacity: 1;
     transform: translateY(0px);
     background-color: blue;
 }
 .error-leave-to{
     opacity: 0;
 
     transform: translateY(30px);
 }
 .error-leave-active{
     transition: all 0.3s ease-in;   
 }
 
 
 </style>
 