<script setup>
// handle upload image
// 1. set base64Images
import { ref , reactive} from "vue";



const base64Images = ref([]);
const displayImageInput = ref(true)
let imagesAreSelected = ref(false)
const setImageToMovie = inject('setImages')
const setCoverImage = inject('setCoverImage')

const numberOfImages = ()=> base64Images.value.length

watch(numberOfImages, (newValue)=>{
    if(newValue > 0){
        setImageToMovie(base64Images.value)
    }
})

const setImages = async (event)=>{
    const imageContainer = document.getElementById('image-container');
    const files = event.target.files
    for(let i = 0 ; i < files.length; i++){
        // change images to base64

        setTimeout(() => {
            const reader = new FileReader()
            reader.readAsDataURL(files[i])
            // console.log(files[i])
            reader.onload = () => {
                base64Images.value.push(reader.result)
            }
        }, 20);
     
        // How to remove the tumb from base
        //display selected image by creating temporary object url  
        const img = document.createElement('img');
        img.src = URL.createObjectURL(files[i]);
        img.width = 120
        img.id = i
        imageContainer.appendChild(img)
        img.addEventListener('click', chooseTumb)
    }
    displayImageInput.value = false
    imagesAreSelected.value = true
}


// a function to choose cover image
function chooseTumb(event) {
    const imageElement = event.target
    setCoverImage(imageElement.id)
    imageElement.parentElement.childNodes.forEach((node,index)=>{
        if(index > 0)
            node.style.border = 'none'
    })
    imageElement.style.border = '4px solid #E4D804'
}

const chooseImageButton = (event)=>{
    document.getElementById('image').click()
    setTimeout(() => {
        event.target.style.display = 'none'
        
    }, 1000);
}
</script>
<template>
    <div>
        <div class=" flex justify-between items-center">
            <h3 class=" text-2xl font-bold text-primary9">Upload Images</h3>
            <h3 @click="chooseImageButton" class=" opacity-70 cursor-pointer text-center  bg-yellow-bright rounded-full px-2 text-white font-bold">Upload</h3>
        </div>
        <div id="image-container" class="flex flex-wrap space-x-4">
            <input v-show="false" class=" text-primary9" v-if="displayImageInput" multiple @change="setImages" type="file" name="" id="image">
        </div>
        <p v-if="imagesAreSelected" class=" text-center text-primary9">Click The Image To Make It Cover</p>
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