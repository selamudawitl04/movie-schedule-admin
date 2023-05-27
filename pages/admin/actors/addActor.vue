<script setup>
import { ref , reactive} from "vue";
const router = useRouter();
import addActor from '@/graphql/actors/mutation/addActor.gql'
import addActorOrDirector from '@/composables/addActorOrDirector.js'
import uploadImage from '@/composables/upload.js'



// handle image upload
const serverError = ref(false);
const isloading = ref(false);
const handleAddActor = (first_name, last_name, image) => {
  // uploadImage
  const {mutate, onDone, onError, loading} = uploadImage();
  isloading.value = loading;
  const variables = {
    data:{
      images: [],
      image
    }
  }
  mutate(variables);
  // if the image is uploaded succesfully the excute add actor mutation with url of the image
  onDone((result) => {
    console.log(result, 'if the image is uploaded succesfully')
    const {mutate, onDone, onError, loading} = addActorOrDirector(addActor);
    isloading.value = loading;
    const variables = {
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
    mutate(variables);
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
definePageMeta({
  layout: "adminpanel",
});
</script>
<template>
  <div>
    <BaseSpinner v-if="isloading" ></BaseSpinner>
    <BaseDialog :show="!!serverError" title="Some thing went wrong" @close="serverError = false"></BaseDialog>
    <AdminActorsAndDirectorAdd title="Add Actor" @add-item="handleAddActor"></AdminActorsAndDirectorAdd>
  </div>
</template>

