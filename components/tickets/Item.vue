<script setup>

const props = defineProps({
    ticket: {
        type: Object,
        required: true
    }
})

function getDate(date){
    return date.split('T')[0]
}
</script>

<template>
    <div class="  flex justify-center  items-start mb-6 mr-3" >
        <NuxtLink  class=" block" :to="`/movies/${ticket.movie.id}`">
            <img class=" block h-40 w-40 cover"  :src="ticket.movie.image.url" :alt="ticket.movie.title">
        </NuxtLink>
        <div class=" w-60  " >
            <div class=" py-5 px-2 bg-gray-dark text-white">
                <h1 class=" ">Title: {{ ticket.movie.title }}</h1>
                <h1 class=" ">Price: {{ ticket.price }}</h1>
                <h1 class=" ">Issue Date: {{getDate(ticket.date)}}</h1>
                <h1 class=" ">Movie Date: {{ getDate(ticket.movie.date) }}</h1>
                <h1 class=" ">Seat: {{ ticket.seat_number }}</h1>
            </div>
        </div>
    </div>
</template>