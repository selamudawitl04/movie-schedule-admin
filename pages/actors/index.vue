<script setup>
// imports
import { ref } from "vue";
import { useStore } from "@/stores/index";
import query from "@/composables/query.js";
import getActors from "@/graphql/actors/query/getActors.gql";
import deleteActorMutation from "@/graphql/actors/mutation/deleteActor.gql";

definePageMeta({
  layout: "adminpanel",
  middleware: ["admin"],
});

const router = useRouter();
const store = useStore();
let isloading = ref(false);
let actors = ref([]);
const serverError = reactive({
  error: false,
  message: "",
});

function setActors(result) {
  actors.value = [];
  result.data.actors.forEach((actor) => {
    actors.value.push(actor);
  });
  console.log(actors.value);
  // actors.values = result.data.actors
}
// function to set Error
function setError(error) {
  serverError.error = true;
  serverError.message = error.message;
  console.log(error);
}

// this function is used to refresh the page
function refresh() {
  // construct a variable that fetch all user
  const variables = {
    query: {
      first_name: {
        _neq: "",
      },
    },
  };
  let { onResult, loading, onError, refetch } = query(getActors, variables);
  isloading = loading;
  onResult((result) => {
    setActors(result);
  });
  onError((error) => {
    setError(error);
  });
}
// if there is refresh is clicked
const getRefresh = () => {
  return store.getRefresh;
};

watch(getRefresh, (newValue, oldValue) => {
  console.log("There is actor ut refresh search");

  if (newValue) {
    console.log("There is actor from refresh search");
    refresh();
    store.setRefresh(false);
  }
});

if (store.getAdminSearch != "" && store.getAdminSearchType == "actors") {
  adminSearch(store.getAdminSearch);
} else {
  console.log("There is refresh search");
  refresh();
}

// watch if there is a search
const getAdminSearch = () => {
  return store.getAdminSearch;
};
watch(getAdminSearch, (newValue, oldValue) => {
  adminSearch(newValue);
});

function adminSearch(newValue) {
  const first_name = namesearch(newValue).first_name;
  const last_name = namesearch(newValue).last_name;

  const variables = {
    query: {
      _or: [
        {
          first_name: {
            _ilike: first_name,
          },
        },
        {
          last_name: {
            _ilike: last_name,
          },
        },
      ],
    },
  };
  let { onResult, loading, onError, refetch } = query(getActors, variables);
  isloading = loading;
  onResult((result) => {
    setActors(result);
  });
  onError((error) => {
    setError(error);
  });
}

const tobeDeletedActor = ref("");
const showCanNotDeleteAlert = ref(false);
provide("deleteActorOrDirector", (id, numberOfMovies) => {
  if (numberOfMovies > 0) {
    showCanNotDeleteAlert.value = true;
    tobeDeletedActor.value = id;
    return;
  } else {
    const { mutate, onDone, loading, onError } = mutation(
      deleteActorMutation,
      "admin"
    );
    const variables = {
      id: id,
    };
    mutate(variables);
    onDone((result) => {
      console.log("actor is deleted succefully");
      actors.value = actors.value.filter((director) => director.id != id);
    });
    onError((error) => {
      console.log(error);
      setError(error);
    });
  }
});
// this function is used to show list of movies for actor asked to deleted
function setSearch() {
  store.setActorSearch(tobeDeletedActor.value);
  router.push("/");
}
// table header
const headers = [
  "FirstName",
  "LastName",
  "Number of Movie",
  "Update",
  "Delete",
];
</script>
<template>
  <BaseDialog
    :show="!!serverError.error"
    :title="serverError.message"
    @close="serverError.error = false"
  >
    Please check your internet connection and try again
  </BaseDialog>
  <BaseSpinner v-if="isloading"></BaseSpinner>
  <LayoutSubHeader @refresh="refresh" name="actors"></LayoutSubHeader>
  <div v-if="actors.length > 0">
    <ActordirectorList type="actors" :items="actors"></ActordirectorList>
  </div>
  <div
    v-if="actors.length == 0 && !isloading"
    class="bg-movie-gray-900 p-6 text-center text-white font-bold"
  >
    <p>No Actors Found</p>
  </div>
  <div>
    <BaseDialog
      :show="showCanNotDeleteAlert"
      title="Alert"
      @close="showCanNotDeleteAlert = false"
    >
      This actor can not be deleted because he has movies
      <p
        @click="setSearch"
        class="text-green cursor-pointer underline font-bold"
      >
        his/her movies
      </p>
    </BaseDialog>
  </div>
</template>
