<script setup>
// graphql queris to fetch data
import getMovies from '@/graphql/movies/query/getMovies.gql'

import query from '@/composables/query.js'
import { useAuthStore } from '~/stores/modules/auth';
import mutation from "~/composables/mutation";
import unBookMovie from "~/graphql/bookings/unbook.gql"
const movies = ref([])
const bookings = ref([])
const authStore  = useAuthStore()

function newId(){
    return authStore.getUserId
}
function getUser(){
    return authStore.getUser
}
watch(getUser, (newVal, oldVal) => {
    console.log(newVal)
    if(!newVal) return
    newVal.bookings.forEach(book => {
    movies.value.push(book.movie)
    bookings.value.push(book.id)
    });
    
})


// fetch user data with movies

definePageMeta({
    layout: "userpanel",
});

const movieBooked = ref(false)
const deletedIndex = ref(0)

// unbooking
const {mutate, onDone, loading, onError } = mutation(unBookMovie, 'user');
const unbook = (index) => {
    deletedIndex.value = index
    console.log(bookings.value[index])
    mutate({id: bookings.value[index]})
}

onDone((result) => {
    console.log(result)
    movieBooked.value = true
    movies.value.splice(deletedIndex.value, 1)

    setTimeout(() => {
        movieBooked.value = false
    }, 5000);
    // location.reload()
    // if(result.data.insert_bookings_one){
    //     authStore.addBooking(result.data.insert_bookings_one)
    // }
});

onError((error) => {
    console.log(error)
    window.alert('Something went wrong')
});



</script>
<template> 
    <div class="app relative">
        <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <div class=" mb-6 mr-3" v-for="(movie, index) in movies" :key="movie.id">
                <img class=" block h-80 w-72"  :src="movie.image.url" :alt="movie.title">
                <div class=" flex flex-nowrap justify-between p-2 bg-gray-dark text-white">
                    <h1>{{ movie.title }}</h1>
                    <div class="relative">
                        <button @click="unbook(index)" class=" uppercase text-yellow-bright font-bold">Unbook</button>
                        <span v-if="loading && deletedIndex == index" a class=" absolute left-3 -top-1 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent  text-white rounded-full" role="status" aria-label="loading"></span>
                    </div>
                </div>
            </div>
        </div>
        <teleport to="body">
            <transition name="book">
                <div v-if="movieBooked"
                    book-enter-from=" -right-32" 
                    book-enter-active="right-4"

                    class=" top-28 right-4 text-white font-bold bg-gray-dark p-4 absolute ">
                    <p>Movie is Unbooked Successfull</p>
                </div>
            </transition>
        </teleport>

        
    </div>
</template>

<style scoped>
  
 
</style>