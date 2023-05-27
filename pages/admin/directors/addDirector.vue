<script setup>
import { ref , reactive} from "vue";
import  {useAuthStore} from '@/stores/modules/auth.js'
import addDirector from '@/graphql/directors/mutation/addDirector.gql'

const router = useRouter();

const authToken = useCookie('auth_token')

const authStore = useAuthStore();
console.log(authStore.getUser, 'authStore.user')

// handle image upload
const serverError = ref(false);

import uploadImage from "@/composables/upload.js";

const image = ref('');
const firstName = ref('');
const lastName = ref('');
const getImage = (newImage) => {
  image.value = newImage;
}

const isloading = ref(false);

const handleAddDirector = () => {
  isloading.value = true;
  // uploadImage
  const {mutate, onDone, onError, loading} = uploadImage();

  const variables = {
    data:{
      images: [],
      image: image.value
    }
  }
  mutate(variables);

  // if the image is uploaded succesfully the excute add actor mutation with url of the image
  onDone((result) => {
    console.log(result, 'if the image is uploaded succesfully')
    console.log(authToken.value, 'authToken.value')


    // The solution is clear: you need to use the same token for both requests.


    const {mutate, onDone, onError, loading} = useMutation(addDirector, () => ({
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






definePageMeta({
  layout: "adminpanel",
});
</script>

<template>
  <div>
    <BaseSpinner v-if="isloading" ></BaseSpinner>
    <BaseDialog :show="!!serverError" title="Some thing went wrong" @close="serverError = false"></BaseDialog>
    <div class=" w-4/6 mx-auto bg-white shadow-md rounded-sm py-10">
        <form @submit.prevent="handleAddDirector" action=""> 
            <h1 class="text-center text-3xl font-bold text-primary9 py-10 uppercase">Add Director</h1>
            <div class=" flex items-center justify-center">
                <ImagesUpload @upload-image="getImage"></ImagesUpload>
                <div class=" flex flex-col space-y-6">
                    <div>
                      <input v-model="firstName" class="  py-1 " type="text" placeholder="First Name" name="" id="">
                    </div>
                    <div>
                      <input v-model="lastName" class=" py-1" type="text" placeholder="Last Name" name="" id="">
                    </div>
                    <button class=" font-bold text-white rounded-sm bg-yellow-bright w-full p-2">Submit</button>
                </div>
            </div>
            <div>
                <!-- button -->
            </div>
        </form>
    </div>
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