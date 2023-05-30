<script setup>
// graphql queris to fetch data
import getMovies from '@/graphql/movies/query/getMovies.gql'
import keyWordSearch from '@/graphql/movies/query/keyWordSearch.gql'
import searchByDirector from '@/graphql/movies/query/searchByDirector.gql'
import filterMovieByGenere from '@/graphql/movies/query/filterMovieByGenere.gql'


import query from '@/composables/query.js'
import {useStore} from "~/stores/index"
const store  = useStore()

// function to assgin movie result 
let movies = ref([])
let isloading = ref(false)

function setMovies(result){
    movies.value = []
    result.data.movies.forEach(movie => {
        movies.value.push(movie)
    });
    console.log(movies.value)
}

// function to set Error 
function setError(error){
    serverError.error = true
    serverError.message = error.message
    console.log(error)
}

function refresh(){
    let { onResult, loading, onError, refetch } = query(getMovies, {})
    isloading = loading
    onResult((result) => { setMovies(result)})
    onError((error) => {setError(error) })
}

// check if searching and filtering are seted else load all movies
if(store.getDirectorSearch != ''){
    console.log('There is director search')
    searchMovieByDirector(store.getDirectorSearch)
}else if(store.getFilterByGenere != ''){
    console.log('There is genere search')

    filterByGenere(store.getFilterByGenere)
}
else{
    console.log('There is refresh search')
    refresh()
}
const serverError = reactive({
    error: false,
    message: ''
})



// Serach by keyWord
const getKeyWord = ()=>{
    return store.getKeySearch
}
watch(getKeyWord, (newValue, oldValue) => {
    const search = {
        title: `%${newValue}%`,
        discrption: `%${newValue}%`
    }
    let { onResult, loading, onError, refetch } = query(keyWordSearch, search)
    isloading = loading
    onResult((result) => { setMovies(result)})
    onError((error) => {setError(error) })

})

function searchMovieByDirector(newValue){
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
    console.log(search)
    let { onResult, loading, onError, refetch } = query(searchByDirector, search)
    isloading = loading
    onResult((result) => { setMovies(result)})
    onError((error) => {setError(error);  })
}

// Search by Directore
const getDirectorSearch = ()=>{
    return store.getDirectorSearch
}

function setDirectorSearch(event){
    store.setDirectorSearch(event.target.value)
}

function getFilterByGenere(){
    return store.getFilterByGenere
}


watch(getFilterByGenere, (newValue, oldValue) => {
    filterByGenere(newValue)
})
watch(getDirectorSearch, (newValue, oldValue) => {
    searchMovieByDirector(newValue)
})
// filter movie by genere

function filterByGenere(genere){
    console.log('Search by genere is called ', genere)
    const search = {
        genere: `%${genere}%`
    }
    let { onResult, loading, onError, refetch } = query(filterMovieByGenere, search)
    isloading = loading
    onResult((result) => { setMovies(result)})
    onError((error) => {setError(error);  })
}


definePageMeta({
    layout: "movies",
});

</script>
<template>

    <h2 class=" z-50 text-6xl font-bold">{{ store.getSearch }}</h2>
    
    <div class="app">
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
            <BaseSpinner v-if="isloading"></BaseSpinner>
            <!-- Search Movie by director and Header -->
            <div id="movieslist" v-if="!serverError.error"  class=" px-4 flex flex-col justify-center items-center z-50  lg:flex-row lg:justify-between relative container mx-auto">
                <div>
                    <h3  @click="refresh" class="text-4xl font-bold cursor-pointer text-white py-8">This Week Movies</h3>
                </div>
                <div class=" pb-8">
                    <input @input="setDirectorSearch" placeholder="search by director" class="py-3 px-12  border-4 border-solid border-yellow-bright   bg-gray-dark focus:bg-white    rounded-full">
                </div>
            </div>

            <!-- Movie List Container -->
            <div  v-if="!isloading && !serverError.error" class="container mx-auto z-50 px-4  relative">
                <MoviesList :movies="movies"/>
                <!-- <MoviesList :movies="movies"/> -->
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