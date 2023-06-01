<script setup>
const props = defineProps({
    tickets: {
        type: Array,
        required: true
    }
})
</script>
<template> 
    <div v-if="tickets.length > 0" class="app relative">
        <div class=" justify-center grid grid-cols-1 lg:grid-cols-2">
            <TicketsItem v-for="ticket in tickets " :key="ticket.id" :ticket="ticket"></TicketsItem>
        </div>
    </div>
</template>

