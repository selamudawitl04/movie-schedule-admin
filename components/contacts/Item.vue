<script setup>

const props = defineProps({
    contact: {
        type: Object,
        required: true
    }
})

const loading = ref(false)
const showReply = ref(false)
const deleteContact = inject('deleteContact')
function deleteMessage(){
    loading.value = true
    deleteContact(props.contact.id)
    setTimeout(() => {
        loading.value = false
    }, 3000);
}

const time = computed(() => {
    const date = new Date(props.contact.date)
    return date.toLocaleString()
})


// inject reply message

const replyMessage = inject('sendReplyMessage')
const message = ref('')
const addToFaq = ref(false)

const toggleAddToFaq = (event) => {
    addToFaq.value = event.target.checked
    
}
const sending = ref(false)
function handleReply(){
    sending.value = true
    setTimeout(() => {
        sending.value = false;
        showReply.value = false
    }, 4000);
    replyMessage(message.value, props.contact.email, props.contact.body, addToFaq.value)
}

const toggleReply = () => {
    console.log('toggle')
    showReply.value = !showReply.value
}



</script>

<template>
    <div> 
        <div class=" bg-white shadow-white shadow-md rounded-lg border border-gray-light mb-4 mx-4">
            <!-- header -->
            <div class="p-2 flex justify-between text-yellow-bright font-bold px-2 bg-gray-dark  bg-opacity-90 rounded-t-md">
                <div>
                    <BaseIcon color="green" path="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
                    <span class=" text-white">{{ contact.email }}</span>
                </div>
                <p class=" text-yellow-bright f">
                    
                    <BaseIcon color="green" path="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12.5 12.8L7.7 15.6L7 14.2L11 11.9V7H12.5V12.8Z"/>
                    <span class="text-white">{{ time }}</span>
                </p>
            </div>
            <!-- body -->
            
            <div class="text-white flex justify-between py-4 px-2  rounded-b-md">
                <div>
                    <h2 class=" font-bold text-primary9 text-2xl">{{contact.subject}}</h2>
                    <p class=" text-primary9">{{contact.body}}</p>
                </div>
                <div class="flex flex-col items-center">
                    
                    
                    <!-- <BaseIcon path="M6,19 C6,20.1 6.9,21 8,21 L16,21 C17.1,21 18,20.1 18,19 L18,9 C18,7.9 17.1,7 16,7 L8,7 C6.9,7 6,7.9 6,9 L6,19 Z M18,4 L15.5,4 L14.79,3.29 C14.61,3.11 14.35,3 14.09,3 L9.91,3 C9.65,3 9.39,3.11 9.21,3.29 L8.5,4 L6,4 C5.45,4 5,4.45 5,5 C5,5.55 5.45,6 6,6 L18,6 C18.55,6 19,5.55 19,5 C19,4.45 18.55,4 18,4 Z"/> -->
                    <button @click="deleteMessage" class=" text-yellow-bright font-bold bg-gray-dark bg-opacity-80 rounded-md px-2 mb-2">delete</button>
                    <!-- <BaseIcon path="M11 14v5L1 11l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81A8.999 8.999 0 0 0 13 14h-2z"/> -->
                    <button @click="toggleReply" class=" text-yellow-bright font-bold bg-gray-dark bg-opacity-80 rounded-md px-3">reply</button>


                </div>
            </div>
           
            <form @submit.prevent="handleReply" action="" method="post" v-if="showReply" >
                <div  class=" relative flex  justify-between p-2">
                    <span v-if="sending" class=" absolute right-6 top-3 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    <textarea v-model="message" name="" id="" cols="75" class=" p-1 rounded-md  border border-gray-light" rows="2"></textarea>
                    <!-- <input v-model="message"  required class=" rounded-md bg-primary5 focus:bg-white p-2 w-5/6" type="text"> -->
                    <div class="ml-6 flex flex-col items-start">
                        <div class=" flex flex-row flex-nowrap items-center space-x-2">
                            <input @change="toggleAddToFaq" type="checkbox" name="" class="  " id="">
                            <label for="" class=" text-primary9 ">Add to FAQ</label>
                        </div>
                        <button class=" hover:bg-yellow-bright hover:bg-opacity-70 w-full my-2 text-primary4 px-4 border-2 rounded-lg border-yellow-bright">send</button>
                    </div>
                </div>
            </form>
        </div>  
    </div>
</template>