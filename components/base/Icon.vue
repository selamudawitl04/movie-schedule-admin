<script setup>
const props = defineProps({
    path: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'text-white'
    }
})
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" 
        width="20"
        height="20"
        class="mr-2.5 inline-block cursor-pointer"
        :class="color"
        viewBox="0 0 24 24">
        <path
            fill="currentColor"
            :d="path"
        />
    </svg>
    
</template>