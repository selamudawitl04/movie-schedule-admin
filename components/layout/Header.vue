<script setup>
import { useAuthStore } from "~/stores/modules/auth";
import {useStore} from "~/stores/index"
const router = useRouter()
const route = useRoute()



const authStore = useAuthStore()
const generes = reactive([]);
import getGeneres from "@/graphql/generes/getGeneres.gql";
//1. load generes
let { onResult, loading, onError, refetch } = query(getGeneres, {})
onResult((result) => {
  result.data.generes.forEach((genere) => {
    generes.push(genere);
  });
});
onError((error) => {
  console.log(error, "error from getGeneres");
  router.push("/error");
});

const store  = useStore()

function searchByKey(event){
  store.setKeySearch(event.target.value)
}

 function gotoMovieList() {
  router.push({
    path: '/',
    hash: '#movieslist'
  })
}

const profileImage = computed(() => {
  return authStore.getUser?.image?.url
})

const link = computed(()=>{
  console.log('role', authStore.getRole)
  return '/'+authStore.getRole
})

const displayGenere = ref(false)
const smallScreenGenere = ref(false)


function filterMovieByGenere(genere){
  smallScreenGenere.value = false
  store.setFilterByGenere(genere)
  router.push({
    path: '/',
    hash: '#movieslist'
  })
}
const logout = () => {
    authStore.logout()
    router.push('/')
}
const displayLinks = ref(false)

</script>

<template>
  <div class="relative">
    <header class="px-4 z-50  bg-primary1 fixed top-0 left-0 right-0">
      <nav class="flex  relative justify-between container mx-auto  items-center py-6">
        <div class="left"  >
          <NuxtLink to="/" class="">
            <img class="" src="../../assets/img/logo.png" alt="">
            
          </NuxtLink>
          <!-- <img src="../../assets/search.jpg" alt="search icon"> -->
        </div>
        <ul class=" hidden    lg:flex space-x-6 ">
          <li >
            <NuxtLink active-class=" text-yellow-bright" class=" text-white font-bold   " to="/">HOME</NuxtLink>
          </li>
          <li @mouseenter=" displayGenere = true"    class=" hover:text-yellow-bright text-white font-bold">
            <NuxtLink to="/">GENERE</NuxtLink>
          </li>
          <li  class=" text-white font-bold">
            <NuxtLink to="/">CONTACTS</NuxtLink>
          </li>
        </ul>
        <!-- for search bar -->
        <div class="hidden search-input-and-icon md:block">
            <input @input="searchByKey" @focus="gotoMovieList" placeholder="any keyword" class="py-3 px-12  bg-gray-dark focus:bg-white    rounded-full">
        </div>
        <div v-if="authStore.isLoggedIn" class="w-12 hidden lg:block h-12 border-4 border-yellow-bright rounded-full overflow-hidden">
          <NuxtLink   :to="link">
            <img :src="profileImage" class="object-cover"   alt="">
            </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink class="hidden lg:block text-white uppercase bg-primary2 font-bold rounded-full border-4 border-solid border-yellow-bright py-2 px-8 hover:bg-yellow-bright hover:text-gray-dark"  to="/auth/login">SIGN IN</NuxtLink>
        </div>
        <div @mouseenter=" displayLinks = true" class="flex flex-col space-y-2 lg:hidden">
          <span class="w-8 bg-white h-1"></span>
          <span class="w-8 bg-white h-1"></span>
          <span class="w-8 bg-white h-1"></span>
        </div>
        <div @mouseleave="displayLinks = false" v-if="displayLinks" class=" lg:hidden bg-gray-dark -right-6 absolute  z-0 top-24  px-4 ">
          <div>
            <p class=" text-left uppercase my-2  text-white font-bold hover:text-yellow-bright">
            <NuxtLink active-class=" text-yellow-bright" class=" hover:text-yellow-bright text-white font-bold   " to="/">HOME</NuxtLink>
            </p>
            <p class=" text-left uppercase my-2  text-white font-bold hover:text-yellow-bright">
            <button @click="smallScreenGenere = true"  class="uppercase hover:text-yellow-bright text-white font-bold   " to="/">Genere</button>
            </p>
            <p class=" text-left uppercase my-2  text-white font-bold hover:text-yellow-bright">
            <NuxtLink active-class=" text-yellow-bright" class=" hover:text-yellow-bright text-white font-bold " to="/user">Profile</NuxtLink>
            </p>
            <p class=" text-left uppercase my-2  text-white font-bold hover:text-yellow-bright">
            <NuxtLink active-class=" text-yellow-bright" class=" hover:text-yellow-bright text-white font-bold   " to="/user">Pricing</NuxtLink>
            </p>
            <p class=" text-left uppercase my-2  text-white font-bold hover:text-yellow-bright">
            <NuxtLink active-class=" text-yellow-bright" class=" hover:text-yellow-bright text-white font-bold   " to="/user">About</NuxtLink>
            </p>
            <p class=" text-left uppercase my-2  text-white font-bold hover:text-yellow-bright">
            <NuxtLink active-class=" text-yellow-bright" class=" hover:text-yellow-bright text-white font-bold   " to="/user">Contact</NuxtLink>
            </p>
          </div>
        </div>
  

      </nav>
      <div @mouseleave="displayGenere = false"
        v-if="displayGenere && route.path== '/' && !loading && generes" 
        class=" absolute left-96 top-16 w-80  z-50  bg-gray-dark rounded-xl">
        <div class="flex flex-row flex-wrap justify-start p-2">
          <p v-for=" genere in generes " :key="genere.id"
            @click="filterMovieByGenere(genere.name)" 
            class="font-bold hover:border-primary6       border border-gray-dark hover:bg-primary7 hover:text-yellow-bright rounded-md my-1 mr-3  text-primary5 px-1 cursor-pointer">
            {{ genere.name }}
          </p>
      </div>
    </div>
    </header>

    <div>

    </div>

    <!-- At medium small and meduim size -->
    <BasePopup>
      <div v-if="smallScreenGenere && !loading" 
        class="  bg-gray-dark rounded-xl">
        <div   class="w-72 grid grid-cols-2 p-2">
          <p v-for=" genere in generes " :key="genere.id"
            @click="filterMovieByGenere(genere.name)" 
            class="font-bold hover:border-primary6       border border-gray-dark hover:bg-primary7 hover:text-yellow-bright rounded-md my-1 mr-3  text-primary5 px-1 cursor-pointer">
            {{ genere.name }}
          </p>
      </div>
    </div>
    </BasePopup>
   
  </div>
  </template>
  
  <script setup>
  
  </script>
  
  
  