<script setup>
import getUser from '@/graphql/users/query/getUser.gql'
import notify from '@/graphql/notifications/notify.gql'
import query from '@/composables/query.js'
import mutation from '@/composables/mutation.js'

definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],

});

const router = useRouter()
const route = useRoute()
const id = route.params.id

// 1. seat number date firstname lastname email
const serverError = reactive({
    error: false,
    message: ''
})

const user = ref(null)
const { onResult, loading, onError, refetch } = query(getUser,  {id})
onResult((result) => {
    user.value = {
        ...result.data.users_by_pk
    }
})
onError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})


const {mutate, onDone, onError:onSendError, loading:sendLoading} = mutation(notify)
function sendMessage(message){
    console.log(user.value.id, 'this is user id')
    const variables = {
        data:[
            {
                user_id: user.value.id,
                message
            }
        ]
    }
    mutate(variables)
}

onDone(result=>{
    isMessageSent.value = true,
    setTimeout(()=>{
        isMessageSent.value = false
    },2000)
})
onSendError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})


const isMessageSent = ref(false)
const headers = ['Seat Number','FirstName', 'LastName','Email', 'Price', 'Date']

</script>
<template>
    <BaseDialog :show="!!serverError.error" title="Some thing went wrong" @close="serverError.error = false"></BaseDialog>
    <BaseSpinner v-if="loading" ></BaseSpinner>
    <UsersDetail :loading="sendLoading" :message-sent="isMessageSent" @send-message="sendMessage" v-if="user && !loading" :user="user"></UsersDetail>
</template>


