<script setup>
import { ref , reactive} from "vue";
import addMovie from "@/graphql/movies/mutation/addMovie.gql";
import uploadImage from '@/composables/upload.js'

definePageMeta({
  layout: "adminpanel",
});

const router = useRouter()
const route = useRoute()
console.log(route.params.id, 'route')
const serverError = ref(false);




// Get the selected data for actorss, generes and director of the movie
let generes = ref([])
let actors = ref([])
let director = ref()
let images = ref([])
let cover_image = ref({})
const title = ref('')
const descrption = ref('')
const release_date = ref('')
const duration = ref()
// provide function to get data from child components

provide('setGeneres', (newGeneres)=>{
    generes.value = newGeneres
})
provide('setActors', (newActors)=>{
    actors.value = newActors
})
const setDirector = (newDirector)=>{
    director.value = newDirector
}
provide('setImages', (newImages)=>{
    // console.log(newImages, 'newImages')
    images.value = newImages
})

provide('setCoverImage', (index)=>{
    cover_image.value.image = images.value[index]
    cover_image.value.index = index;
})



const isloading = ref(false)
const handleAddMovie = () => {
  // uploadImage
  // make the first image as cover image
  const coverImage = images.value.shift()
  const {mutate, onDone, onError, loading} = uploadImage();
  isloading.value = loading;
  const imageData = {
    data:{
      images : images.value,
      image:coverImage
    }
  }
  mutate(imageData);
  // if the image is uploaded succesfully the excute add actor mutation with url of the image
  onDone((result) => {
    console.log(result, 'if the image is uploaded succesfully')
    // consruct urls to insret in movie
    const urls = []
    result.data.uploadImages.urls.forEach(url => urls.push(url))
    console.log(urls, 'urls')
    const coverImageUrl = urls[0]
    const moviesImages = []
    urls.forEach(url => {
      moviesImages.push({
        image:{
          data:{
            url
          }
        }
      })
    });
  


    console.log(moviesImages, 'moviesImages')
    // construct actors
    const movieActors = []
    actors.value.forEach(actor =>{
      movieActors.push(
        {
          actor_id:actor
        }
      )
    })

    // construct genere
    const movieGeneres = []
    generes.value.forEach(genere =>{
      movieGeneres.push(
        {
          genere_id:genere
        } 
      )
    })
    

    console.log(result, 'if the image is uploaded succesfully')
    const {mutate, onDone, onError, loading} = useMutation(addMovie, () => ({
        fetchPolicy: "network-only",
        clientId: "authClient",
        context: {
          headers: {
            "x-hasura-role": "admin",
          }
        }
      })
    );
    isloading.value = loading;
    const movieData = {
      data:{
        title: title.value,
        discrption: descrption.value,
        date: release_date.value,
        duration: duration.value,
        director_id: director.value,
        image:{
          data:{
            url: coverImageUrl
          }
        },
        movies_actors: {data: movieActors},
        movies_images: {data: moviesImages},
        movies_generes: {data: movieGeneres},
      }
    }

    console.log(movieData, 'variables')
    mutate(movieData);
    onDone((result) => {
      console.log(result, 'if the actor is added succesfully')
      router.push('/admin/actors')
    });

    onError((error) => {
      console.log(error, 'when adding actor');
      serverError.value = true;
    });
    
  });

  onError((error) => {
    console.log(error);
    serverError.value = true;
    return false
  }); 
  
}
</script>
<template>
    <div class=" w-full max-w-5xl flex justify-center px-6 mx-auto  shadow-md rounded-sm py-10">
        <form @submit.prevent="handleAddMovie" class="w-3/4"  action=""> 
            <h1 class="text-center text-3xl  font-bold text-primary9 py-10 uppercase">Add Movie</h1>
            <div class=" flex flex-col items-center  b w-full justify-start space-y-10">
                <div class=" grid grid-cols-2 gap-6 w-full">
                    <!-- title -->
                    <div class="">
                        <div class="text-primary9 font-bold">Title</div>
                        <input v-model="title" class="border-2 p-2 border-gray rounded-md w-full"  type="text" placeholder="Title" name="" id="">
                    </div>
                    <!-- duration -->
                    <div class="">
                        <div class="text-primary9 font-bold">Duration</div>
                        <input v-model="duration" class="border-2 p-2 border-gray rounded-md w-full" type="number" placeholder="Duration Min" name="" id="">
                    </div>
                    <!--  schedule time -->
                    <div class="">
                        <div class="text-primary9 font-bold">Date</div>
                        <input v-model="release_date" class="border-2 p-2 border-gray rounded-md w-full" type="datetime-local" name="" id="">
                    </div>
                    <AdminMoviesAddMovieSetDirector @set-director="setDirector"></AdminMoviesAddMovieSetDirector>                   
                    <AdminMoviesAddMovieSetGenere></AdminMoviesAddMovieSetGenere>
                    <AdminMoviesAddMovieSetActor></AdminMoviesAddMovieSetActor>  
                 
                </div>
                <div class=" flex flex-col space-y-6">
                    <ImagesMultiUpload/>
                    
                </div>
                    <div  class=" flex flex-col w-full ">
                        <label class=" text-primary9  font-bold mb-2" for="">Description</label>
                        <textarea v-model="descrption"  class="border-2 p-2 border-gray rounded-md" name="" id="" cols="27" rows="3"></textarea>
                    </div> 
            </div>
            <button class=" font-bold text-white bg-yellow-bright  w-80 my-10 mx-auto block rounded-full p-2">Submit</button>
        </form>
    </div>
</template>

