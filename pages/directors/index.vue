<script setup>
import { ref } from "vue";
import {useStore} from "@/stores/index";
import query from '@/composables/query.js'
import getDirectors from '@/graphql/directors/query/getDirectors.gql'
import deleteDirectorMutation from '@/graphql/directors/mutation/deleteDirector.gql'

definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],

});
const router = useRouter()
const store = useStore();
let isloading = ref(false);
let directors = ref([])
const serverError = reactive({
    error: false,
    message: ''
})

// fetch directors
function setDirectors(result){
    directors.value = []
    result.data.directors.forEach(director => {
        directors.value.push(director)
    });
    console.log(directors.value)
    // directors.values = result.data.directors
}
// function to set Error 
function setError(error){
    serverError.error = true
    serverError.message = error.message
    console.log(error)
}

// to fetch all directors
function refresh(){
    const variables = {
        query:{
            first_name:{
                _neq: ""
            }
        }
    }
    let { onResult, loading, onError, refetch } = query(getDirectors, variables)
    isloading = loading
    onResult((result) => { setDirectors(result)})
    onError((error) => {setError(error) })
}
// if there is refresh is clicked
const getRefresh = () => {
  return store.getRefresh;
};

watch(getRefresh, (newValue, oldValue) => {
    if(newValue){
        console.log('There is refresh from refresh search')
        refresh()
        store.setRefresh(false)
    }
})
if(store.getAdminSearch != ''&& store.getAdminSearchType == 'directors'){
    console.log('There is refresh search from director')
    adminSearch(store.getAdminSearch)
}
else{
    console.log('There is refresh search')
    refresh()
}

// watch if there is a search
const getAdminSearch = () => {
  return store.getAdminSearch;
};
watch(getAdminSearch, (newValue, oldValue) => {
    adminSearch(newValue)
})

function adminSearch(newValue){
    const first_name = namesearch(newValue).first_name
    const last_name = namesearch(newValue).last_name

    const variables = {
        query: {  
            _or: [{
                  first_name: {
                       _ilike: first_name
                  }
                  },
                  {
                      last_name: {
                        _ilike: last_name
                      }
                  } 
            ]  
        }
    } 
    let { onResult, loading, onError, refetch } = query(getDirectors, variables)
    isloading = loading
    onResult((result) => { setDirectors(result)})
    onError((error) => {setError(error) })
}

// delete  director
provide('deleteDirector', (id)=>{
    const {mutate, onDone, loading, onError } = mutation(deleteDirectorMutation);
    const variables = {
        id: id
    }
    mutate(variables)
    onDone((result) => {
        console.log('director is deleted succefully')
        directors.value = directors.value.filter(director => director.id != id)
    });
    onError((error) => {
        console.log(error)
        setError(error)
    });
})

const showCanNotDeleteAlert = ref(false)
const tobeDeletedDirector = ref('')
provide('deleteActorOrDirector', (id, numberOfMovies)=>{
    if(numberOfMovies > 0){ 
        tobeDeletedDirector.value = id
        showCanNotDeleteAlert.value = true
        return
    }else{
        const {mutate, onDone, loading, onError } = mutation(deleteDirectorMutation, 'admin');
        const variables = {
            id: id
        }
        mutate(variables)
        onDone((result) => {
            console.log('director is deleted succefully')
            directors.value = directors.value.filter(director => director.id != id)
        });
        onError((error) => {
            console.log(error)
            setError(error)
        });
    }
})


// this function is used to show list of movies for director asked to deleted
function setSearch(){
    store.setDirectorSearch(tobeDeletedDirector.value)
    router.push('/')
}


</script>
<template>
    <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
       Please check your internet connection and try again
   </BaseDialog>
   <BaseSpinner v-if="isloading"></BaseSpinner>
   <LayoutSubHeader @refresh="refresh" name="directors"></LayoutSubHeader>

   <div v-if=" directors.length>0">
       <ActordirectorList type="directors" :items="directors"></ActordirectorList>
   </div>
   <div v-if="directors.length == 0 && !isloading" class=" bg-gray-dark p-6 text-center text-white font-bold">
        <p>No Directors Found</p>
    </div>
    <div>
        <BaseDialog :show="showCanNotDeleteAlert" title="Alert" @close="showCanNotDeleteAlert = false">
            <p>This director can not be deleted because he/she has movies</p>
            <p @click="setSearch"  class=" text-green cursor-pointer  underline font-bold"> his/her movies</p>
        </BaseDialog>
    </div>
</template>
