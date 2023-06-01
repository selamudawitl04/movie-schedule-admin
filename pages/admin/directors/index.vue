<script setup>
import { ref } from "vue";
import {useStore} from "@/stores/index";
import authQuery from '@/composables/authQuery.js'
import searchDirectors from '@/graphql/directors/query/searchDirectors.gql'
import getDirectors from '@/graphql/directors/query/getDirectors.gql'
import deleteDirectorMutation from '@/graphql/directors/mutation/deleteDirector.gql'

definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],

});

const store = useStore();
let isloading = ref(false);
let directors = ref([])
const serverError = reactive({
    error: false,
    message: ''
})

// fetch directors
// const { onResult, loading, onError, refetch } = authQuery(getdirectors, 'admin', {})
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


function refresh(){
    let { onResult, loading, onError, refetch } = query(getDirectors, {})
    isloading = loading
    onResult((result) => { setDirectors(result)})
    onError((error) => {setError(error) })
}

if(store.getAdminSearch != ''){
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
    let first_name = newValue;
    let last_name = newValue
    if(newValue.split(' ').length > 1){
        first_name = newValue.split(' ')[0]
        last_name = newValue.split(' ')[1]
    }
    const search = {
        first_name: `%${first_name}%`,
        last_name: `%${last_name}%`
    }
    let { onResult, loading, onError, refetch } = query(searchDirectors, search)
    isloading = loading
    onResult((result) => { setDirectors(result)})
    onError((error) => {setError(error) })
}

// delete  director
provide('deleteDirector', (id)=>{
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
})

</script>
<template>
    <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
       Please check your internet connection and try again
   </BaseDialog>
   <BaseSpinner v-if="isloading"></BaseSpinner>
   <LayoutSubHeader name="directors"></LayoutSubHeader>

   <div v-if=" directors.length>0">
       <AdminActorsAndDirectorList type="directors" :items="directors"></AdminActorsAndDirectorList>
   </div>
</template>
