<script setup>
import { ref } from "vue";
import {useStore} from "@/stores/index";
import query from '@/composables/query.js'
import getContacts from '@/graphql/contacts/getContacts.gql'
import deleteContactMutation from '@/graphql/contacts/delete.gql'
import reply from '@/graphql/contacts/reply.gql'
definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],
});

const router = useRouter()
const contacts = ref([])
const serverError = reactive({
    error: false,
    message: ''
})

const { onResult, loading, onError, refetch } = query(getContacts, {});
onResult((result) => {
    result.data.contacts.forEach(contact => {
        contacts.value.push(contact)
    });
});
onError((error) => {
    serverError.error = true;
    serverError.message = "something went wrong"
    console.log(error, "error");
    router.push("/error");
});


const alertRequired = ref(false)
const alertMessage = ref('')
const {mutate, onDone, loading:deleteLoading, onError:onDeleteError } = mutation(deleteContactMutation);
provide('deleteContact',  (id) => {
    mutate({id})
}) 
onDone((result) => {
    contacts.value = contacts.value.filter(contact => contact.id != result.data.delete_contacts_by_pk.id)
    alertRequired.value = true,
    alertMessage.value = 'Contact is deleted Successfull'
    setTimeout(() => {
        alertRequired.value = false
    }, 4000);
});

onDeleteError((error) => {
    console.log(error)
    window.alert('Something went wrong')
}); 

// send message to user
// 1.import sendemailmutation
// 2.excute sendemailmutation
// 3.handle the response
provide('sendReplyMessage', (message, email)=>{

    const variables = {
        data:{
            email,
            message,
            subject: 'Reply from admin'
        }
        
    }
    const {mutate, onDone, onError} = mutation(reply)
    mutate(variables)
    onDone(result=>{
        alertRequired.value = true,
        alertMessage.value = 'Message is sent Successfull'
        setTimeout(() => {
            alertRequired.value = false
        }, 4000);
        console.log(result)
    })
    onError(error=>{
        console.log(error)
        serverError.error = true;
        serverError.message = "something went wrong"
    })
})
</script>
<template>
    <div class=" max-w-2xl ml-12 -my-3.5 ">
        <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
            Please check your internet connection and try again
        </BaseDialog>
        <BaseSpinner v-if="loading"></BaseSpinner>
        <ContactsList v-if="contacts.length > 0" :contacts="contacts"></ContactsList>
        <div v-if="contacts.length == 0 && !loading" class=" bg-gray-dark p-6 text-center text-white font-bold">
            <p>Zero Contacts</p>
        </div>   
        <teleport to="body">
            <transition name="book">
                <div v-if="alertRequired"
                    class=" top-4 right-4 text-white font-bold bg-gray-dark p-4 fixed ">
                    <p>{{ alertMessage }} </p>
                </div>
            </transition>
        </teleport> 
    </div>
</template>
