<script setup>
import { ref , reactive} from "vue";
import  {useAuthStore} from '@/stores/modules/auth.js'
import addDirector from '@/graphql/directors/mutation/addDirector.gql'
import uploadImage from '@/graphql/images/upload.gql'
import mutation from '@/composables/mutation.js'

const director = ref({
  image: "https://res.cloudinary.com/selamu-dawit/image/upload/v1685277262/default-avatar_qok1rd.png",
  first_name: '',
  last_name:''
})


const router = useRouter();
const authToken = useCookie('auth_token')
const authStore = useAuthStore();
const serverError = ref(false);


// handle image upload

const {mutate, onDone, onError, loading} = mutation(addDirector, 'admin');
const {mutate:uplaodMutate ,onDone:uploadDone, onError:uploadError , loading:uploadLoading} = mutation(uploadImage, 'admin');
uploadDone((result) => {
    console.log(result, 'if the image is uploaded succesfully')
    const directorData = {
      data:{
        first_name: director.value.first_name,
        last_name: director.value.last_name,
        image:{
          data:{
            url: result.data.uploadImages.urls[0]
          }
        } 
      }
    }
    console.log(director.value, 'final adde')
    mutate(directorData); 
});
uploadError((error)=>{
  console.log(error, 'when uploading image')
  serverError.value = true;

})

onDone((result) => {
  console.log(result, ' Director is added succesfully')
  router.push('/admin/directors')
});

onError((error) => {
  console.log(error, 'when adding actor');
  serverError.value = true;
});

const isloading = ref(false);
const handleAddDirector = (newDirector) => {
  director.value = newDirector
  // uploadImage
  const imageData = {
    data:{
      images: [],
      image: director.value.image
    }
  }
  console.log(imageData, 'final image')
  uplaodMutate(imageData);
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
    <AdminActorsAndDirectorAdd :item="director" title="Add Director" @add-item="handleAddDirector"></AdminActorsAndDirectorAdd >
  </div>
</template>