<script setup>
import { useActorStore } from "~/stores/modules/actors";
const actorStore = useActorStore()
//1. load actors 
actorStore.loadActors
//fetch  actors a date 
const actors = actorStore.getActors

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
            <div class=" my-2 flex flex-nowrap items-center justify-between space-x-2" v-for=" actor  in selectedActors" :key="actor">
                <p class=" w-full text-left border rounded-md px-2" >
                    {{ actor.first_name + ' ' + actor.last_name }}
                </p>
                <img @click="unselectActor(actor)" class="w-7 cursor-pointer" src="../../assets/img/cancel-close-delete-svgrepo-com.svg" alt="">
            </div>
        </div>
        <div  class=" flex flex-col text-left space-y-4">
            <input class=" border px-3 text-primary9 border-primary9" v-if="showActorsList"  @input="setDisplayedActors" placeholder="Actor Name" type="text">
            <div v-if="showActorsList">
                <p   v-for=" actor in displayedActors" :key="actor.id" @click="setActorToMovie(actor)" class=" hover:bg-gray-dark cursor-pointer hover:text-white text-primary9" >
                    {{ actor.first_name + ' ' + actor.last_name }}
                </p>
            </div>
            <button type="button" @click="showActors" class="  bg-gray-dark p-1 px-3 text-white  rounded-full">Add Actor</button>
        </div>    
    </div>
</template>