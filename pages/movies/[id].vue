<script setup>

import getMovie from '@/graphql/movies/query/getMovie.gql'
import query from '@/composables/query.js'
definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],

});

const router = useRouter()
const route = useRoute()
const id = route.params.id

const movie = ref(null)
const serverError = reactive({
    error: false,
    message: ''
})



// fetch movies
const { onResult, loading:movieLoading, onError:movieError, refetch } = query(getMovie,  {id})
onResult((result) => {
    console.log('Here movie Date come', result)
  movie.value = {
    ...result.data.movies_by_pk
  }
})
movieError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
});



const headers = ['Seat Number','FirstName', 'LastName','Email', 'Price', 'Date']

// 1.Ui
// 2.Table
// 3.Available sits
// 1. Seat Number first name lastname email price date
</script>
<template>
    <BaseDialog :show="!!serverError.error" title="Some thing went wrong" @close="serverError.error = false"></BaseDialog>
    <BaseSpinner v-if="movieLoading" ></BaseSpinner>
    <MoviesDetail v-if="movie && !movieLoading" :movie="movie"></MoviesDetail>
</template>


