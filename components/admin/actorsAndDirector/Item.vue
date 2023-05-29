<script>
export default{
    props: ['item','type'],
    computed:{
        imgUrl(){
            return this.item.image.url
        },
        editPageLink(){
            console.log(this.type)
            return '/admin/' + this.type + '/'+ this.item.id
        }
    }
}
</script>
<template>
    <tr >
        <td class=" text-gray-dark font-bold">
            <img class="w-8  rounded-md h-8 inline" :src="imgUrl" alt="Movie Image">
           {{ item.first_name}}
        </td>
        <td class=" text-primary9 font-bold">{{ item.last_name }}</td>
        <td class=" pl-5 text-yellow-bright  font-bold">13</td>
        <td class=" relative text-right" >
            <div class="py-1.5 absolute left-5 top-6 px-6 text-center   text-white font-bold bg-yellow-bright rounded-md ">
                <NuxtLink :to="editPageLink" class=" ">Edit</NuxtLink>
            </div>
        </td>
        <td class=" relative text-right" >
            <div  class="py-1.5 px-6 text-center absolute left-4 top-6   text-white font-bold bg-yellow-bright rounded-md  ">
                <button class=" ">Delete</button>
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