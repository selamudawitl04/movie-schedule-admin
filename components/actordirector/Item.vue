<script setup>
// this component is used as table row for each actor or director
import {useStore} from "@/stores/index";
const router = useRouter()
const store = useStore()

// this props contains two datas, the first one is item data which is either the director or actor 
// the second one is type which is either actors or directors just for edit page links

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

const imgUrl = computed(() => props.item.image.url)
const editPageLink = computed(() => props.type + '/'+ props.item.id)

      
// this function is used to set the search value in the store
function setSearch(){
    if(props.type == 'actors'){
        store.setActorSearch(props.item.id)
    }else[
        store.setDirectorSearch(props.item.id)
    ]
    router.push('/')
}

const deleteActorOrDirector = inject('deleteActorOrDirector')
const deleteItem = () => {
    console.log(props.item.no_of_movie, 'number of movies')
    deleteActorOrDirector(props.item.id, props.item.no_of_movie)
}
</script>
<template>
    <tr >
        <td class=" text-gray-dark font-bold">
            <img class="w-8  rounded-md h-8 inline" :src="imgUrl" alt="Movie Image">
           {{ item.first_name}}
        </td>
        <td class=" text-primary9 font-bold">{{ item.last_name }}</td>
        <td @click="setSearch"  class=" text-gray-dark cursor-pointer  pl-5  font-bold">{{ item.no_of_movie || 0 }} movies</td>
        <td class=" relative text-right" >
            <div class=" absolute left-5 top-6 px-4 text-center   text-white font-bold bg-gray-dark rounded-md ">
                <NuxtLink :to="editPageLink" class=" ">Edit</NuxtLink>
            </div>
        </td>
        <td class=" relative text-right" >
            <div  class=" px-4 text-center absolute left-4 top-6   text-white font-bold bg-gray-dark rounded-md  ">
                <button @click="deleteItem" class=" ">Delete</button>
            </div>
        </td>
    </tr>
</template>
<style scoped>
td{
    padding: 1.5rem;
    text-align: left;
    border-bottom: 0.1px solid rgb(236, 234, 234);
}
</style>
