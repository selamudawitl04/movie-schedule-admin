<script setup>
import { computed } from "vue";
import {useStore} from "@/stores/index";
const store = useStore();
const router = useRouter()




const props = defineProps({
    name: null,
    resultMessage: ''
})
function adminSearch(event){
    console.log('searching for ' + event.target.value)
    store.setAdminSearchType(props.name)
    store.setAdminSearch(event.target.value)
}

const placeholder = computed(()=>{
    return `search ${props.name}`
})

const emit = defineEmits(['refresh'])
const refresh = () => {
    emit('refresh')
}


</script>

<template>
    <div>
        <div class=" flex justify-between  items-start">
            <!-- left -->
            <div>
                <!-- <h3 class=" text-2xl font-bold text-primary6">Admin/{{name}}</h3> -->
                <h3 class=" uppercase text-2xl font-bold text-primary9">{{name}} List</h3>
                <p style="max-width: 8rem;"  class=" text-primary9 font-bold">{{ resultMessage }}</p>
            </div>
            <div class=" border border-yellow-bright bg-opacity-80 rounded-md  bg-gray-dark">
                <slot name="pagination"></slot>
            </div>
           
            <div class=" border border-yellow-bright bg-opacity-80 rounded-md  bg-gray-dark">
                <slot name="status"></slot>
            </div>
            <div class=" border border-yellow-bright bg-opacity-80 rounded-md  bg-gray-dark">
                <slot name="sort"></slot>
            </div>
            <!-- right -->
            <div class=" pb-8">
                <span @click="refresh" class=" cursor-pointer px-4 text-primary9 font-bold">All {{name}}</span>
                <input pattern="[a-zA-Z0-9]+" @input="adminSearch" type="text" 
                    :placeholder="placeholder"
                    class="py-2 px-2   border-2 border-solid border-yellow-bright text-primary4   bg-gray-dark focus:bg-primary10    rounded-md"
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>