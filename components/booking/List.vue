<script setup>

const props = defineProps({
    movies: {
        type: Array,
        required: true
    }
})
</script>
<template> 
    <div v-if="movies.length > 0" class="app relative">
        <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
           <BookingItem v-for="(movie, index) in movies" :key="movie.id" :index="index" :movie="movie"></BookingItem>
        </div>
       
    </div>
</template>

