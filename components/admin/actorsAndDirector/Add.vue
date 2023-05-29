<script setup>
import { ref , reactive} from "vue";

const props = defineProps({
  title:{
    type: String,
    required: true
  },
  item:{
    type: Object,
    required:true
  }
  // define props
})
// function to get image from child component
const getImage = (newImage) => {
  props.item.image = newImage;
  props.item.imageChanged = true
}


// emit add  event to parent component
const emit = defineEmits(['add-item'])
const handleAdd = () => {
  emit('add-item', props.item)
}

</script>

<template>
  <div>
    <div class=" custom-shadow w-4/6 mx-auto bg-white shadow-md rounded-sm py-10">
        <form @submit.prevent="handleAdd" action=""> 
            <h1 class="text-center text-3xl font-bold text-primary9 py-10 uppercase">{{ props.title }}</h1>
            <div class=" flex items-center justify-center">
                <ImagesUpload :image="item.image"  @upload-image="getImage"></ImagesUpload>
                <div class=" flex flex-col space-y-6">
                    <div>
                      <input v-model="item.first_name" class="  py-1 " type="text" placeholder="First Name" name="" id="">
                    </div>
                    <div>
                      <input v-model="item.last_name" class=" py-1" type="text" placeholder="Last Name" name="" id="">
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