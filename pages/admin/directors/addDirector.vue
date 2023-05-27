<script setup>
import { ref , reactive} from "vue";
import  {useAuthStore} from '@/stores/modules/auth.js'
import addDirector from '@/graphql/directors/mutation/addDirector.gql'
import addActorOrDirector from '@/composables/addActorOrDirector.js'
import uploadImage from '@/composables/upload.js'



const router = useRouter();
const authToken = useCookie('auth_token')
const authStore = useAuthStore();
console.log(authStore.getUser, 'authStore.user')

// handle image upload
const serverError = ref(false);

const isloading = ref(false);
const handleAddDirector = (first_name, last_name, image) => {
  // uploadImage
  const {mutate, onDone, onError, loading} = uploadImage();
  isloading.value = loading;
  const imageData = {
    data:{
      images: [],
      image: image
    }
  }
  mutate(imageData);
  // if the image is uploaded succesfully the excute add actor mutation with url of the image
  onDone((result) => {
    console.log(result, 'if the image is uploaded succesfully')
    const {mutate, onDone, onError, loading} = addActorOrDirector(addDirector);
    isloading.value = loading;
    const directorData = {
      data:{
        first_name,
        last_name,
        image:{
          data:{
            url: result.data.uploadImages.urls[0]
          }
        } 
      }
    }
    mutate(directorData);
    onDone((result) => {
      console.log(result, 'if the actor is added succesfully')
      router.push('/admin/directors')
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
definePageMeta({
  layout: "adminpanel",
});
</script>

<template>
  <div>
    <BaseSpinner v-if="isloading" ></BaseSpinner>
    <BaseDialog :show="!!serverError" title="Some thing went wrong" @close="serverError = false"></BaseDialog>
    <AdminActorsAndDirectorAdd title="Add Director" @add-item="handleAddDirector"></AdminActorsAndDirectorAdd >
  </div>
</template>