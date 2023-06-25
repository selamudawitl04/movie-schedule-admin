<script setup>
// handle upload image
// 1. set base64Images

const base64Images = ref([]);
const setImages = inject("setImages");
const mainImage = (index) => {
  const temp = base64Images.value[index];
  base64Images.value[index] = base64Images.value[0];
  base64Images.value[0] = temp;
  setImages(base64Images.value);
};
const handleImage = async () => {
  const files = document.querySelector("input[type=file]").files;
  async function readAndPreview(file) {
    // Make sure file.name matches our extensions criteria
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function (file) {
          base64Images.value.push(file.target.result);
          setImages(base64Images.value);
        },
        false
      );
      reader.readAsDataURL(file);
    }
  }
  if (files) {
    for (var i = 0; i < files.length; i++) {
      await readAndPreview(files[i]);
    }
  }

};
</script>
<template>
  <div
    v-if="base64Images.length == 0"
    class="flex justify-center mt-5 w-full"
  >
    <div
      class="flex basis-1/4 items-center justify-center flex-col space-y-8 w-full"
    >
      <div class="font-bold text-primary9">
        Select images 
      </div>
      <label
        class="flex flex-col w-full h-32 border-4 rounded-md  border-dashed hover:bg-gray-100 hover:border-gray-300"
      >
        <div class="flex flex-col items-center justify-center pt-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clip-rule="evenodd"
            />
          </svg>
          <p
            class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
          >
            multiple images
          </p>
        </div>
        <input
          @change="handleImage"
          class="opacity-0 w-60"
          ref="file"
          type="file"
          accept="image/*"
          multiple
          name="image"
          id=""
        />
        <!-- <span class="text-red-600">{{errors.image}}</span> -->
      </label>
    </div>
  </div>
  <div v-if="base64Images.length > 0" class="w-full mb-10">
    <div class="w-full flex justify-center">
      <span class="font-bold">Click image to make it Tumnail</span>
    </div>
    <div class="md:grid md:grid-cols-3">
      <div class="m-2" v-for="(path, index) in base64Images" :key="index">
        <span @click="base64Images.splice(index, 1)" class="text-red-600"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 1024 1024"
            class="text-red"
          >
            <path
              fill="currentColor"
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
            />
            <path
              fill="currentColor"
              fill-opacity=".15"
              d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372s372-166.6 372-372s-166.6-372-372-372zm171.8 527.1c1.2 1.5 1.9 3.3 1.9 5.2c0 4.5-3.6 8-8 8l-66-.3l-99.3-118.4l-99.3 118.5l-66.1.3c-4.4 0-8-3.6-8-8c0-1.9.7-3.7 1.9-5.2L471 512.3l-130.1-155a8.32 8.32 0 0 1-1.9-5.2c0-4.5 3.6-8 8-8l66.1.3l99.3 118.4l99.4-118.5l66-.3c4.4 0 8 3.6 8 8c0 1.9-.6 3.8-1.8 5.2l-130.1 155l129.9 154.9z"
            />
            <path
              fill="currentColor" d="M685.8 352c0-4.4-3.6-8-8-8l-66 .3l-99.4 118.5l-99.3-118.4l-66.1-.3c-4.4 0-8 3.5-8 8c0 1.9.7 3.7 1.9 5.2l130.1 155l-130.1 154.9a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3l99.3-118.5L611.7 680l66 .3c4.4 0 8-3.5 8-8c0-1.9-.7-3.7-1.9-5.2L553.9 512.2l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
            /></svg></span>
        <label @click="mainImage(index)" :for="index">
          <img
            :src="path"
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
      <div class="relative">
        <label class="text-xl absolute " :class="base64Images.length%3==0?'-top-10 left-0':'top-[30%] left-[40%]'">
          <span class="bg-gray-300 rounded p-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"
              />
              <path
                fill="currentColor"
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
              />
            </svg>
          </span>
          <input
            @change="handleImage"
            class="opacity-0"
            ref="file"
            type="file"
            accept="image/*"
            multiple
            name=""
            id=""
          />
        </label>
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
