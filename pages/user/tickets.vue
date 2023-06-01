<script setup>
// graphql queris to fetch data
import { useAuthStore } from '~/stores/modules/auth';
const tickets = ref([])
const authStore  = useAuthStore()
console.log('executed', authStore.getUser)

const setTickets = (movieTickets)=>{
    console.log(movieTickets, 'there is tickets')
    movieTickets.forEach(ticket => {
        tickets.value.push(ticket) 
    });
}
if(authStore.getUser){
    console.log(authStore.getUser.tickets, 'there is tickets')
    setTickets(authStore.getUser.tickets)
}
function getUser(){
    return authStore.getUser
}
watch(getUser, (newVal, oldVal) => {
    console.log(newVal.tickets)
    if(!newVal) return
    newVal.tickets.forEach(ticket => {
        tickets.value.push(ticket)
    });
    
})

// fetch user data with movies
definePageMeta({
    layout: "userpanel",
    // middleware: '[user]'
});

function getDate(date){
    return date.split('T')[0]
}

</script>
<template> 
   <TicketsList v-if="tickets.length > 0" :tickets="tickets"></TicketsList>
    <div v-else class=" border-t-4 border-t-yellow-bright items-center  flex px-6 w-full justify-between py-8 bg-gray-dark">
        <p class=" text-white">No ticket has been Buyed yet</p>
        <div class=" border border-yellow-bright rounded-full ">
            <NuxtLink class="p-2 text-white block" to="/">Browse Movies</NuxtLink>
        </div>
    </div>
</template>

