<script setup>
import { ref } from "vue";
definePageMeta({
  layout: "adminpanel",
});
import authQuery from '@/composables/authQuery.js'
// fetch movies
import getMovies from '@/graphql/movies/query/getMovies.gql'
const { onResult, loading, onError, refetch } = authQuery(getMovies, 'admin', {})
let movies = reactive([])
const serverError = reactive({
    error: false,
    message: ''
})
onResult((result) => {
    movies = result.data.movies
})
onError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})


const headers = ['Title', 'Director','Duration', 'Date', 'Actions']
</script>
<template>
    <!-- Table Container -->
    <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
        Please check your internet connection and try again
    </BaseDialog>
    <BaseSpinner v-if="loading && !movies"></BaseSpinner>
    <div v-if="!loading && !serverError.error">
        <LayoutSubHeader name="Movies"></LayoutSubHeader>
        <BaseTable :headers="headers">
            <AdminMoviesItem  v-for="movie in movies" :key="movie.id" :movie="movie"/>
        </BaseTable>        
    </div>

</template>
