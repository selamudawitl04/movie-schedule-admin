<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import getMovie from '@/graphql/movies/query/getMovie.gql'
import editMovie from '@/graphql/movies/mutation/editMovie.gql'
import mutation from '@/composables/mutation.js'
import query from '@/composables/query.js'
import notify from '@/graphql/notifications/notify.gql'

definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],

});


const router = useRouter()
const route = useRoute()
const id = route.params.id

// vee-validate
const schema = Yup.object().shape({
    title: Yup.string()
    .required('Title is required'),
    duration: Yup.number('Duratin must be a number')
    .required('Duration is required')
    .min(20, 'Duration must be greater than 0')
    .max(300, 'Duration must be less than 300'),

});
const  movieData = ref({
})



const generes = ref([])
const actors = ref([])

const serverError = reactive({
    error: false,
    message: ''
})

const date = new Date()

function loadmovies(){
  refetch()
}
// fetch movies
const { onResult, loading:movieLoading, onError:movieError, refetch } = query(getMovie,  {id})
onResult((result) => {

    generes.value = []
    actors.value = []
    movieData.value ={
      ...result.data.movies_by_pk
    } 
    oldDate.value = movieData.value.date
    movieData.value.date = movieData.value.date.slice(0, 16);
    // movieData.value.date = movieData.value.date.toLocaleString().split('T')[0]
    // images.value = result.data.movies_by_pk.movies_images
    // images.value.push(result.data.movies_by_pk.image)
    result.data.movies_by_pk.movies_generes.forEach(genere => {
      generes.value.push(genere.genere)
    })
    result.data.movies_by_pk.movies_actors.forEach(actor => {
      actors.value.push(actor.actor)
    })
    // result.data.movies_by_pk.movies_images.forEach(image => {
    //   console.log(image.image.id, result.data.movies_by_pk.image.id)
    //   images.value.push(image.image)
    //   // if(image.image.id != result.data.movies_by_pk.image.id ){
    //   // }
    // })
})
movieError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})


// provide function to get data from child components

provide('setActors', (newActors)=>{
  actors.value = newActors
})
const setDirector = (director_id)=>{
  console.log(director_id, 'director_id is new diretcor')
  movieData.value.director_id = director_id
}
provide('setCover', (imageId)=>{
  console.log(imageId, 'end')
  movieData.value.cover_image = imageId
})

provide('setGenere', (genere)=>{
  const newGenerse = [...generes.value, genere]
  generes.value = newGenerse
})
provide('unSetGenere', genere_id=>{
  generes.value = generes.value.filter(genere => genere.id != genere_id)
})
provide('unSetActors', id=>{
  actors.value = actors.value.filter(actor => actor.id != id)
})


// 1. get old date

const oldDate = ref()
const displayForm = ref(false)
const message = ref('')
const variables = ref(null)


const {mutate, onDone, onError, loading} = mutation(editMovie)
// const isloading = ref(false)

const errorMessage = ref('')
const error = ref(false)
const handleEditMovie = () => {
  error.value = false
  errorMessage.value = ''

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
        director_id: movieData.value.director_id,
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

    if(!movieData.value.date){
      error.value = true
      errorMessage.value = 'Release Date is Required'
      return
  }
  if(generes.value.length == 0){
    error.value = true
    errorMessage.value = 'Generes are Required'
    return
  }
  if(actors.value.length == 0){
    error.value = true
    errorMessage.value = 'Actors are Required'
    return
  }
  console.log(movieData.value.director_id, 'director id final')
  if(!movieData.value.director_id){
    error.value = true
    errorMessage.value = 'Director is Required'
    return
  }
  

    
    variables.value = movieVariable
    const orginal = Math.floor(new Date(oldDate.value)/(1000 * 60 *60*24))
    const newdate = Math.floor(new Date(movieVariable.data.date)/(1000 * 60 * 60*24))

    if(Math.abs(newdate - orginal)!= 0){
      displayForm.value = true
      return
    }
    console.log(movieVariable, 'movie to be  variable')
    mutate(movieVariable);
    onDone((result) => {
        refetch()
        console.log(result, 'if the Movie  is edited succesfully')
      });
    // if the image is uploaded succesfully the excute add actor mutation with url of the image
    onError((error) => {
      console.log(error, 'when editing movie actor');
      serverError.value = true;
    });
  }

const {mutate:notifyMutate, onDone:notifyOnDone, onError:onSendError, loading:sendLoading} = mutation(notify)
notifyOnDone(result=>{
  refetch()
})
onSendError((error) => {
  serverError.error = true
  serverError.message = error.message
  console.log(error)
})

// this function is called after user inserting reason for changing movie
const formatedDate = computed(()=>{
  return movieData.value.date.slice(0, 16);
})

function editWithReason(){
  displayForm.value = false

  mutate(variables.value)
  console.log(movieData.value.tickets, message.value)
  onDone((result) => {
    const notificationVariables = {
        data:[]
    }
    for(let index = 0; index < movieData.value.tickets?.length; index++){
      const first_name = movieData.value?.tickets[index].user.firstName
      notificationVariables.data.push({
        user_id: movieData.value.tickets[index].user_id,
        message: `Hi ${first_name} the date of ${movieData.value.title} is changed to ${movieData.value.date} due to  ${message.value} `
      })
    }

    notifyMutate(notificationVariables);
    });
}



</script>
<template>
    <BaseDialog :show="!!serverError.error" title="Some thing went wrong" @close="serverError.error = false"></BaseDialog>
    <BaseSpinner v-if="movieLoading" ></BaseSpinner>
    <div  v-if="!movieLoading && !serverError.error && movieData.director" class="custom-shadow w-full max-w-5xl flex justify-center px-6 mx-auto  rounded-lg py-10">
      <Form @submit="handleEditMovie" class="w-3/4 relative"  :validation-schema="schema" v-slot="{ errors }">   
        <p v-if="error" class="text-red text-center bottom-0 absolute text-sm">{{ errorMessage }}</p>
        <h1 class="text-center text-3xl  font-bold text-primary9 py-10 uppercase">Edit  Movie</h1>
        <NuxtLink :to="'/movies/' + movieData.id" class="  text-gray-dark py-4 font-bold">back</NuxtLink>
            <div class=" flex flex-col items-center  b w-full justify-start space-y-10">
                <div class=" grid grid-cols-2 gap-6 w-full">
                    <!-- title -->
                    <div class="">
                        <div class="text-primary9 font-bold">Title</div>
                        <!-- <input v-model="movieData.title" class="border-2 p-2 border-gray rounded-md w-full"  type="text" placeholder="Title" name="" id=""> -->
                        <Field name="title"  v-model="movieData.title" type="text" class="border-2 p-2 border-gray rounded-md w-full focus:border-yellow-bright "  placeholder="title" :class="{ 'border-red': errors.title }" />
                          <transition name="error">
                            <span class="text-red text-sm" >{{errors.title}}</span>
                          </transition>
                    </div>
                    <!-- duration -->
                    <div class="">
                        <div class="text-primary9 font-bold">Duration</div>
                        <!-- <input v-model="movieData.duration" class="border-2 p-2 border-gray rounded-md w-full" type="number" placeholder="Duration Min" name="" id=""> -->
                        <Field name="duration"  v-model="movieData.duration" type="text" class="border-2 p-2 border-gray rounded-md w-full focus:border-yellow-bright "  placeholder="duration" :class="{ 'border-red': errors.duration }" />
                        <transition name="error">
                          <span class="text-red text-sm" >{{errors.duration}}</span>
                        </transition>
                    </div>
                    <!--  schedule time -->
                    <div class="">
                        <div class="text-primary9 font-bold">Date</div>
                        <input required v-model="movieData.date" class="border-2 p-2 border-gray rounded-md w-full" type="datetime-local" name="" id="">
                    </div>
                    <DirectorsSet :selected-director="movieData.director.id" @set-director="setDirector"></DirectorsSet>                   
                    <GeneresSet :selected-generes="generes"></GeneresSet>
                    <ActorsSet :selected-actors="actors"></ActorsSet>  
                 
                </div>
                <!-- <div class=" flex flex-col space-y-6">
                  <ImagesList :images="images"/>
                    
                </div> -->
                    <div  class=" flex flex-col w-full ">
                        <label class=" text-primary9  font-bold mb-2" for="">Description</label>
                        <textarea required minlength="20" maxlength="1000" v-model="movieData.discrption"  class="border-2 p-2 border-gray rounded-md" name="" id="" cols="27" rows="3"></textarea>
                    </div> 
            </div>
            <button :disabled="loading" class=" bg-opacity-60 hover:bg-opacity-100 font-bold text-white bg-yellow-bright  w-80 my-10 mx-auto block rounded-full p-2">Submit</button>
      </Form>
      <div v-if="displayForm" class=" fixed  top-20  z-50 bg-white border border-gray-light rounded-md p-2 shadow-xl w-96">
        <div class=" flex justify-between">
          <label class=" bg-opacity-80 font-bold bg-gray-dark text-white p-2 mb-4 rounded-md" for="message">The movie date is changed please write reason below</label>
        </div>
        <form @submit.prevent="editWithReason" action="">
          <textarea v-model="message" required class="border border-gray text-primary9 rounded-md p-2" name="message" id="message" placeholder="write the reason  here..." cols="41" rows="4"></textarea>
          <div class="flex items-center space-x-10">

            <div  class=" relative  w-32 p-2 text-center text-white font-bold rounded-lg bg-yellow-bright">
              <button  class="text-center ">Enter</button>
            </div>
            <NuxtLink :to="'/movies/' + movieData.id" class=" text-primary9 font-bold">cancel change</NuxtLink >
           
          </div>
        </form>
      </div> 

    </div>
</template>


