<script setup>
import { ref } from "vue";
import {useStore} from "@/stores/index";
import authQuery from '@/composables/authQuery.js'
import getMovies from '@/graphql/movies/query/getMovies.gql'
import deleteMovieMutation from '@/graphql/movies/mutation/deleteMovie.gql'
import keyWordSearch from '@/graphql/movies/query/keyWordSearch.gql'
definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],
});

const store = useStore();
let isloading = ref(false);
let movies = ref([])
const serverError = reactive({
    error: false,
    message: ''
})


// fetch movies
// const { onResult, loading, onError, refetch } = authQuery(getMovies, 'admin', {})
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

function adminSearch(word){
    const search = {
        title: `%${word}%`,
        discrption: `%${word}%`
    }
    let { onResult, loading, onError, refetch } = query(keyWordSearch, search)
    isloading = loading
    onResult((result) => { setMovies(result)})
    onError((error) => {setError(error) })
}

// delete movie
function deleteMovie(id){
    // console.log('movie is deleted succefully')
    const {mutate, onDone, loading, onError } = mutation(deleteMovieMutation, 'admin');
    // to delete movie-images, movie-actors, movie-generes
    const variables = {
        id,
        filter1:{
            movie_id: {
                 _eq: id
            }
        },
        filter2:{
            movie_id: {
                 _eq: id
            }
        },
        filter3:{
            movie_id: {
                 _eq: id
            }
        },
    }
    mutate(variables)
    onDone((result) => {
        console.log('movie is deleted succefully')
        movies.value = movies.value.filter(movie => movie.id != id)
    });
    onError((error) => {
        console.log(error)
        setError(error)
    });
}




const headers = ['Title', 'Date','Duration', 'Status', 'Update', 'Delete']
</script>
<template>
    <!-- Table Container -->
    <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
        Please check your internet connection and try again
    </BaseDialog>
    <BaseSpinner v-if="isloading"></BaseSpinner>
    <div  >
        <LayoutSubHeader name="Movies"></LayoutSubHeader>
        <BaseTable v-if=" movies.length > 0" :headers="headers">
            <AdminMoviesItem   @delete-movie="deleteMovie"  v-for="movie in movies" :key="movie.id" :movieData="movie"/>
        </BaseTable>        
    </div>
</template>
