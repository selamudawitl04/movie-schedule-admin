<script setup>
import { ref } from "vue";
definePageMeta({
  layout: "adminpanel",
});
// fetch actors
import getActors from '@/graphql/actors/query/getactors.gql'
const { onResult, loading, onError, refetch } = useQuery(getActors)
let actors = reactive([])
const serverError = reactive({
    error: false,
    message: ''
})
onResult((result) => {

    actors = result.data.actors
})
onError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})

const headers = ['FirstName', 'LastName','Number of Movie', 'Action 1', 'Action 2']
</script>
<template>
     <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
        Please check your internet connection and try again
    </BaseDialog>
    <BaseSpinner v-if="loading"></BaseSpinner>
    <LayoutSubHeader name="actors"></LayoutSubHeader>

    <div v-if="!loading && !serverError.error">
        <AdminActorsAndDirectorList :items="actors"></AdminActorsAndDirectorList>
    </div>
</template>
