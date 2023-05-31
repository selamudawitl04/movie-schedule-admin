<script setup>
definePageMeta({
  layout: "movies",
});
const id = useRoute().params.id;

// fetch movies
import getMovie from '@/graphql/movies/query/getMovie.gql'
const { onResult, loading, onError, refetch } = useQuery(getMovie, {id})
let movie = ref()
const serverError = reactive({
    error: false,
    message: ''
})
onResult((result) => {
    movie.value = {
        ...result.data.movies_by_pk
    }
    console.log(movie.value)
})
onError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})

</script>

<template>
     <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error =false">
        Please check your internet connection and try again
    </BaseDialog>
    <BaseSpinner v-if="loading"></BaseSpinner>
    <div class="app">
        <main>
            <!-- Section 1 Movie Detail -->
            <section  id="detail-header-container"  class=" mt-20 pt-20 pb-40 bg-no-repeat bg-right  md:bg-center  bg-cover" >
                <div v-if="!loading && !serverError.error" class="container p-4 mx-auto">
                    <MoviesDetailsDetail :movie="movie"></MoviesDetailsDetail>
                </div>
            </section>
            <!-- Directors and Actors Container -->
            <section id="second-section" class="director-casts bg-cover bg-primary3 pt-20 pb-20">
                <div  v-if="!loading && !serverError.error" class=" container mx-auto p-4">
                    <h3 class=" text-white text-2xl text-center my-6 font-bold">Directors and Casts</h3>
                    <div class=" justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <DirectorsItem :director="movie.director"></DirectorsItem>
                        <ActorsItem v-for="movie_actor in movie.movies_actors " 
                            :key="movie_actor.actor.id" :actor="movie_actor.actor"/>
                    </div>
                </div>
            </section>
            <!-- New Container -->
            <MoviesDetailsRegister></MoviesDetailsRegister>
        </main>
    </div>
  </template>

<style scoped>
  #detail-header-container{
      background-image: url(../../assets/img/movie_details_bg.jpg);
  }
  #body-container{
      background-image: url(../../assets/img/ucm_bg.jpg);
  }
    .director-casts{
        background-image: url(../../assets/img/ucm_bg_shape.png);
    }
    .newsletter{
        background-image: url(../../assets/img/newsletter_bg.jpg);
    }
    #detail-header-container{
      background-image: url(../../assets/img/movie_details_bg.jpg);
  }

</style>