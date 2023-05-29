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
    <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
       Please check your internet connection and try again
   </BaseDialog>
   <BaseSpinner v-if="loading"></BaseSpinner>
   <LayoutSubHeader name="directors"></LayoutSubHeader>

   <div v-if="!loading && !serverError.error">
       <AdminActorsAndDirectorList type="directors" :items="directors"></AdminActorsAndDirectorList>
   </div>
</template>
