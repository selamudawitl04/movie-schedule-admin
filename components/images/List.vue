<script setup>
// handle upload image
// 1. set images

const setCoverImage = inject("setCover");
const props = defineProps({
  images :{
    type:Array,
    required: true
  }
})

console.log(props.images, 'from upload images')

function setCover(index){
    const temp = props.images[index];
    props.images[index] = props.images[0];
    props.images[0] = temp;
    setCoverImage(props.images[0].id);
}


</script>
<template>
  <div v-if="images.length > 0" class="w-full mb-10">
    <div class="w-full flex justify-center">
      <span class="font-bold">Click image to make it Tumnail</span>
    </div>
    <div class="md:grid md:grid-cols-3">
      <div class="m-2" v-for="(path, index) in images" :key="index">
        
        <label @click="setCover(index)" :for="index">
          <img
            :src="path.url"
            class="pt-1 cursor-pointer text-sm h-60 w-60 text-gray-400 max-w-full object-cover group-hover:text-gray-600"
          />
        </label>
        <div class="flex justify-between pt-2 px-2">
          <div
            v-if="index == 0"
            class="text-md font-bold rounded p-2 text-green-600"
          >
            Tumnail
          </div>
          <div v-else class="text-md font rounded p-2 text-orange-600">Detail</div>
        </div>
      </div>
     
    </div>
    <div></div>
  </div>
</template>
<style scoped>
/* Style the file input button */
input[type="file"]::-webkit-file-upload-button {
  background-color: #273444;
  color: white;
  padding: 6px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
