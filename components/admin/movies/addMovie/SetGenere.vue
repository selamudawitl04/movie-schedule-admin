<script setup>
const router = useRouter()
const actors = reactive([])

import setActorList  from '~/composables/getActorsOrDirectors.js'
import getActors from '@/graphql/actors/query/getActors.gql'
//1. load directors
const { onResult, loading, onError, refetch } = setActorList(getActors)
onResult((result)=>{
    result.data.actors.forEach((actor)=>{
        actors.push(actor)
    })
})
onError((error)=>{
    console.log(error, 'error')
    router.push('/error')
})


const setActor = inject('setActors')


// 2. display actors according to search value in each key stroke
const displayedActors = ref([])
const setDisplayedActors = (event)=>{
    const search = event.target.value
    if(search =='') return
    displayedActors.value = actors.filter(actor=>{
        return actor.first_name.toLowerCase().includes(search.toLowerCase()) || actor.last_name.toLowerCase().includes(search.toLowerCase())
    })
}

// display search result actors
const showActorsList = ref(false)
const showActors = ()=>{
    showActorsList.value = true
    displayedActors.value = []
}

// set actors to movie
const selectedActors = ref([])
const setActorToMovie = (actor)=>{
    if(!selectedActors.value.some(selectedActor => selectedActor.id == actor.id)){
        selectedActors.value.unshift(actor)
        showActorsList.value = false
        setActor(selectedActors.value)

    }
}

const unselectActor = (actor)=>{  
    selectedActors.value = selectedActors.value.filter(selectedActor=> selectedActor.id != actor.id)
    setActor(selectedActors.value)
}

</script>

<template>
    <div class="flex justify-between">
        <div class=" text-primary9">
            <p class=" text-primary9 font-bold">Actors</p>
            <div class="  my-2 flex flex-nowrap items-center justify-between space-x-2" v-for=" actor  in selectedActors" :key="actor">
                <p class=" w-full text-left border rounded-md px-2" >
                    {{ actor.first_name + ' ' + actor.last_name }}
                </p>
                <img @click="unselectActor(actor)" class="w-7 cursor-pointer" src="@/assets/img/cancel-close-delete-svgrepo-com.svg" alt="">
            </div>
        </div>
        <div  class=" flex flex-col text-left space-y-1">
            <input class=" border px-3 text-primary9 border-primary9" v-if="showActorsList"  @input="setDisplayedActors" placeholder="Actor Name" type="text">
            <div class="" v-if="showActorsList">
                <p   v-for=" actor in displayedActors" :key="actor.id" @click="setActorToMovie(actor)" class=" hover:bg-gray-dark cursor-pointer hover:text-white text-primary9" >
                    {{ actor.first_name + ' ' + actor.last_name }}
                </p>
            </div>
            <button type="button" @click="showActors" class="  bg-gray-dark p-1 px-3 text-white  rounded-full">Add Actor</button>
        </div>    
    </div>
</template>
<script setup>
import { useGenereStore } from "~/stores/modules/generes";
const genereStore = useGenereStore()

//1. load actors, geners and directors
genereStore.loadGeneres

//fetch directors, actors and generes date 
const generes = genereStore.getGeneres

//  2. Display Genere

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
            {{ genere.genere }}
           </p>
       </div>
   
       <div class=" flex flex-col space-y-4">
           <select @change="setGenere"  v-model="currentGenere"  class=" border p-1 text-primary9" v-if="displayGenere"  name="genere" id="genere">
               <option class=" text-primary9" v-for=" genere in generes" :key="genere.id"  :value="genere.id">
                   {{ genere.genere }}
               </option>
           </select>
           <button type="button" @click="displayGenere = true" class=" rounded-full  bg-gray-dark py-1 px-2 text-white ">Add Genere</button>
       </div>    
   </div> 
    
</template>