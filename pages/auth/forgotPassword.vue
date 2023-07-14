<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import forgotPasswordMutation from '@/graphql/auth/forgotPassword.gql'
import authentication from '@/composables/authentication'
import { useRouter, useRoute, onBeforeRouteLeave} from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
const authToken = useCookie('auth-token',  { path: '/' }, { expires: 60 * 60 * 24 * 10 })
const router = useRouter();
const authStore = useAuthStore();
 
// vee-validate
const schema = Yup.object().shape({
    email: Yup.string()
    .required('Email is required')
    .email("email is invalid "),
});

// reactive datas
const invalidCredential = ref(false);
const variables = ref({email: ""});
const someThingWrong = ref(false);
const showEmailSentMessage = ref(false)
const {mutate, onDone, loading, onError } = authentication(forgotPasswordMutation)
// on done the user data has to setted so on done setAuthData is called
onDone((result) => {
    showEmailSentMessage.value = true
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
function handleForgotPassword() {
    const forgotInput ={
        data:{
            email: variables.value.email
        }
    }
    mutate(forgotInput)
} 
// layout
definePageMeta({
  layout: "movies", 
});

 </script>
 <template>
 <div class="login ">
     <base-dialog :show="someThingWrong" @close="someThingWrong = false" title="Some thing Went Wrong"></base-dialog>
     <div id="detail-header-container" class="auth    bg-primary3 bg-no-repeat bg-cover bg-center relative pt-6" style="">
      <div class="back absolute bg-gradient-to-l from-orange-600 to-orange-400 opacity-75 inset-0 z-1"></div>
         <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
            
             <div class="flex justify-center self-center  z-10">
                 <div class="p-6 mx-auto bg-white  rounded-3xl w-96">
                     <div class="mb-4">
                         <h3 class="font-semibold text-2xl text-gray-800">Forgot  Password</h3>
                         <p class="text-gray-500">Please Enter Your Email</p>
                     </div>
                     <div class="space-y-5">
                         <Form @change="invalidCredential = false" class="space-y-5 w-full" @submit="handleForgotPassword" :validation-schema="schema" v-slot="{ errors }">
                         <div class="space-y-2 flex flex-col">
                             <label class="text-sm font-medium text-gray-700 tracking-wide">Email *</label>
                              <Field name="email"  v-model="variables.email" type="email" class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg  focus:border-yellow-bright "  placeholder="Your email" :class="{ 'border-red': errors.email }" />
                              <transition name="error">
                                 <span class="text-red text-sm" >{{errors.email}}</span>
                             </transition>
                         </div>
                         <div  class=" text-red" v-show="invalidCredential">
                             <transition name="error">
                                 <p class=" text-red">There is no user with this email</p>
                             </transition>
                         </div>
                         <div  class=" text-red" v-show="showEmailSentMessage">
                             <transition name="error">
                                <p  class=" w-full text-green">We have sent email verify  link to this email </p>
                             </transition>
                         </div>
                         <div class="flex justify-center">
                         <button  :disabled="loading" type="submit" :class="{'bg-yellow-orange':loading, 'hover:bg-orange-00':loading,}" class=" w-44 flex justify-center bg-yellow-bright  opacity-80 hover:opacity-100 text-white  p-3  rounded-full  tracking-wide font-semibold shadow-lg  cursor-pointer transition  ease-in duration-400 ">
                             Reset
                            <span v-if="loading" a class=" absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                         </button>
                         </div>
                     </Form>
                     </div>
                     <div class="mt-4">
                         <p class="hover:text-yellow-bright text-yellow-bright">
                             <router-link to="/auth/signup">Register Now </router-link>
                         </p>
                     </div>
                     <div class="pt-5 text-center text-gray-400 text-xs">
                         <span>
                             Copyright © 2023
                         <a href="" rel="" target="_blank" title="Ajimon" class=" text-yellow-bright font-bold">SoLFlx</a></span>
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
    background-image: url(@/assets/img/movie_details_bg.jpg);
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
 