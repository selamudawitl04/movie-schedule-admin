<script>
export default{
    props: ['director'],
    computed:{
        imgUrl(){
            return this.director.image.url
        },
    }
}
</script>

<template>
    <tr>
        <td class=" text-gray-dark font-bold">
            <img class="w-8  rounded-md h-8 inline" :src="imgUrl" alt="Movie Image">
           {{ director.first_name}}
        </td>
        <td class=" text-primary9 font-bold">{{ director.last_name }}</td>
        <td class=" pl-5 text-yellow-bright  font-bold">13</td>
        <td class=" text-right" >
            <NuxtLink to="/admin/directors/editDirector" class=" p-0.5 ml-2.5 text-white font-bold bg-yellow-bright rounded-md px-3">Edit</NuxtLink>
        </td>
        <td class=" text-right" >
            <button class=" ml-2.5 text-white font-bold bg-yellow-bright rounded-md px-3">Delete</button>
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