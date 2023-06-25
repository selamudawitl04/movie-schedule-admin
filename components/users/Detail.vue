<script setup>
import { boolean } from "yup"


const props = defineProps({
    user:{
        type: Object,
        required: true
    },
    messageSent:{
        type: Boolean,
        required: true
    },
    loading:{
        type: Boolean,
        required: true
    }
})



// const time = computed((dateValue) => {
//     return 
    
// })

const date = (dateValue)=>{
    return new Date(dateValue).toLocaleString()
}

const movieLink = ((id)=>{
    return '/movies/'+id
})


const placeholder = computed(()=>{
    return 'write message to '+ props.user.firstName + ' ' + props.user.lastName
})

const headers = ['Title','Date', 'Duration', 'Issue Date',  'Seat', 'Price', ]

const message = ref('')
const emit = defineEmits(['send-message'])
const handleSendMessage = ()=>{
    emit('send-message',  message.value)
}

</script>
<template>

    <div>
        <!-- Header -->
        <div class="flex flex-row justify-between items-start -my-4 rounded-xl  bg-opacity-80 bg-gray-dark">
            <img class="block rounded-full cover h-40 w-40 p-2"  src="@/assets/img/default-avatar.png" alt="user image">
            <!-- Detail -->
            <div class="  p-3 space-y-3 text-white font-bold">
                <p>First Name: <span class=" text-yellow-bright">{{ user.firstName }}</span></p>
                <p>Last Name: <span class=" text-yellow-bright">{{user.lastName}}</span> </p>
                <p>Email: <span class=" text-yellow-bright">{{user.email}}</span>  </p>
                <p >Status: <span class=" text-yellow-bright">active</span> </p>
            </div>
        </div>

        <div>
            <h2 class=" text-2xl text-primary9 font-bold pt-12">Tickets</h2>
            <BaseTable :headers="headers">  
                <tr v-for=" ticket in user.tickets " :key="ticket.id" >
                    <td class=" text-primary9 font-bold">
                        <NuxtLink :to="movieLink(ticket.movie.id)">
                            {{ ticket?.movie?.title }}
                        </NuxtLink>
                    </td>
                    <td class=" text-gray-dark   pl-5  font-bold">{{date(ticket?.movie.date)  }}</td>
                    <td class="text-gray-dark  font-bold">{{ ticket.movie.duration }}</td>
                    <td @click="setSearch"  class=" text-primary9   pl-5  font-bold">{{date(ticket.date)}}</td>
                    <td @click="setSearch"  class=" text-gray-dark   pl-5  font-bold">{{ticket.seat_number}}</td>
                    <td @click="setSearch"  class=" text-primary9   pl-5  font-bold">{{ticket.price}}</td>
                </tr>
                
            </BaseTable>

        </div>
        <div>
            <div class=" flex justify-between items-center pt-12">
                <h2 class=" text-2xl text-primary9 font-bold">Contact {{ user.firstName + ' ' + user.lastName }}</h2>
                <h2 v-show="messageSent" class=" bg-gray-dark text-white font-bold p-2">Message has been sent</h2>
            </div>
            <form @submit.prevent="handleSendMessage" action="">
                <div class="flex flex-row justify-between items-start my-8 p-6 rounded-xl   bg-gray-dark">
                    <input v-model="message" required class="p-3  text-primary9 focus:bg-white bg-primary6  rounded-md w-5/6" :placeholder="placeholder " type="text">
                    <!-- Detail -->
                    <div class=" relative rounded-md text-white font-bold border-2 border-yellow-bright  hover:bg-yellow-bright  p-3 ">
                        <!-- <span v-show="loading" a class=" absolute left-12  top-2.5 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent  text-yellow-bright rounded-full" role="status" aria-label="loading"></span> -->
                        <button>Send message</button>
                    </div>
                </div>
            </form>
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


