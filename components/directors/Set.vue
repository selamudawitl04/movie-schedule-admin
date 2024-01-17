<script setup>
const router = useRouter();
const directors = reactive([]);

import getDirectors from "@/graphql/directors/query/getDirectors.gql";
//1. load directors
const props = defineProps({
  selectedDirector: null,
});
const variables = {
  query: {
    first_name: {
      _neq: "",
    },
  },
};
const { onResult, loading, onError, refetch } = query(getDirectors, variables);
onResult((result) => {
  result.data.directors.forEach((director) => {
    directors.push(director);
  });
});
onError((error) => {
  console.log(error, "error");
  router.push("/error");
});

// selecting director
const emit = defineEmits(["set-director"]);
const dir_id = ref("");
dir_id.value = props.selectedDirector;
// director_id.value = props.selectedDirector.id
const setDirector = () => {
  console.log(dir_id.value, "dir_id.value");
  emit("set-director", dir_id.value);
};
</script>
<template>
  <div class="flex flex-col">
    <label class="text-primary9 font-bold" for="director"> Director</label>
    <select
      @change="setDirector"
      v-model="dir_id"
      name="director"
      id="director"
      class="border-2 p-2 border-gray rounded-md"
    >
      <!-- <option v-if="loading" selected value="loading">List is Loading ...</option> -->
      <!-- <option v-if="directors.length == 0" selected value="no-data">Unable to Fetch Data ...</option> -->
      <option
        name="director"
        class="hover:bg-primary-500"
        v-for="director in directors"
        :key="director.id"
        :value="director.id"
        :selected="dir_id == director.id"
      >
        {{ director.first_name + " " + director.last_name }}
      </option>
    </select>
  </div>
</template>
