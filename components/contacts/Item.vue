<script setup>

const props = defineProps({
    contact: {
        type: Object,
        required: true
    }
})

const loading = ref(false)
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
const sending = ref(false)
function handleReply(){
    sending.value = true
    setTimeout(() => {
    sending.value = false
    }, 4000);
    replyMessage(message.value, props.contact.email)
}



</script>

<template>
    <div> 
        <div class=" bg-gray-dark rounded-lg mb-4">
            <!-- header -->
            <div class="p-2 text-gray-dark font-bold px-2 bg-yellow-bright bg-opacity-50 rounded-t-md">
                <span><svg xmlns="http://www.w3.org/2000/svg" 
                    width="20"
                    height="20"
                    class="text-white mx-2 inline-block cursor-pointer"
                    viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"
                    />
                    </svg>
                 </span>
                <span>{{ contact.email }}</span>
            </div>
            <!-- body -->
            <div class="text-white bg-primary5 py-4 px-2 bg-opacity-20">
                <h2 class=" font-bold text-primary10 text-2xl">{{contact.subject}}</h2>
                <p>{{contact.body}}</p>
            </div>
            <!-- footer -->
            <div class="flex relative space-x-6 p-2">
                <p class=" text-white">{{ time }}</p>
                <!-- <button class=" text-yellow-bright font-bold">reply</button> -->
                <button @click="deleteMessage" class=" text-yellow-bright font-bold">delete</button>
                <span v-if="loading" class=" absolute left-56 top-1 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
            </div>
            <form @submit.prevent="handleReply" action="" method="post">
                <div  class=" relative flex  justify-between p-2">
                <span v-if="sending" class=" absolute right-6 top-3 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    <input v-model="message"  required class=" rounded-md bg-primary5 focus:bg-white p-2 w-5/6" type="text">
                    <button class=" hover:bg-yellow-bright hover:bg-opacity-70 text-white px-4 border-2 rounded-lg border-yellow-bright">Reply</button>
                </div>
            </form>
        </div>  
    </div>
</template>