<script setup>
// this componsent is used to display the list of actors or directors

// this props contains two data, the first one is items data which is either the list
// of actors or directors, the second one is type which is either actors or directors just for edit page links
const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    type:{
        type: String,
        required: true,
    }
})
const headers = ['FirstName', 'LastName','Number of Movie', 'Update', 'Delete']
</script>
<template>
    <!-- Table Container -->
    <div>
        <BaseTable :headers="headers">
            <ActordirectorItem :type="type" v-for="item in items" :key="item.id" :item="item"/>
        </BaseTable>        
    </div>
</template>
