
<script setup>
import { ref , reactive} from "vue";
import  {useAuthStore} from '@/stores/modules/auth.js'
import editDirector from '@/graphql/directors/mutation/editDirector.gql'
import uploadImage from '@/graphql/images/upload.gql'
import mutation from '@/composables/mutation.js'
import getDirector from '@/graphql/directors/query/getDirector.gql'
import authQuery from '@/composables/authQuery.js'

const router = useRouter();
const route = useRoute()
const authToken = useCookie('auth_token')
const authStore = useAuthStore();
const serverError = ref(false);

const director = ref({
  image: "https://res.cloudinary.com/selamu-dawit/image/upload/v1685277262/default-avatar_qok1rd.png",
  first_name: '',
  last_name:'',
  id: '',
  imageChanged: false
})
const id = route.params.id
const image_id = ref('')
// I have Image id change
// fetch director
const { onResult, loading:directorLoading, onError:directorError, refetch } = authQuery(getDirector, 'admin', {id})
onResult((result) => {
    console.log(result, 555554)
    director.value.first_name = result.data.directors_by_pk.first_name
    director.value.last_name = result.data.directors_by_pk.last_name
    director.value.id = result.data.directors_by_pk.id
    director.value.image = result.data.directors_by_pk.image.url

    image_id.value = result.data.directors_by_pk.image.id
})
directorError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})

const {mutate, onDone, onError, loading} = mutation(editDirector, 'admin');
const {mutate:uplaodMutate ,onDone:uploadDone, onError:uploadError , loading:uploadLoading} = mutation(uploadImage, 'admin');
uploadDone((result) => {
    const urls = []
    result.data.uploadImages.urls.forEach(url => urls.push(url))
    console.log(result, 'if the image is uploaded succesfully')
    const directorData = {
        first_name: director.value.first_name,
        last_name: director.value.last_name,
        url: urls[0],
        director_id: id,
        image_id: image_id.value
    }
    console.log(directorData, 'final edit data')
    mutate(directorData); 
});
uploadError((error)=>{
  console.log(error, 'when uploading image')
  serverError.value = true;

})

onDone((result) => {
  console.log(result, ' Director is edited succesfully')
  location.reload()
});

onError((error) => {
  console.log(error, 'when editing  director');
  serverError.value = true;
});

const handleEditDirector = (newDirector) => {

 director.value = newDirector
 if(director.value.imageChanged){
    // uploadImage
  const imageData = {
    data:{
      images: [],
      image: director.value.image
    }
  }
  console.log(imageData, 'final image')
  uplaodMutate(imageData);

 }else{
    console.log('Image is Not Changed')
    const directorData = {

        first_name: director.value.first_name,
        last_name: director.value.last_name,
        url: director.value.image,
        director_id: id,
        image_id: image_id.value
    }
    console.log(directorData, 'final edit data')
    mutate(directorData); 
 }
  
  // if the image is uploaded succesfully the excute add actor mutation with url of the image
}
definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],

});
</script>

<template>
  <div>
    <BaseSpinner v-if="loading || uploadLoading" ></BaseSpinner>
    <BaseDialog :show="!!serverError" title="Some thing went wrong" @close="serverError = false"></BaseDialog>
    <AdminActorsAndDirectorAdd :item="director" title="Edit Director" @add-item="handleEditDirector"></AdminActorsAndDirectorAdd >
  </div>
</template>


<style scoped>
input[type="text"] {
  padding: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
  border-bottom: 1px solid rgb(220, 214, 214);
  /* border: none; */
}

input[type="text"]:focus {
  border-bottom: 3px solid #E4D804;
}

input[type="text"]:focus::placeholder {
  transform: translate(-5px, -15px);
  transition: transform 0.3s ease-in-out;
}
</style>