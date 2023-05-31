<template>
    <teleport to="body">
        <transition name="book">
            <div 
                class=" top-28 right-4 text-white font-bold bg-gray-dark p-4 fixed ">
                <p>{{ message }}</p>
            </div>
        </transition>
    </teleport>
</template>
<script>
export default{
    props: ['message']
}
</script>