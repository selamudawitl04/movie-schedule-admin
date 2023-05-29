<script setup>
const router = useRouter();
const actors = reactive([]);

import authQuery from '@/composables/authQuery.js'
import getActors from "@/graphql/actors/query/getActors.gql";
//1. load directors
const { onResult, loading, onError, refetch } = authQuery(getActors, 'admin', {});
onResult((result) => {
  console.log(result.data.actors, 'why actor')
  result.data.actors.forEach((actor) => {
    actors.push(actor);
  });
});
onError((error) => {
  console.log(error, "error");
  router.push("/error");
});

const setActor = inject("setActors");

// 2. display actors according to search value in each key stroke
const displayedActors = ref([]);
displayedActors.value = actors;
const setDisplayedActors = (event) => {
  const search = event.target.value;
  if (search == "") {
    displayedActors.value = actors;
  }
  displayedActors.value = actors.filter((actor) => {
    return (
      actor.first_name.toLowerCase().includes(search.toLowerCase()) ||
      actor.last_name.toLowerCase().includes(search.toLowerCase())
    );
  });
};

// display search result actors
const showActorsList = ref(false);
const showActors = () => {
  showActorsList.value = true;
  displayedActors.value = [];
};

// set actors to movie
const props = defineProps({
  selectedActors: {
    type: Array,
    required: true,
  },
});

const setActorToMovie = (actor) => {
  showActorsList.value = false;
  if (
    !props.selectedActors.some((selectedActor) => selectedActor.id == actor.id)
  ) {
    props.selectedActors.unshift(actor);
    showActorsList.value = false;
    setActor(props.selectedActors);

  }
};

const unselectActor = (actor) => {
  props.selectedActors.splice(
    props.selectedActors.findIndex((selectedActor) => selectedActor.id == actor.id), 1
  );
  setActor(props.selectedActors);
};
</script>

<template>
  <div class="flex flex-col bg">
    <div class="flex flex-col text-primary9">
      <div class="text-primary9 font-bold">Actors</div>
    </div>
    <div class="flex flex-col text-left space-y-1">
      <input
        class="border-2 p-2 border-gray rounded-md"
        @input="setDisplayedActors"
        @focus="showActorsList = true"
        placeholder="Actor Name"
        type="text"
      />
      <div
        class="max-h-20 overflow-y-scroll p-2 border-b-2 -mt-4 border-x-2 rounded-b-md-md border-blue"
        v-if="showActorsList"
      >
        <p
          v-for="actor in displayedActors"
          :key="actor.id"
          @click="setActorToMovie(actor)"
          class="hover:bg-gray-dark cursor-pointer hover:text-white text-primary9"
        >
          {{ actor.first_name + " " + actor.last_name }}
        </p>
      </div>
    </div>
    <div></div>
    <div class="my-2 grid gap-2 grid-cols-2">
      <div
        v-for="actor in props.selectedActors"
        :key="actor"
        class="flex  items-center justify-between space-x-2 text-left bg-gray-light rounded-md px-2"
      >
        <span> {{ actor.first_name + " " + actor.last_name }}</span>
        <span @click="unselectActor(actor)" class="cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            class="text-red"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="m563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8L295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512L196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1l216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            /></svg
        ></span>
      </div>
    </div>
    <!-- <button type="button" @click="showActors" class="  bg-gray-dark p-1 px-3 text-white  rounded-full">Add Actor</button> -->
  </div>
</template>