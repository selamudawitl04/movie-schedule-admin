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
const setMovies = (movieBookings)=>{
    movieBookings.forEach(book => {
        movies.value.push(book.movie)
        bookings.value.push(book.id)
    });
}
// console.log('user id from book page', authStore.getUserId, authStore.getUser)
if(authStore.getUser){
    console.log('Yes user ')
    setMovies(authStore.getUser.bookings)
}

function newId(){
    return authStore.getUserId
}
function getUser(){
    return authStore.getUser
}
watch(getUser, (newVal, oldVal) => {
    console.log(newVal.bookings)
    if(!newVal) return
    newVal.bookings.forEach(book => {
    movies.value.push(book.movie)
    bookings.value.push(book.id)
    });
})


// fetch user data with movies
definePageMeta({
    layout: "userpanel",
    // middleware: '[user]'
});

const movieBooked = ref(false)
const deletedIndex = ref(0)
// unbooking
const {mutate, onDone, loading, onError } = mutation(unBookMovie, 'user');

provide('unbook', (index) => {
    deletedIndex.value = index
    mutate({id: bookings.value[index]})
})

onDone((result) => {
    movieBooked.value = true
    movies.value.splice(deletedIndex.value, 1)
    setTimeout(() => {
        movieBooked.value = false
    }, 5000);
   
});

onError((error) => {
    console.log(error)
    window.alert('Something went wrong')
});

</script>
<template> 
    <div v-if="movies.length > 0" class="app relative">
        <BookingList :movies="movies"></BookingList>
        <teleport to="body">
            <transition name="book">
                <div v-if="movieBooked"
                    class=" top-28 right-4 text-white font-bold bg-gray-dark p-4 fixed ">
                    <p>Movie is Unbooked Successfull</p>
                </div>
            </transition>
        </teleport>  
    </div>
    <div v-else class=" border-t-4 border-t-yellow-bright items-center  flex px-6 w-full justify-between py-8 bg-gray-dark">
        <p class=" text-white">No Movie has been Booked yet</p>
        <div class=" border border-yellow-bright rounded-full ">
            <NuxtLink class="p-2 text-white block" to="/">Browse Movies</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
  
 
</style>