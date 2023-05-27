<!-- Movie List -->
<script setup>

const props = defineProps({
    movies:{
        type: Array,
        required: true
    }
})  
</script>
<template>
    <div class=" grid grid-cols-1 justify-center md:grid gap-6   md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <MoviesItem  v-for="(movie, index) in movies " :key="movie.id" :index="index" :movie="movie"/>
    </div>
</template>

  