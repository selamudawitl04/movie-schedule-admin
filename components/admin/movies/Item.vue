<script setup>
import updateStatus from '@/graphql/movies/mutation/updateStatus.gql'
import mutation from "~/composables/mutation";

const props = defineProps({
    movieData: {
        type: Object,
        required: true
    }
})

const movie = ref({
})
movie.value = {
    ...props.movieData
}

const status = ref(['active', 'pending', 'closed'])
const imgUrl = computed(() => movie.value.image.url)
const directorFullName = computed(() => movie.value.director.first_name + ' ' + movie.value.director.last_name)
const date = computed(() => {
    const date = new Date(movie.value.date)
    return date.toISOString().split('T')[0]
})
const editPageLink = computed(() => '/admin/movies/' + movie.value.id)
const changeName = (name) => {
    if(name == 'active'){
        return 'Activate'
    }
    else if(name == 'pending'){
        return 'Pend'
    }
    else if(name == 'closed'){
        return 'Close'
    }
}
const displayAction = ref(false)

const newState = ref('')
const {mutate, onDone, loading, onError } = mutation(updateStatus, 'admin');
onDone((result) => {
    displayAction.value = false
    //  change state
    console.log('state is chnaged succefully')
    movie.value.status = newState

});
onError((error) => {
    console.log(error)
});
    
function changeStatus(state){
    displayAction.value = false
    newState.value = state
    const variables = {
        id:movie.value.id,
        state
    }
    mutate(variables)

}

// delete movies 
const showDeleteDialog = ref(false)
const deleteLoading = ref(false)
const emit = defineEmits(['delete-movie'])
function deleteMovie(){

    emit('delete-movie', movie.value.id)
    deleteLoading.value = true
    setTimeout(() => {
        deleteLoading.value = false
    }, 3000);
}
function toggleDelete(){
    showDeleteDialog.value = !showDeleteDialog.value
}

</script>

<template>
    <tr>
        <td class=" text-gray-dark font-bold">
           
            <img class="w-8  rounded-md h-8 inline" :src="imgUrl" alt="Movie Image">
           {{ movie.title}}
        </td>
        <td class=" text-primary9 font-bold">{{date}}</td>
        <td class=" text-yellow-bright font-bold">{{ movie.duration }}</td>
        <td class="  relative text-primary9 font-bold">
            <span @click="displayAction = !displayAction" class=" cursor-pointer rounded-md"  :class="movie.status">{{ movie.status }}</span>
            <span v-if="loading" a class=" absolute left-7  top-6 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent  text-yellow-bright rounded-full" role="status" aria-label="loading"></span>
            <div v-if="displayAction" class=" left-0 absolute">
                <button @click="changeStatus(state)" class="mr-2" v-for="state in status " :key="state"  >
                    <span v-if="state != movie.status">{{ changeName(state) }}</span>
                </button>
            </div>
        </td>
        <td class=" " >
            <NuxtLink :to="editPageLink" class=" py-0.5 ml-0.5  text-white font-bold bg-yellow-bright rounded-md px-3">Edit</NuxtLink>
        </td>
        <td class=" relative" >
            <button @click="toggleDelete"  class="px-1.5 ml-0.5  text-white font-bold bg-yellow-bright rounded-md ">Delete</button>
            <span v-if="deleteLoading" a class=" absolute left-9  top-6 animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent  text-primary6 rounded-full" role="status" aria-label="loading"></span>
            
            <BasePopup v-if="showDeleteDialog">
                <div class=" w-96 rounded-md bg-gray-dark absolute">
                    <div class=" relative">
                        <h3 class="rounded-md  text-2xl bg-primary4 p-4 text-center text-white font-bold">Delete Movie</h3>
                        <p class=" absolute top-4 right-0 px-4" @click="showDeleteDialog = false"> <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            class="text-yellow-bright cursor-pointer"
                            viewBox="0 0 1024 1024"
                        >
                            <path
                            fill="currentColor"
                            d="m563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8L295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512L196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1l216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                            />
                            </svg>
                        </p>
                    </div>
                    
                    <p class=" px-4 py-6 text-white text-10">Are you sure you want to delete this movie?
                        if you sure change status of movie to closed and then delete it
                    </p>
                    <div class=" flex justify-between">

                        <p class=" text-white px-4 ">Title: {{ movie.title }}</p>
                        
                    </div>
                    <div class="rounded-md  text-center">
                        <button @click="deleteMovie" class=" w-full bg-yellow-bright py-4 text-white font-bold">Delete</button>
                    </div>
                </div>
            </BasePopup>
        </td>
    </tr>
</template>
<style scoped>
td{
    padding: 1.5rem;
    text-align: left;
    /* border-bottom: 0.1px solid rgb(236, 234, 234); */
}

.active{
    display: block;
    color: green;
    /* background-color: #0bf50f; */
    width: 6rem;

}
.pending{
    width: 6rem;
    display: block;
    color: yellow;
    /* background-color: rgb(255, 200, 0); */
}
.closed{
    display: block;
    color: red;
    width: 6rem;

    /* background-color: #b91024; */
}
</style>