<script setup>

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

const headers = ['FirstName', 'LastName','Number of Movie', 'Action 1', 'Action 2']
</script>
<template>
    <!-- Table Container -->
    <div>
        <BaseTable :headers="headers">
            <AdminActorsAndDirectorItem v-for="item in items" :key="item.id" :item="item"/>
        </BaseTable>        
    </div>
</template>
