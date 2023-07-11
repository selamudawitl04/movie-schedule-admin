<script setup>

const props = defineProps({
    movie:{
        type: Object,
        required: true
    }
})

const detailLink = ((id)=>{
    return '/users/'+ id
})
const headers = ['Seat','FirstName', 'LastName','Email', 'Price', 'Issue Date']

const seats = ref([])

for(let index = 1; index <= 20; index++){

    if(props.movie.tickets.every(ticket =>{
        return ticket.seat_number != index
    })){
        seats.value.push(index)
    }
}
const date = (dateValue)=>{
    return new Date(dateValue).toLocaleString()
}

</script>
<template>

    <div>
        <!-- Header -->
        <div class="flex flex-row justify-between items-start -my-4 rounded-xl  bg-opacity-80 bg-gray-dark">
            <img class="block rounded-full cover h-40 w-40 p-2"  :src="movie.image.url" alt="movie image">
            <!-- Detail -->
            <div class="  p-3 space-y-3 text-white font-bold">
                <p>Title:<span class=" text-yellow-bright">{{ movie.title }}</span> </p>
                <p>Date: <span class=" text-yellow-bright">{{ date(movie.date) }}</span></p>
                <p>Rating: <span class=" text-yellow-bright">{{ movie.rating_average || 3.5 }}</span> </p>
                <p >Status: <span class=" lowercase text-yellow-bright">{{ movie.status }}</span> </p>
            </div>
        </div>

        <div>
            <h2 class=" text-2xl text-primary9 font-bold pt-12">Tickets</h2>
            <BaseTable :headers="headers">
                
                <tr v-for=" ticket in movie.tickets " :key="ticket.id" >
                    <td class=" text-primary9 font-bold">{{ ticket.seat_number }}</td>
                    <td class=" text-gray-dark cursor-pointer  pl-5  font-bold">
                       <NuxtLink :to="detailLink(ticket.user.id)"> {{ ticket.user.firstName }}</NuxtLink>
                    </td>
                    <td class=" text-primary9 font-bold">
                        <NuxtLink :to="detailLink(ticket.user.id)"> {{ ticket.user.lastName }}</NuxtLink>
    
                    </td>
                    <td @click="setSearch"  class=" text-gray-dark cursor-pointer  pl-5  font-bold">
                        <NuxtLink :to="detailLink(ticket.user.id)"> {{ ticket.user.email }}</NuxtLink>
                    
                    </td>
                    <td @click="setSearch"  class=" text-primary9 cursor-pointer  pl-5  font-bold">{{ticket.price}} birr</td>
                    <td @click="setSearch"  class=" text-gray-dark cursor-pointer  pl-5  font-bold">{{ date(ticket.date) }}</td>
                </tr>
                
            </BaseTable>

        </div>
        <!-- Available seats -->
        <div>
            <h2 class=" text-2xl text-primary9 font-bold pb-6 pt-12">Available Seats</h2>
            <div class=" flex space-x-4" >
                <p class=" px-3 text-white font-bold bg-gray-dark" v-for=" seat in seats" :key="seat">{{ seat }}</p>
            </div>

        </div>
    </div>
</template>
<style scoped>
td{
    padding: 1.5rem;
    text-align: left;
    border-bottom: 0.1px solid rgb(236, 234, 234);
}
</style>


