<script setup>
// this componsent is used to display the list of actors or directors

// this props contains two data, the first one is items data which is either the list
// of actors or directors, the second one is type which is either actors or directors just for edit page links
const props = defineProps({
    users: {
        type: Array,
        required: true
    }
})
const headers = ['FirstName', 'LastName','email', 'Number of Thicket', 'Status']
</script>
<template>
    <!-- Table Container -->
    <div>
        <BaseTable :headers="headers">
            <UsersItem  v-for="user in users" :key="user.id" :user="user"/>
        </BaseTable>        
    </div>
</template>
