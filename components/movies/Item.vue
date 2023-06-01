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

const rating = computed(()=>{
    console.log(props.movie.title, props.movie.ratings_aggregate.aggregate.avg.rating)
    if(props.movie.ratings_aggregate.aggregate.avg.rating == null){
        return 3.5
    }
    return props.movie.ratings_aggregate.aggregate.avg.rating 
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
                        <li class=" ">
                            
                            <span class="text-primary5">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    width="20"
                                    height="20"
                                    class="text-yellow-bright cursor-pointer inline"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12.5 12.8L7.7 15.6L7 14.2L11 11.9V7H12.5V12.8Z"
                                    />
                                </svg>
                                {{ props.movie.duration }} min
                            </span>
                            <span class=" text-primary5">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    width="20"
                                    height="20"
                                    class="text-yellow-bright cursor-pointer inline"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                    />
                                </svg>
                                {{ rating }}</span>
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

