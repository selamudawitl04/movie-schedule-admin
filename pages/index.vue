<script setup>
import { ref } from "vue";
import {useStore} from "@/stores/index";
import query from '@/composables/query.js'
import getMovies from '@/graphql/movies/query/getMovies.gql'
import deleteMovieMutation from '@/graphql/movies/mutation/deleteMovie.gql'
definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],
});

const store = useStore();
let isloading = ref(false);
const resultMeassage = ref('')
let movies = ref([])
const serverError = reactive({
    error: false,
    message: ''
})


// fetch movies
// const { onResult, loading, onError, refetch } = query(getMovies, 'admin', {})
function setMovies(result){
    movies.value = []
    result.data.movies.forEach(movie => {
        movies.value.push(movie)
    });
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
    onResult((result) => { 
        setMovies(result)
        resultMeassage.value = ''
    })
    onError((error) => {setError(error) })
}

// if there is refresh is clicked
const getRefresh = () => {
  return store.getRefresh;
};

watch(getRefresh, (newValue, oldValue) => {
    if(newValue){
        console.log('There is refresh from refresh search')
        refresh()
        store.setRefresh(false)
    }
})

if(store.getAdminSearch != '' && store.getAdminSearchType == 'movies'){
    adminSearch(store.getAdminSearch)
    store.setAdminSearch('')
}
if(store.getDirectorSearch != ''){
    directorSearch(store.getDirectorSearch)
    store.setDirectorSearch('')
}
else if(store.getActorSearch != ''){
    actorSearch(store.getActorSearch)
    store.setActorSearch('')
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

// if there is movie search by director
function directorSearch(id){
    const variables = {
        query: {
            director_id: {
                _eq: id
            }
        }
    }
    let { onResult, loading, onError, refetch } = query(getMovies, variables)
    isloading = loading
    onResult((result) => { 
        setMovies(result)
        if(movies.value.length > 0){
            resultMeassage.value = `Movies directed by ${movies.value[0].director.first_name} ${movies.value[0].director.last_name}`
        }else{
            console.log('thwew cfgjhjnkl')
        }
    })
    onError((error) => {setError(error) })
}
// if there is movie search by actor
function actorSearch(id){
    const variables = {
        query: {
            movies_actors: {
                actor_id: {
                    _eq: id
                }
            }
        }
    }
    let { onResult, loading, onError, refetch } = query(getMovies, variables)
    isloading = loading
    onResult((result) => { 
        setMovies(result)
        if(movies.value.length > 0){
            const movie_actor = movies.value[0].movies_actors.find(movie_actor=> movie_actor.actor.id == id)
            resultMeassage.value = `Movies cast by ${movie_actor.actor.first_name } ${movie_actor.actor.last_name}`
        }
    })
}
function adminSearch(word){
    const variables = {
        query: {
            _or: [{
                    title: {
                    _ilike: `%${word}%`
                    }
                },
                {
                    discrption:  {
                    _ilike: `%${word}%`
                    }
                }
            ]
        }
    }
    let { onResult, loading, onError, refetch } = query(getMovies, variables)
    isloading = loading
    onResult((result) => { 
        setMovies(result)
        resultMeassage.value = `Result for: ${word} `
    })
    onError((error) => {setError(error) })
}

// delete movie
function deleteMovie(id){
    // console.log('movie is deleted succefully')
    const {mutate, onDone, loading, onError } = mutation(deleteMovieMutation);
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
        <LayoutSubHeader @refresh="refresh" :resultMessage="resultMeassage" name="Movies"></LayoutSubHeader>
        <BaseTable v-if=" movies.length > 0" :headers="headers">
            <MoviesItem   @delete-movie="deleteMovie"  v-for="movie in movies" :key="movie.id" :movieData="movie"/>
        </BaseTable>   
        <div v-if="movies.length == 0 && !isloading" class=" bg-gray-dark p-6 text-center text-white font-bold">
            <p>No Movies Found</p>
        </div>     
    </div>
</template>
