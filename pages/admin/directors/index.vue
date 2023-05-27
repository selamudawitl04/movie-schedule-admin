<script setup>
import { ref } from "vue";
definePageMeta({
  layout: "adminpanel",
});
// fetch directors
import getDirectors from '@/graphql/directors/query/getDirectors.gql'
const { onResult, loading, onError, refetch } = useQuery(getDirectors)
let directors = reactive([])
const serverError = reactive({
    error: false,
    message: ''
})
onResult((result) => {
    directors = result.data.directors
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
    <BaseSpinner v-if="loading && !directors"></BaseSpinner>
    <div v-if="!loading && !serverError.error">
        <LayoutSubHeader name="directors"></LayoutSubHeader>
        <BaseTable :headers="headers">
            <AdminDirectorsItem  v-for="director in directors" :key="director.id" :director="director"/>
        </BaseTable>        
    </div>
</template>
