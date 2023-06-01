<script setup>
import { computed } from "vue";
import {useStore} from "@/stores/index";
const store = useStore();


function adminSearch(event){
    store.setAdminSearch(event.target.value)
}
const props = defineProps({
    name: null
})

const placeholder = computed(()=>{
    return `search ${props.name}`
})

</script>

<template>
    <div>
        <div class=" flex justify-between items-center">
            <!-- left -->
            <div>
                <!-- <h3 class=" text-2xl font-bold text-primary6">Admin/{{name}}</h3> -->
                <h3 class=" uppercase text-2xl font-bold text-primary9">{{name}} List</h3>

            </div>
            <!-- right -->
            <div class=" pb-8">
                <input @input="adminSearch" type="text" @focus="movePlaceholder"
                    :placeholder="placeholder"
                    class="py-3 px-12  border-2 border-solid border-yellow-bright text-primary4   bg-gray-dark focus:bg-primary10    rounded-md"
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>