<script setup>
// since the data for both actor and director are the same,
// this component is used for both of them to add data

//The other thing this component used in both add and edit actor and director page
// for this case the pages that use this component are pass actor or director object as props
// for add page empty object is passed as props
// for edit page the object of the actor or director is passed as props

import { Form, Field } from "vee-validate";
import * as Yup from "yup";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
});

// vee-validate
const schema = Yup.object().shape({
  first_name: Yup.string().required("first name is required"),
  last_name: Yup.string().required("last name is required"),
});
// function to get image from image upload component
// image upload component emit the image to this component and this function set the image to the item
const getImage = (newImage) => {
  props.item.image = newImage;
  props.item.imageChanged = true;
};

const isloading = ref(false);
// when add button is clicked, the add-item event is emitted to the parent component
const emit = defineEmits(["add-item"]);
const handleAdd = () => {
  emit("add-item", props.item);
  isloading.value = true;
  setTimeout(() => {
    isloading.value = false;
  }, 5000);
};
</script>

<template>
  <div>
    <div
      class="custom-shadow w-4/6 mx-auto bg-white shadow-md rounded-sm py-10"
    >
      <Form @submit="handleAdd" :validation-schema="schema" v-slot="{ errors }">
        <h1
          class="text-center text-3xl font-bold text-primary9 py-10 uppercase"
        >
          {{ props.title }}
        </h1>
        <div class="flex items-center justify-center">
          <ImagesUpload
            :image="item.image"
            @upload-image="getImage"
          ></ImagesUpload>
          <div class="flex flex-col space-y-6">
            <div>
              <!-- <input v-model="item.first_name" class="  py-1 " type="text" placeholder="First Name" name="" id=""> -->
              <Field
                name="first_name"
                v-model="item.first_name"
                type="text"
                class="py-1"
                placeholder="first name"
                :class="{ 'border-red': errors.title }"
              />
              <transition name="error">
                <p class="text-red text-sm">{{ errors.first_name }}</p>
              </transition>
            </div>
            <div>
              <Field
                name="last_name"
                v-model="item.last_name"
                type="text"
                class="py-1"
                placeholder="last name"
                :class="{ 'border-red': errors.title }"
              />
              <transition name="error">
                <p class="text-red text-sm">{{ errors.last_name }}</p>
              </transition>
            </div>
            <button
              :disabled="isloading"
              class="font-bold text-white rounded-sm bg-primary-500 w-full p-2"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
input[type="text"] {
  padding: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
  border-bottom: 1px solid rgb(220, 214, 214);
}

input[type="text"]:focus {
  border-bottom: 3px solid #e4d804;
}

input[type="text"]:focus::placeholder {
  transform: translate(-5px, -15px);
  transition: transform 0.3s ease-in-out;
}
</style>
