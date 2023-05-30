<script setup>
import {useStore} from "~/stores/index"
const router = useRouter()
const store  = useStore()
// template for actors and directors of the movie
const props  = defineProps({
    director:{
        type: Object,
        required: true
    }
})

const fullName = computed(()=>{
    return props.director.first_name + ' ' + props.director.last_name
})

const imgUrl = computed(()=>{
  return props.director.image.url
})
function setDirectorSearch(){
    store.setDirectorSearch(fullName.value)
    router.push({
        path: '/',
        hash: '#movieslist'
    })

}
</script>
<template>
    <div class="row mx-3">
        <!-- Image Section -->
        <img @click="setDirectorSearch" class="w-full cursor-pointer md:w-72 h-72 object-cover" :src="imgUrl" alt="Director Image">
        <!-- card footer -->
        <div class=" flex justify-between my-4">
            <p class=" text-white font-bold">{{ fullName }}</p>
            <p class=" text-yellow-bright font-bold">Director</p>
        </div>
    </div>
</template>