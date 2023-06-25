
<script setup>
import { ref , reactive} from "vue";
import  {useAuthStore} from '@/stores/modules/auth.js'
import editActor from '@/graphql/actors/mutation/editActor.gql'
import uploadImage from '@/graphql/images/upload.gql'
import mutation from '@/composables/mutation.js'
import getActor from '@/graphql/actors/query/getActor.gql'

const router = useRouter();
const route = useRoute()
const authToken = useCookie('auth_token')
const authStore = useAuthStore();
const serverError = ref(false);

const actor = ref({
  image: "https://res.cloudinary.com/selamu-dawit/image/upload/v1685277262/default-avatar_qok1rd.png",
  first_name: '',
  last_name:'',
  id: '',
  imageChanged: false
})
const id = route.params.id
const image_id = ref('')
// I have Image id change
// fetch actor
const { onResult, loading:actorLoading, onError:actorError, refetch } = query(getActor, {id})
onResult((result) => {
    console.log(result, 321321)
    actor.value.first_name = result.data.actors_by_pk.first_name
    actor.value.last_name = result.data.actors_by_pk.last_name
    actor.value.id = result.data.actors_by_pk.id
    actor.value.image = result.data.actors_by_pk.image.url
    image_id.value = result.data.actors_by_pk.image.id
})
actorError((error) => {
    serverError.error = true
    serverError.message = error.message
    console.log(error)
})

const {mutate, onDone, onError, loading} = mutation(editActor, 'admin');
const {mutate:uplaodMutate ,onDone:uploadDone, onError:uploadError , loading:uploadLoading} = mutation(uploadImage, 'admin');
uploadDone((result) => {
    const urls = []
    result.data.uploadImages.urls.forEach(url => urls.push(url))
    console.log(result, 'if the image is uploaded succesfully')
    const actorData = {
        first_name: actor.value.first_name,
        last_name: actor.value.last_name,
        url: urls[0],
        actor_id: id,
        image_id: image_id.value
    }
    console.log(actorData, 'final edit data')
    mutate(actorData); 
});
uploadError((error)=>{
  console.log(error, 'when uploading image')
  serverError.value = true;

})

onDone((result) => {
  console.log(result, ' actor is edited succesfully')
//   location.reload()
});

onError((error) => {
  console.log(error, 'when editing  actor');
  serverError.value = true;
});

const handleEditActor = (newActor) => {

 actor.value = newActor
 console.log(newActor)

 if(actor.value.imageChanged){
    // uploadImage
  const imageData = {
    data:{
      images: [],
      image: actor.value.image
    }
  }
  console.log(imageData, 'final image')
  uplaodMutate(imageData);

 }else{
    console.log('Image is Not Changed')
    const actorData = {
        first_name: actor.value.first_name,
        last_name: actor.value.last_name,
        url: actor.value.image,
        actor_id: id,
        image_id: image_id.value
    }
    console.log(actorData, 'final edit data')
    mutate(actorData); 
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
    <ActordirectorAdd :item="actor"  title="Edit Actor" @add-item="handleEditActor"></ActordirectorAdd>
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