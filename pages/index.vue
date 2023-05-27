<script setup>

// fetch movies
import getMovies from '@/graphql/movies/query/getMovies.gql'
const { onResult, loading, onError, refetch } = useQuery(getMovies)
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

definePageMeta({
    layout: "movies",
});

</script>
<template>
    
    <div   class="app">
        <!-- Body Header -->
        <MoviesHeader/>
        <!-- Movies Body -->
        <section  id="body-container"  class=" z-10  relative  py-40   bg-no-repeat bg-center  bg-cover ">
        <!-- Back ground Image -->
            <div  id="inner-bg" class=" z-20 opacity-95  bg-primary3 absolute top-0 left-0 right-0 bg-no-repeat bg-center  bg-cover  h-full  w-full" >
            </div>
            <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error =false">
                Please check your internet connection and try again
            </BaseDialog>
            <BaseSpinner v-if="loading && movies"></BaseSpinner>
            <!-- Search Movie by director and Header -->
            <div v-if="!loading && !serverError.error" class=" px-4 flex flex-col justify-center items-center z-50  lg:flex-row lg:justify-between relative container mx-auto">
                <div>
                    <h3 class="text-4xl font-bold text-white py-8">This Week Movies</h3>
                </div>
                <div class=" pb-8">
                    <input placeholder="search by director" class="py-3 px-12  border-4 border-solid border-yellow-bright   bg-gray-dark focus:bg-white    rounded-full">
                </div>
            </div>

            <!-- Movie List Container -->
            <div v-if="!loading && !serverError.error" class="container mx-auto z-50 px-4  relative">
                <MoviesList :movies="movies"/>
                <MoviesList :movies="movies"/>
            </div> 
        </section>
    </div>
</template>

  <style scoped>
  
  #body-container{
      background-image: url(../assets/img/ucm_bg.jpg);
  }
  #inner-bg{
    background-image: url(../assets/img/ucm_bg_shape.png);
  }
  </style>