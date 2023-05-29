<script setup>
import { ref , reactive} from "vue";
const selecteImage = ()=>{
    const input = document.getElementById('image-input')
    input.click()
}
const props = defineProps({
    image: {
        type: String,
        required: true
    }
})




const emit =  defineEmits(['upload-image'])
const uploadImage = (event)=>{
    const input = document.getElementById('image-input')
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    props.image = imageUrl;
    // convert image to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        emit('upload-image', reader.result)
    };
    reader.onerror = (error) => {
        console.log('Error: ', error);
    };
}
</script>
<template>
    <div>        <!-- Left Side -->
        <label @click="selecteImage" for="image" class=" cursor-pointer my-0">
            <img :src="image"   id="image-preview" class=" w-40  border-4 hover:border-yellow-bright border-primary9"  alt="Avater Image">
        </label>
        <input id="image-input" @change="uploadImage" class=" opacity-0 h-0 p-0 m-0" type="file" name="image" >
        <h2 @click="selecteImage" class="ml-5 my-0 cursor-pointer uppercase text-primary9 font-semibold">Choose Image</h2>
    </div>
</template>