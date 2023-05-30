<script setup>
const props = defineProps({
    movie:{
        type: Object,
        required: true
    },
    index:{
        type: Number,
        required: true
    }
})  

const imgUrl = computed(()=>{
  return props.movie.image.url
})

const detailLink = computed(()=>{
    return '/movies/' + props.movie.id;
})

const date = computed(()=>{
    return new Date().toLocaleDateString()
})
const showGenere = ref(false)

</script>
<template>
    <div class=" " >
        <div @mouseenter="showGenere = true" @mouseleave="showGenere = false" class=" relative ">
            <div v-if="showGenere" class=" z-50 absolute top-40 left-24 text-xl font-bold text-white ">
                <p  v-for="movie_genere in movie.movies_generes" 
                        :key="movie_genere.genere.id">{{movie_genere.genere.name  }} 
                    </p>
                </div>
            <div class="movie-poster hover:opacity-20 ">
                <NuxtLink :to="detailLink">
                    <img class=" w-full h-full object-cover" :src="imgUrl" alt="Cover Image">
                </NuxtLink>
            </div>
            <div class="py-6 relative space-y-4">
                <div class=" flex justify-between">
                    <h5 class="title text-white font-bold"><NuxtLink :to="detailLink">{{props.movie.title}}</NuxtLink></h5>
                    <span class=" text-yellow-bright">{{ date }}</span>
                </div>
                <div >
                    <ul class="flex justify-between">
                        <li><span class="border-4 px-2 border-solid border-white text-yellow-bright">hd</span></li>
                        <li>
                            <span class="text-primary5"><i class="far fa-clock"></i>{{ props.movie.duration }}</span>
                            <span class=" text-primary5"><i class="fas fa-thumbs-up"></i> 3.5</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div> 
</template>
<style scoped>
.movie-poster{
    height: 380px;
}
</style>

