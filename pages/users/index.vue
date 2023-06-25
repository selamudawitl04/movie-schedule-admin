<script setup>
definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],

});

import {useStore} from "@/stores/index";
import query from '@/composables/query.js'
import getUsers from '@/graphql/users/query/getUsers.gql'
import notify from '@/graphql/notifications/notify.gql'
import mutation from '@/composables/mutation.js'

const users = ref([])
const store = useStore();
let isloading = ref(false);
const resultMeassage = ref('')
const serverError = reactive({
    error: false,
    message: ''
})


// const { onResult, loading, onError, refetch } = query(getMovies, 'admin', {})
function setUsers(result){
    users.value = []
    result.data.users.forEach(user => {
        users.value.push(user)
    });
}
// function to set Error 
function setError(error){
    serverError.error = true
    serverError.message = error.message
    console.log(error)
}
function refresh(){
  const variables = {
    query:{
      role:{
        _neq: "admin"
      }
    }
  }
  let { onResult, loading, onError, refetch } = query(getUsers, variables)
  isloading = loading
  onResult((result) => { 
    setUsers(result)
    resultMeassage.value = ''
  })
  onError((error) => {setError(error) })
}

// if there is refresh is clicked
const getRefresh = () => {
  return store.getRefresh;
};
watch(getRefresh, (newValue, oldValue) => {
    if(newValue){
        refresh()
        store.setRefresh(false)
    }
})

if(store.getAdminSearch != ''&& store.getAdminSearchType == 'users'){
    adminSearch(store.getAdminSearch)
}
else{
    refresh()
}

// watch if there is a search
const getAdminSearch = () => {
  return store.getAdminSearch;
};
watch(getAdminSearch, (newValue, oldValue) => {
    adminSearch(newValue)
})



function adminSearch(name){
  let firstName = name
  let lastName = name
  if(name.length > 0){
    firstName = name.split(' ')[0]
    lastName = name.split(' ')[1]

  }
    const variables = {
        query: {  
            _or: [{
                    firstName: {
                     _ilike: `%${firstName}%`
                  }
                  },
                  {
                      lastName: {
                        _ilike: `%${lastName}%`
                      }
                  } 
            ]  
        }
    } 
    let { onResult, loading, onError, refetch } = query(getUsers, variables)
    isloading = loading
    onResult((result) => { setUsers(result)})
    onError((error) => {setError(error) })
}

// sending message logic

const {mutate, onDone, onError:onSendError, loading:sendLoading} = mutation(notify)
const isMessageSent = ref(false)

const usersId = ref([])
provide('setUsersId', (id)=>{
  usersId.value.push(id)
})
provide('removeUsersId', (id)=>{
  usersId.value = usersId.value.filter(userId=> userId != id)
})

const displayForm = ref(false)
const message = ref('')

function handleSendMessage(){
    const variables = {
        data:[]
    }
    for(let index = 0; index < usersId.value.length; index++){
      variables.data.push({
        user_id: usersId.value[index],
        message:message.value
      })
    }

    mutate(variables)
}

onDone(result=>{
  console.log(result.data)
    isMessageSent.value = true,
    displayForm.value = false,
    usersId.value = []
    setTimeout(()=>{
        isMessageSent.value = false
    },4000)
})
onSendError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})
</script>
<template>
    <!-- Table Container -->
    <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
        Please check your internet connection and try again
    </BaseDialog>
    <BaseSpinner v-if="isloading"></BaseSpinner>
    <div class=" relative"  v-if="users.length > 0 && !isloading" >
      <LayoutSubHeader class=" w-full" @refresh="refresh"  :resultMessage="resultMeassage" name="Users"></LayoutSubHeader>  
      <div v-if="usersId.length > 0" class=" absolute top-0 left-40 w-32 p-2 text-white font-bold rounded-md bg-gray-dark">
          <button @click="displayForm = true">Send Message</button>
      </div>
      <div v-if="isMessageSent" class=" absolute top-0 right-80   text-white font-bold rounded-md bg-gray-dark">
        <h2  class=" bg-gray-dark text-white font-bold p-2">Message has been sent</h2>
      </div>
      
      <div v-if="displayForm" class=" absolute left-40 top-0  z-50 bg-white border border-gray-light rounded-md p-2 shadow-xl w-96">
        <div class=" flex justify-between">

          <label class=" text-primary9" for="message">Message</label>
          <svg
              @click="displayForm = false"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              class="text-red cursor-pointer"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="m563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8L295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512L196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1l216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
              />
            </svg>
        </div>
        <form @submit.prevent="handleSendMessage" action="">
          <textarea v-model="message" required class="border border-gray text-primary9 rounded-md p-2" name="message" id="message" placeholder="write message here..." cols="41" rows="4"></textarea>
          <div  class=" relative  w-32 p-2 text-white font-bold rounded-lg bg-gray-dark">
            <span v-if="sendLoading" a class=" absolute left-12  top-1 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent  text-yellow-bright rounded-full" role="status" aria-label="loading"></span>
            <button>Send Message</button>
          </div>
         
        </form>
      </div> 
      <UsersList :users="users"></UsersList>
    </div>
</template>