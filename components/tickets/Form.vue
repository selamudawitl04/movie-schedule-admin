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



const seats = ref([])
for(let index = 1; index <=20; index++){
    seats.value.push(index)
}

// delete already booked seats

seats.value = seats.value.filter((seat) => {
    return !availableSeats.value.includes(seat)
})





// delete from movies where id
const selectedSeat = ref()
const emit = defineEmits(['buy-ticket'])

const handelBuyTicket = () => {
    emit('buy-ticket', selectedSeat.value)
}
// what are steps to buy ticket
</script>


<template>
    <teleport to="body">
    <div class=" fixed top-32  inset-x-5 z-50 ">
        <div class=" p-4 ticket mx-auto  bg-white"> 

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
                <button class="w-full bg-yellow-bright p-3 mt-6 text-white font-bold ">Buy</button>
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
