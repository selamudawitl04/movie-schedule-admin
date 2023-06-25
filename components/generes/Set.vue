<script setup>
const router = useRouter();
const generes = ref([]);

import getGeneres from "@/graphql/generes/getGeneres.gql";

const props = defineProps({
  selectedGeneres: {
    type: Array,
    required: true,
  },
});


const oldGeneres = ref([]);
props.selectedGeneres.forEach((genere) => {
  oldGeneres.value.push(genere);
});

watch(
  () => props.selectedGeneres,
  (newValue, oldValue) => {
    // console.log('The value of the selected generes has changed', newValue, oldValue)
    oldGeneres.value = [];
    newValue.forEach((genere) => {
      oldGeneres.value.push(genere);
    });
  }
);



//1. load generes
const { onResult, loading, onError, refetch } = query(getGeneres)
onResult((result) => {
  result.data.generes.forEach((genere) => {
    generes.value.push(genere);
  });
});
onError((error) => {
  console.log(error, "error from getGeneres");
  router.push("/error");
});




const displayGenere = ref(false);
//  set genere to movies
const unSetGenere = inject("unSetGenere");
const setGenere = inject("setGenere");

const selectedGenere = ref(null);

const set = () => {
  const genere = generes.value.find((genere) => genere.id == selectedGenere.value);
  console.log(genere, 'is new genere');
  setGenere(genere);
};

const unSet = (id) => {
  unSetGenere(id);
};
</script>

<template>
  <!-- Genere -->
  <div class="flex flex-col max-w-full">
    <p class="text-primary9 font-bold">Generes</p>
    <div></div>
    <div class="flex flex-col space-y-4">
      <select
        
        class="border-2 p-2 border-gray rounded-md"
        name="genere"
        id="genere"
        v-model="selectedGenere"
        @change="set"
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
      <div v-for="genere in oldGeneres" :key="genere.id" class="flex  items-start flex-wrap mr-2 mt-2" >
        <div class="flex bg-gray-light p-1  rounded-md space-x-2 justify-center items-center ">
          <span class="text-sm">{{genere.name }}</span> 
          <span class=" cursor-pointer" @click="unSetGenere(genere.id)"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" class="text-red" viewBox="0 0 1024 1024"><path fill="currentColor" d="m563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8L295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512L196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1l216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg></span>
        </div>
      </div>
    </div>
  </div>
</template>