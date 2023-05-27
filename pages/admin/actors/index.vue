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
    <!-- Table Container -->
    <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
        Please check your internet connection and try again
    </BaseDialog>
    <BaseSpinner v-if="loading && !actors"></BaseSpinner>
    <div v-if="!loading && !serverError.error">
        <LayoutSubHeader name="actors"></LayoutSubHeader>
        <BaseTable :headers="headers">
            <AdminDirectorsItem  v-for="actor in actors" :key="actor.id" :director="actor"/>
        </BaseTable>        
    </div>
</template>
