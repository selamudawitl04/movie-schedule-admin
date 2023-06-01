<script setup>
console.log('Heello')
const props = defineProps({
    tickets: {
        type: Array,
        required: true
    }
})

const availableSeats = ref([])

props.tickets.forEach((ticket) => {
    availableSeats.value.push(ticket.seat_number)
})

console.log( 'availableSeats', props.tickets)


const seats = ref([])
for(let index = 1; index <=20; index++){
    seats.value.push(index)
}

// delete already booked seats

seats.value = seats.value.filter((seat) => {
    return !props.tickets.includes(seat)
})


// delete from movies where id
const selectedSeat = ref()
const emit = defineEmits(['buy-ticket', 'close-form'])
const loading = ref(false)
const handelBuyTicket = () => {
    loading.value = true
    emit('buy-ticket', selectedSeat.value)
}

function closeForm(){
    emit('close-form')
}
// what are steps to buy ticket
</script>


<template>
    <teleport to="body">
    <div class=" fixed top-32  inset-x-5 z-50 ">
        <div class=" relative p-4 ticket mx-auto  bg-white"> 
            <div  @click="closeForm" class="  absolute right-0 px-6 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    class="text-red cursor-pointer"
                    viewBox="0 0 1024 1024"
                >
                    <path
                    fill="currentColor"
                    d="m563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8L295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512L196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1l216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                    />
                </svg>
            
            </div>

        <form @submit.prevent="handelBuyTicket" action="">
            <h1 class="py-4 text-center text-xl font-bold text-primary9">Purchase Ticket</h1>
            <!-- seat controller -->
            <div class=" text-primary9 w-full">
                <label for="">Sit Number</label>
                <select required v-model="selectedSeat" name="seat" class="w-full border border-gray p-3" id="">
                    <option v-for="seat in seats" :key="seat" :value="seat">{{seat}}</option>
                </select>
            </div>
            <!-- price and code number -->
            <div class="flex ">
                <!-- price -->
                <div class=" mr-2 w-full text-primary9">
                    <label for="last_name">Price<span class=" text-red font-bold  text-lg">*</span></label>
                    <input readonly value="150 birr" type="text" id="price" class="w-full border border-gray p-3 ">
                </div>
                <!-- code -->
                <div class=" ml-2 w-full text-primary9">
                    <label for="last_name">Code Number<span class=" text-red font-bold  text-lg">*</span></label>
                    <input  type="password" required id="code" class="w-full border border-gray p-3 ">
                </div>
            </div>
            <div class=" text-center ">
                <button class="w-full relative bg-yellow-bright p-3 mt-6 text-white font-bold ">Buy 
                <span v-if="loading"  class="z-50 left-56  absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent  text-white font-bold rounded-full" role="status" aria-label="loading"></span>

                </button>
            </div>
        </form>
    </div>

        <!-- 1.Ticket dropdwon
        1.Card Number
        Price Display
    Buy -->
    </div>
    </teleport>
</template>

<style scoped>

.ticket{
    width: 500px;
}
@media (max-width: 768px) {
    .ticket{
        width: 100%;
    }
}

</style>
