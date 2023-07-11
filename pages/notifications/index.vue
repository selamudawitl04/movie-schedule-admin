<script setup>
import { ref } from "vue";
import {useStore} from "@/stores/index";
import query from '@/composables/query.js'
import getContacts from '@/graphql/contacts/getContacts.gql'
import deleteContactMutation from '@/graphql/contacts/delete.gql'
import reply from '@/graphql/contacts/reply.gql'
import addFaq from '@/graphql/faqs/add.gql'
import subscription from '@/composables/subscription.js'

import replywithfaq from '@/graphql/contacts/replywithfaq.gql'
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

const { onResult, loading, onError, refetch } = subscription(getContacts, {});
onResult((result) => {
    contacts.value = []
    console.log(result, "result");
    result.data.contacts.forEach(contact => {
        // if(contacts.value.findIndex(item => item.id == contact.id) != -1) return
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
    console.log(result, 'result')
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
provide('sendReplyMessage', (message, email, question, addToFaq)=>{
    const variables = {
        data:{
            email,
            message,
            subject: 'Reply from Solflx'
        },
        data1:{
            question,
            answer: message
        }
        
    }

    // console.log(variables, addToFaq, question)
    const query = addToFaq ? replywithfaq : reply
    const {mutate, onDone, onError} = mutation(query)

    console.log(variables)
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
        console.log(error, 'error when sending message and adding to faq')
        serverError.error = true;
        serverError.message = "something went wrong"
    })
})

const question = ref('')
const answer = ref('')
const {mutate: addFaqMutation, onDone:addFaqOnDone, onError:addFaqOnError} = mutation(addFaq)
addFaqOnDone(result=>{
    alertRequired.value = true,
    alertMessage.value = 'added successfull to frequently asked questions'
    question.value = ''
    answer.value = ''
    
    setTimeout(() => {
        alertRequired.value = false
    }, 4000);

    console.log(result, 'faq added')
})
addFaqOnError(error=>{
    console.log(error, 'error when adding faq')
    serverError.error = true;
    serverError.message = "something went wrong"
})




const handelAddFaq = ()=>{
    const  data = {
        question: question.value,
        answer: answer.value
    }
    addFaqMutation({data})
}

</script>
<template>
    <div class=" flex mx-12 flex-row justify-start">
        <div class="w-1/2">
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
                        class=" top-4 right-4  text-white font-bold bg-gray-dark p-3 fixed ">
                        <p>{{ alertMessage }} </p>
                    </div>
                </transition>
            </teleport> 
        </div>
        <div class="pt-0 ml-16 w-1/3 ">
            <h3 class=" text-2xl font-bold pb-2 text-primary9 text-center">Add frequently asked question</h3>
            <form  @submit.prevent="handelAddFaq" action="#" class=""  >
           
                <div class="mb-2">
                    <label for="subject" class="block mb-2 text-sm font-medium text-primary9 ">Question</label>
                    <input v-model="question" type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="write question....." required>
                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block mb-2 text-sm font-medium text-primary9 ">Answer</label>
                    <textarea  v-model="answer" id="message" rows="6" class="block p-2.5 w-full text-gray-900  text-sm text-primary9 bg-gray-50 rounded-lg shadow-sm border border-gray focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="write answer..."></textarea>
                </div>
                <button type="submit" class="py-3  my-3 px-5  bg-opacity-50 hover:bg-opacity-90 text-center  rounded-lg bg-yellow-bright sm:w-full text-primary4 font-bold ">ADD</button>
        </form>
        </div>
    </div>
</template>
