<script setup>
import { ref } from "vue";
import {useStore} from "@/stores/index";
import query from '@/composables/query.js'
import getMovies from '@/graphql/movies/query/getMovies.gql'
import deleteMovieMutation from '@/graphql/movies/mutation/deleteMovie.gql'
import sortObject from  '@/composables/sortobject'
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

const order_by = ref('duration')
const order = ref('asc')
const page = ref(1)
const status = ref('all')
const queryObject = ref({})
const type = ref('refresh')

function searchMovie(search){
    console.log('searching for ' + search)
    const variables = {
        query: search,
        offset: (page.value - 1) * 5,
        limit: 5,
        order_by: [sortObject(order_by.value, order.value)]

    }
    console.log(variables)
    let { onResult, loading, onError, refetch } = query(getMovies, variables)
    isloading = loading
    onResult((result) => { 
        setMovies(result)
        if(type.value == 'adminSearch'){
            resultMeassage.value = `Search results for: ${store.getAdminSearch}`
        }
        else if(type.value == 'director'){
            resultMeassage.value = `Movies directed by ${movies.value[0].director.first_name} ${movies.value[0].director.last_name}`
        }
        else if(type.value == 'actor'){
            const movie_actor = movies.value[0].movies_actors.find(movie_actor=> movie_actor.actor.id == store.getActorSearch)
            resultMeassage.value = `Movies cast by ${movie_actor.actor.first_name } ${movie_actor.actor.last_name}`
        }else{
            resultMeassage.value = `All Movies`
        }

    })
    onError((error) => {setError(error) })

}

function refresh(){
    page.value = 1
    let { onResult, loading, onError, refetch } = query(getMovies, {})
    queryObject.value = {}
    type.value = 'refresh'
    searchMovie(queryObject.value, )
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
    page.value = 1
    queryObject.value = {
        director_id: {
            _eq: id
        }
    }
    type.value = 'director'
    searchMovie(queryObject.value)
  
}
// if there is movie search by actor
function actorSearch(id){
    page.value = 1
    queryObject.value = {
        movies_actors: {
            actor_id: {
                _eq: id
            }
        }
    }
    type.value = 'actor'
    searchMovie(queryObject.value)
    
}
function adminSearch(word){
    page.value = 1
    queryObject.value = {
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
    type.value = 'adminSearch'
    searchMovie(queryObject.value)
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

watch(page, (newValue, oldValue) => {
    console.log('page is changed', page.value)
    searchMovie(queryObject.value)
})

watch(status, (newValue, oldValue) => {
    page.value = 1
    console.log('status is changed', status.value)
    const query = {
        status: {
            _eq: status.value
        }
    }

    if(status.value == 'all'){
        queryObject.value = {}
    }else{  
        queryObject.value = query
    }
    searchMovie(queryObject.value)
   
})

watch(order_by, (newValue, oldValue) => {
    page.value = 1
    console.log('order_by is changed', order_by.value)
    searchMovie(queryObject.value)
})

watch(order, (newValue, oldValue) => {
    page.value = 1
    console.log('order is changed', order.value)
    searchMovie(queryObject.value)
})
const headers = ['Title', 'Date','Duration', 'Status', 'Update', 'Delete']
</script>
<template>
    <!-- Table Container -->
    <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error = false">
        Please check your internet connection and try again
    </BaseDialog>
    <BaseSpinner v-if="isloading"></BaseSpinner>
    <div  >
        <LayoutSubHeader @refresh="refresh" :resultMessage="resultMeassage" name="Movies">
            <template v-slot:pagination>
                <label class=" text-white bg-gray-dark p-3" for="page">page</label>
                <select v-model="page" class="p-3  bg-gray-dark bg-opacity-70 text-white" name="page" id="page">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </template>
           
            <template v-slot:status>
                <label class=" text-white bg-gray-dark p-3" for="status">status</label>
                <select v-model="status" class="p-3   bg-gray-dark bg-opacity-70 text-white" name="status" id="status">
                    <option value="all">all</option>
                    <option value="active">active</option>

                    <option value="closed">closed</option>
                    <option value="pending">pending</option>
                    
                </select>
            </template>
            <template v-slot:sort>
                <label class=" text-white bg-gray-dark p-3" for="sort">sort</label>
                <select v-model="order_by" class="p-3   bg-gray-dark bg-opacity-70 text-white" name="sort" id="sort">
                    <option value="title">title</option>
                    <option value="rating">rating</option>
                    <option value="duration">duration</option>
                    <option value="date">date</option>
                </select>
                <select v-model="order" class="p-3  bg-gray-dark bg-opacity-70 text-white" name="order" id="order">
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                    
                </select>
            </template>
        </LayoutSubHeader>
        <BaseTable v-if=" movies.length > 0" :headers="headers">
            <MoviesItem   @delete-movie="deleteMovie"  v-for="movie in movies" :key="movie.id" :movieData="movie"/>
        </BaseTable>   
        <div v-if="movies.length == 0 && !isloading" class=" bg-gray-dark p-6 text-center text-white font-bold">
            <p>No Movies Found</p>
        </div>     
    </div>
</template>
