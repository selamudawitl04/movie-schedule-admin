<script setup>
const props = defineProps({
    contacts: {
        type: Array,
        required: true
    }
})

</script>
<template>
    <div class="">
        <ContactsItem v-for="contact in contacts "
            :key="contact.id" :contact="contact">
        </ContactsItem>
    </div>
</template>