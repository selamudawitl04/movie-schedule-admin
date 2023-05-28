<script setup>
const router = useRouter()
const generes = reactive([])

import getActors from '@/graphql/actors/query/getActors.gql'

import getGeneres from '@/graphql/generes/getGeneres.gql'
//1. load directors
const { onResult, loading, onError, refetch } = useQuery(getGeneres, {
    fetchPolicy: 'network-only'
})
onResult((result)=>{
    result.data.generes.forEach((genere)=>{
        generes.push(genere)
    })
})
onError((error)=>{
    console.log(error, 'error from getGeneres')
    router.push('/error')
})


const displayGenere = ref(false)
const selectedGeneres = ref([])
const currentGenere = ref()

//  set genere to movies
 const setGenere = ()=>{
    if(selectedGeneres.value.every(selectedGenere=> selectedGenere.id != currentGenere.value) ){
        const index = generes.find( genere => genere.id == currentGenere.value)
        selectedGeneres.value.unshift(index)
    }
 }
</script>


<template>
    <!-- Genere -->
    <div class="flex justify-between space-x-10">
       <div class=" text-primary9">
           <p class=" text-primary9 font-bold">Generes</p>
           <p v-for=" genere in selectedGeneres" :key="genere.id">
            {{ genere.name }}
           </p>
       </div>
   
       <div class=" flex flex-col space-y-4">
           <select @change="setGenere"  v-model="currentGenere"  class=" border p-1 text-primary9" v-if="displayGenere"  name="genere" id="genere">
               <option class=" text-primary9" v-for=" genere in generes" :key="genere.id"  :value="genere.id">
                   {{ genere.name }}
               </option>
           </select>
           <button type="button" @click="displayGenere = true" class=" rounded-full  bg-gray-dark py-1 px-2 text-white ">Add Genere</button>
       </div>    
   </div> 
    
</template>