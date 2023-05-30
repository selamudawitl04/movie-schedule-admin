<script setup>
const router = useRouter();
const generes = reactive([]);

import getGeneres from "@/graphql/generes/getGeneres.gql";

const props = defineProps({
  selectedGeneres: {
    type: Array,
    required: true,
  },
});

//1. load generes
const { onResult, loading, onError, refetch } = useQuery(getGeneres, {
  fetchPolicy: "network-only",
});
onResult((result) => {
  result.data.generes.forEach((genere) => {
    generes.push(genere);
  });
});
onError((error) => {
  console.log(error, "error from getGeneres");
  router.push("/error");
});




const setGeneresToMovie = inject("setGeneres");

const displayGenere = ref(false);
// const props.selectedGeneres = ref([]);
const currentGenere = ref();

//  set genere to movies
const setGenere = () => {
  // check if genere is already selected
  if (
    props.selectedGeneres.every(
      (selectedGenere) => selectedGenere.id != currentGenere.value
    )
  ) {
    props.selectedGeneres.push(generes.find((genere) => genere.id == currentGenere.value));
    setGeneresToMovie(props.selectedGeneres);
  }
};
const unSetGenere = (genere) => {

  const index = props.selectedGeneres.findIndex(selectedGenere=> selectedGenere.id == genere.id)
  
  console.log(index,props.selectedGeneres.splice(index, 1))

  setGeneresToMovie(props.selectedGeneres);
};
</script>

<template>
  <!-- Genere -->
  <div class="flex flex-col max-w-full">
    <p class="text-primary9 font-bold">Generes</p>
    <div></div>
    <div class="flex flex-col space-y-4">
      <select
        @change="setGenere"
        v-model="currentGenere"
        class="border-2 p-2 border-gray rounded-md"
        name="genere"
        id="genere"
      >
        <option
          class="text-primary9"
          v-for="genere in generes"
          :key="genere.id"
          :value="genere.id"
        >
          {{ genere.name }}
        </option>
      </select>
      <!-- <button type="button" @click="displayGenere = true" class=" rounded-full  bg-gray-dark py-1 px-2 text-white ">Add Genere</button> -->
    </div>
    <div class="flex py-2 flex-wrap">
      <div v-for="genere in props.selectedGeneres" :key="genere.id" class="flex  items-start flex-wrap mr-2 mt-2" >
        <div class="flex bg-gray-light p-1  rounded-md space-x-2 justify-center items-center ">
          <span class="text-sm">{{ genere.name }}</span> 
          <span @click="unSetGenere(genere)"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" class="text-red" viewBox="0 0 1024 1024"><path fill="currentColor" d="m563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8L295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512L196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1l216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg></span></div>
      </div>
    </div>
  </div>
</template>