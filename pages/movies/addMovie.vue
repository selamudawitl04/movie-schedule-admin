<script setup>
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import addMovie from "@/graphql/movies/mutation/addMovie.gql";
import getMovies from "@/graphql/movies/query/getMovie.gql";
import mutation from "@/composables/mutation.js";
import uploadImage from "@/graphql/images/upload.gql";

definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],
});

const router = useRouter();
const serverError = ref(false);
// vee-validate
const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  duration: Yup.number("Duratin must be a number")
    .required("Duration is required")
    .min(20, "Duration must be greater than 0")
    .max(300, "Duration must be less than 300"),
});

// Get the selected data for actorss, generes and director of the movie
let generes = ref([]);
let actors = ref([]);
let director = ref("b58d5c72-7608-43bb-8a6a-776c21adf65d");
let images = ref([]);
const title = ref("");
const descrption = ref("");
const release_date = ref("");
const duration = ref();

// provide function to get data from child components

provide("setActors", (newActors) => {
  actors.value = newActors;
});
const setDirector = (director_id) => {
  director_id = director_id;
};

provide("setGenere", (genere) => {
  const newGenerse = [...generes.value, genere];
  generes.value = newGenerse;
});
provide("unSetGenere", (genere_id) => {
  generes.value = generes.value.filter((genere) => genere.id != genere_id);
});
provide("unSetActors", (id) => {
  actors.value = actors.value.filter((actor) => actor.id != id);
});
provide("setImages", (newImages) => {
  images.value = [];
  newImages.forEach((image) => {
    images.value.push(image);
  });
});

const errorMessage = ref("");
const error = ref(false);

const isloading = ref(false);
const handleAddMovie = () => {
  error.value = false;
  errorMessage.value = "";
  // uploadImage
  // make the first image as cover image
  const coverImage = images.value.shift();
  const { mutate, onDone, onError, loading } = mutation(uploadImage);
  isloading.value = loading;
  const imageData = {
    data: {
      images: images.value,
      image: coverImage,
    },
  };
  console.log(imageData, "imageData");

  if (!release_date.value) {
    error.value = true;
    errorMessage.value = "Release Date is Required";
    isloading.value = false;
    return;
  }
  if (generes.value.length == 0) {
    error.value = true;
    errorMessage.value = "Generes are Required";
    isloading.value = false;
    return;
  }
  if (actors.value.length == 0) {
    error.value = true;
    errorMessage.value = "Actors are Required";
    isloading.value = false;
    return;
  }
  if (!director.value) {
    error.value = true;
    errorMessage.value = "Director is Required";
    isloading.value = false;
    return;
  }
  if (!coverImage) {
    error.value = true;
    errorMessage.value = "Image is Required";
    isloading.value = false;
    return;
  }

  mutate(imageData);
  // if the image is uploaded succesfully the excute add actor mutation with url of the image
  onDone((result) => {
    console.log(result, "if the image is uploaded succesfully");
    // consruct urls to insret in movie
    const urls = [];
    result.data.uploadImages.urls.forEach((url) => urls.push(url));
    console.log(urls, "urls");
    const coverImageUrl = urls[urls.length - 1];
    const moviesImages = [];
    urls.forEach((url) => {
      moviesImages.push({
        image: {
          data: {
            url,
          },
        },
      });
    });

    console.log(moviesImages, "moviesImages");
    // construct actors
    const movieActors = [];
    actors.value.forEach((actor) => {
      movieActors.push({
        actor_id: actor.id,
      });
    });

    // construct genere
    const movieGeneres = [];
    generes.value.forEach((genere) => {
      movieGeneres.push({
        genere_id: genere.id,
      });
    });

    const { mutate, onDone, onError, loading } = mutation(addMovie);
    isloading.value = loading;
    const variables = {
      data: {
        title: title.value,
        discrption: descrption.value,
        date: release_date.value,
        duration: duration.value,
        director_id: director.value,
        image: {
          data: {
            url: coverImageUrl,
          },
        },
        movies_actors: { data: movieActors },
        movies_images: { data: moviesImages },
        movies_generes: { data: movieGeneres },
      },
    };

    console.log("variables", variables);
    mutate(variables);
    isloading.value = false;
    onDone((result) => {
      console.log(result, "if the movie is added succesfully");
      router.push("/");
    });

    onError((error) => {
      isloading.value = false;
      console.log(error, "when movie actor");
      serverError.value = true;
    });
  });

  onError((error) => {
    console.log(error);
    isloading.value = false;
    serverError.value = true;
    return false;
  });
};
</script>
<template>
  <BaseSpinner v-if="isloading"></BaseSpinner>
  <BaseDialog
    :show="!!serverError"
    title="Some thing went wrong"
    @close="serverError = false"
  ></BaseDialog>
  <div
    class="w-full custom-shadow max-w-5xl flex justify-center px-6 mx-auto shadow-md rounded-sm py-10"
  >
    <Form
      @submit="handleAddMovie"
      class="w-3/4 relative"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <p v-if="error" class="text-red text-center bottom-0 absolute text-sm">
        {{ errorMessage }}
      </p>
      <h1 class="text-center text-3xl font-bold text-primary9 py-10 uppercase">
        Add Movie
      </h1>
      <div class="flex flex-col items-center b w-full justify-start space-y-10">
        <div class="grid grid-cols-2 gap-6 w-full">
          <!-- title -->
          <div class="">
            <div class="text-primary9 font-bold">Title</div>
            <!-- <input v-model="title" class="border-2 p-2 border-gray rounded-md w-full"  type="text" placeholder="Title" name="" id=""> -->
            <Field
              name="title"
              v-model="title"
              type="text"
              class="border-2 p-2 border-gray rounded-md w-full focus:border-yellow-bright"
              placeholder="title"
              :class="{ 'border-red': errors.title }"
            />
            <transition name="error">
              <span class="text-red text-sm">{{ errors.title }}</span>
            </transition>
          </div>
          <!-- duration -->
          <div class="">
            <div class="text-primary9 font-bold">Duration</div>
            <!-- <input v-model="duration" class="border-2 p-2 border-gray rounded-md w-full" type="number" placeholder="Duration Min" name="" id=""> -->
            <Field
              name="duration"
              v-model="duration"
              type="text"
              class="border-2 p-2 border-gray rounded-md w-full focus:border-yellow-bright"
              placeholder="duration"
              :class="{ 'border-red': errors.duration }"
            />
            <transition name="error">
              <span class="text-red text-sm">{{ errors.duration }}</span>
            </transition>
          </div>
          <!--  schedule time -->
          <div class="">
            <div class="text-primary9 font-bold">Date</div>
            <input
              required
              v-model="release_date"
              class="border-2 p-2 border-gray rounded-md w-full"
              type="datetime-local"
              name=""
              id=""
            />
          </div>
          <DirectorsSet
            :selected-director="director.id"
            @set-director="setDirector"
          ></DirectorsSet>

          <GeneresSet :selected-generes="generes"></GeneresSet>

          <ActorsSet :selected-actors="actors"></ActorsSet>
        </div>
        <div class="flex flex-col space-y-6">
          <ImagesMultiUpload />
        </div>
        <div class="flex flex-col w-full">
          <label class="text-primary9 font-bold mb-2" for="">Description</label>
          <textarea
            required
            minlength="20"
            maxlength="1000"
            v-model="descrption"
            class="border-2 p-2 border-gray rounded-md"
            name=""
            id=""
            cols="27"
            rows="3"
          ></textarea>
        </div>
      </div>
      <button
        :disabled="isloading"
        class="bg-opacity-60 hover:bg-opacity-100 font-bold text-white bg-yellow-bright w-80 my-10 mx-auto block rounded-full p-2"
      >
        Submit
      </button>
    </Form>
  </div>
</template>
