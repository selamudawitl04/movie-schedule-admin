<script setup>
import { ref , reactive} from "vue";
definePageMeta({
  layout: "adminpanel",
});

const router = useRouter()
import addMovie from "@/graphql/movies/mutation/addMovie.gql";


// Get the selected data for actorss, generes and director of the movie
let generes = ref()
let actors = ref()
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
    images.value = newImages
})

provide('setCoverImage', (index)=>{
    cover_image.value.image = images.value[index]
    cover_image.value.index = index;
})



const isloading = ref(false)
const handleAddMovie = () => {
  isloading.value = true;
  // uploadImage

  const variabless = {
    data:{
    title: title.value,
    descrption: descrption.value,
    date: release_date.value,
    duration: duration.value,
    generes:{
        data: generes.value
    },
    actors:{
      data: actors.value
    },
    director_id: director.value,
    }
  }
  console.log(variabless, 'variabless')
  return 
  const {mutate, onDone, onError, loading} = uploadImage();

  const variables = {
    data:{
      images: images.value,
      image: image.value
    }
  }
  mutate(variables);

  // if the image is uploaded succesfully the excute add actor mutation with url of the image
  onDone((result) => {
    console.log(result, 'if the image is uploaded succesfully')
    // console.log(authToken.value, 'authToken.value')

    // The solution is clear: you need to use the same token for both requests.

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

    // this is the hard part
    isloading.value = loading;
    const variables = {
      data:{
        first_name: firstName.value,
        last_name: lastName.value,
        image:{
          data:{
            url: result.data.uploadImages.urls[0]
          }
        } 
      }
    }
    mutate(variables);
    onDone((result) => {
      console.log(result, 'if the actor is added succesfully')

      window.alert('Director added succesfully');

      router.push('/admin/directors')
    });

    onError((error) => {
      isloading.value = false;
      console.log(error, 'when adding actor');
      serverError.value = true;
    });
    
  });

  onError((error) => {
    isloading.value = false;
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

