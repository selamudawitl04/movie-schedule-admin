<script setup>
import { computed } from "vue";


function movePlaceholder(event){
    const element = event.target;
}
const props = defineProps({
    name: null
})




</script>

<template>
    <div>
        <div class=" flex justify-between items-center">
            <!-- left -->
            <div>
                <h3 class=" text-2xl font-bold text-primary6">Admin/{{name}}</h3>
                <h3 class=" text-2xl font-bold text-primary6">{{name}} List</h3>

            </div>
            <!-- right -->
            <div class=" pb-8">
                <input type="text" @focus="movePlaceholder" placeholder="search movies" class="py-3 px-12  border-2 border-solid border-yellow-bright   bg-gray-dark focus:bg-primary10    rounded-md">
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>