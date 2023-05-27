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
const description = ref('')
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
    description: description.value,
    date: release_date.value,
    duration: duration.value,
    generes:{
        data: generes.value
    },
    actors:{
        data: actors.value
    },
    director_id: director.value.id,

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
    <div class=" w-full max-w-5xl px-6 mx-auto bg-white shadow-md rounded-sm py-10">
        <form @submit.prevent="handleAddMovie" action=""> 
            <h1 class="text-center text-3xl font-bold text-primary9 py-10 uppercase">Add Movie</h1>
            <div class=" flex items-start justify-center space-x-10">
                <div class=" flex flex-col space-y-6">
                    <!-- title -->
                    <div class="flex flex-nowrap justify-between space-x-4">
                        <input v-model="title" class=" text-primary9  py-1 " type="text" placeholder="Title" name="" id="">
                    </div>
                    <!-- duration -->
                    <div>
                        <input v-model="duration" class="text-primary9 py-1" type="number" placeholder="Duration Min" name="" id="">
                    </div>
                    <!--  schedule time -->
                    <div class="flex flex-nowrap justify-between space-x-4">
                        <input v-model="release_date"  type="datetime-local" name="" id="">
                    </div>
                    <!-- discrption -->
                    <div  class=" flex flex-col">
                        <label class=" text-primary9 px-2 " for="">discrption</label>
                        <textarea v-model="discrption" class=" border border-gray-dark border-solid p-2 text-primary9" name="" id="" cols="27" rows="3"></textarea>
                    </div>
                     <GeneresSet></GeneresSet>
                </div>
                <div class=" flex flex-col space-y-6">
                    <!-- Set director to movie -->
                    <DirectorsSet @set-director="setDirector"></DirectorsSet>                    
                    <!-- Upload  movie Images -->
                    <ImagesMultiUpload/>
                     <!--Set  Actors to Movie -->
                    <ActorsSet></ActorsSet>   
                </div>
            </div>
            <button class=" font-bold text-white bg-yellow-bright  w-80 my-10 mx-auto block rounded-full p-2">Submit</button>
        </form>
    </div>
</template>

<style scoped>
input[type="text"] ,input[type="number"]{
  padding: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
  border-bottom: 1px solid rgb(220, 214, 214);
  /* border: none; */
}

input[type="text"]:focus ,input[type="number"]:focus {
  border-bottom: 3px solid #E4D804;
}

input[type="text"]:focus::placeholder ,input[type="number"]:focus::placeholder {
  transform: translate(-5px, -15px);
  transition: transform 0.3s ease-in-out;
}



input[type="datetime-local"]{
    color:#546e7a;
    padding: 0.5rem;
    border-bottom: 1px solid rgb(213, 207, 207);

}

#search-input{
    border:1px solid rgb(225, 218, 218)
}

  /* Hide the default radio button */
  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* border-radius: 50%; */
    width: 20px;
    height: 20px;
    border: 1px solid #E4D804;
  }
  
  /* Show a custom radio button */
  input[type="radio"]:before {
    content: "";

    display: block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 3.6px;
    background-color: white;
  }

  
  
  /* Show the custom radio button when it's selected */
  input[type="radio"]:checked:before {
    background-color: #546e7a;
  }

  .actors-enter-from{
    opacity: 0;
    transform: translateY(-10px);
}
.actors-enter-active{
    transition: all 0.3s ease-in;   
}

.actors-enter-to, .actors-leave-from{
    opacity: 1;
    transform: translateY(0px);
}
.actors-leave-to{
    opacity: 0;
    position: absolute;
    transform: translateY(30px);
}
.actors-leave-active{
    transition: all 0.3s ease-in;   
}
.actors-move{
    transition: transform 0.8s ease-in;
}
</style>