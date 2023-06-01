<script setup>
import { ref , reactive} from "vue";
import getMovies from '@/graphql/movies/query/getMovie.gql'
import editMovie from '@/graphql/movies/mutation/editMovie.gql'
import mutation from '@/composables/mutation.js'
import authQuery from '@/composables/authQuery.js'
definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],

});

const router = useRouter()
const route = useRoute()
const id = route.params.id
const  movieData = ref({
})

const oldActors = ref([])

// const cover_image = ref('')

// Get the selected data for actors, generes and director of the movie

const images = ref([])
const generes = ref([])
const actors = ref([])

const serverError = reactive({
    error: false,
    message: ''
})
// fetch movies
const { onResult, loading:movieLoading, onError:movieError, refetch } = authQuery(getMovies, 'admin', {id})
onResult((result) => {
    movieData.value ={
      ...result.data.movies_by_pk
    } 
    // images.value = result.data.movies_by_pk.movies_images
    images.value.push(result.data.movies_by_pk.image)
    result.data.movies_by_pk.movies_generes.forEach(genere => {
      generes.value.push(genere.genere)
    })
    result.data.movies_by_pk.movies_actors.forEach(actor => {
      actors.value.push(actor.actor)
    })
    result.data.movies_by_pk.movies_images.forEach(image => {
      console.log(image.image.id, result.data.movies_by_pk.image.id)
      images.value.push(image.image)
      // if(image.image.id != result.data.movies_by_pk.image.id ){
      // }
    })
})
movieError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})


// provide function to get data from child components
provide('setGeneres', (newGeneres)=>{
  generes.value = newGeneres
})
provide('setActors', (newActors)=>{
  actors.value = newActors
})
const setDirector = (newDirector)=>{
  movieData.value.director = newDirector
}
provide('setCover', (imageId)=>{
  console.log(imageId, 'end')
  movieData.value.cover_image = imageId
})

// 
const {mutate, onDone, onError, loading} = mutation(editMovie, 'admin')
// const isloading = ref(false)
const handleEditMovie = () => {

    // delete from movies actors
    // 1. movies_actors id 

   // construct actors
   const movieActors = []
    actors.value.forEach(actor =>{
      movieActors.push(
        {
          actor_id:actor.id,
          movie_id: id
        }
      )
    })

    // construct actors
   const movieGeneres = []
    generes.value.forEach(genere =>{
      movieGeneres.push(
        {
          genere_id:genere.id,
          movie_id: id
        }
      )
    })

     // consruct urls to insret in movie
  const movieVariable = {
      data:{
        title: movieData.value.title,
        discrption: movieData.value.discrption,
        date: movieData.value.date,
        duration: movieData.value.duration,
        director_id: movieData.value.director.id,
        cover_image: movieData.value.cover_image, 
      },
      id,
      data1:movieActors,
      data2:movieGeneres,
      filter:{
        movie_id: {
          _eq: id
        }
      },
      filter2:{
        movie_id: {
          _eq: id
        }
      }
    }
    console.log(movieVariable, 'varoables')
    mutate(movieVariable);
    onDone((result) => {
      location.reload()
      console.log(result, 'if the Movie  is edited succesfully')
    });

   

  // if the image is uploaded succesfully the excute add actor mutation with url of the image
   onError((error) => {
      console.log(error, 'when adding actor');
      serverError.value = true;
    });
  }

    

</script>
<template>
    <BaseDialog :show="!!serverError.error" title="Some thing went wrong" @close="serverError.error = false"></BaseDialog>
    <BaseSpinner v-if="movieLoading" ></BaseSpinner>
    <div  v-if="!movieLoading && !serverError.error && movieData.director" class="custom-shadow w-full max-w-5xl flex justify-center px-6 mx-auto  rounded-lg py-10">
        <form @submit.prevent="handleEditMovie" class="w-3/4"  action=""> 
            <h1 class="text-center text-3xl  font-bold text-primary9 py-10 uppercase">Edit  Movie</h1>
            <div class=" flex flex-col items-center  b w-full justify-start space-y-10">
                <div class=" grid grid-cols-2 gap-6 w-full">
                    <!-- title -->
                    <div class="">
                        <div class="text-primary9 font-bold">Title</div>
                        <input v-model="movieData.title" class="border-2 p-2 border-gray rounded-md w-full"  type="text" placeholder="Title" name="" id="">
                    </div>
                    <!-- duration -->
                    <div class="">
                        <div class="text-primary9 font-bold">Duration</div>
                        <input v-model="movieData.duration" class="border-2 p-2 border-gray rounded-md w-full" type="number" placeholder="Duration Min" name="" id="">
                    </div>
                    <!--  schedule time -->
                    <div class="">
                        <div class="text-primary9 font-bold">Date</div>
                        <input v-model="movieData.date" class="border-2 p-2 border-gray rounded-md w-full" type="datetime-local" name="" id="">
                    </div>
                    <AdminMoviesAddMovieSetDirector :selected-director="movieData.director.id" @set-director="setDirector"></AdminMoviesAddMovieSetDirector>                   
                    <AdminMoviesAddMovieSetGenere :selected-generes="generes"></AdminMoviesAddMovieSetGenere>
                    <AdminMoviesAddMovieSetActor :selected-actors="actors"></AdminMoviesAddMovieSetActor>  
                 
                </div>
                <div class=" flex flex-col space-y-6">
                  <ImagesList :images="images"/>
                    
                </div>
                    <div  class=" flex flex-col w-full ">
                        <label class=" text-primary9  font-bold mb-2" for="">Description{{ movieData.discrption }}</label>
                        <textarea v-model="movieData.discrption"  class="border-2 p-2 border-gray rounded-md" name="" id="" cols="27" rows="3"></textarea>
                    </div> 
            </div>
            <button class=" font-bold text-white bg-yellow-bright  w-80 my-10 mx-auto block rounded-full p-2">Submit</button>
        </form>
    </div>
</template>


