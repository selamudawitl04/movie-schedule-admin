<script setup>

import { ref } from "vue";
import {useStore} from "@/stores/index";
import authQuery from '@/composables/authQuery.js'
import searchActors from '@/graphql/actors/query/searchActors.gql'
import getActors from '@/graphql/actors/query/getactors.gql'

definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],

});

const store = useStore();
let isloading = ref(false);
let actors = ref([])
const serverError = reactive({
    error: false,
    message: ''
})

// fetch actors
// const { onResult, loading, onError, refetch } = authQuery(getactors, 'admin', {})
function setActors(result){
    actors.value = []
    result.data.actors.forEach(actor => {
        actors.value.push(actor)
    });
    console.log(actors.value)
    // actors.values = result.data.actors
}
// function to set Error 
function setError(error){
    serverError.error = true
    serverError.message = error.message
    console.log(error)
}


function refresh(){
    let { onResult, loading, onError, refetch } = query(getActors, {})
    isloading = loading
    onResult((result) => { setActors(result)})
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
    let { onResult, loading, onError, refetch } = query(searchActors, search)
    isloading = loading
    onResult((result) => { setActors(result)})
    onError((error) => {setError(error) })
}




const headers = ['FirstName', 'LastName','Number of Movie', 'Update', 'Delete']
</script>
<template>
     <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
        Please check your internet connection and try again
    </BaseDialog>
    <BaseSpinner v-if="isloading"></BaseSpinner>
    <LayoutSubHeader name="actors"></LayoutSubHeader>
    <div v-if=" actors.length > 0">
        <AdminActorsAndDirectorList type="actors" :items="actors"></AdminActorsAndDirectorList>
    </div>
</template>
<!-- Edit Query -->