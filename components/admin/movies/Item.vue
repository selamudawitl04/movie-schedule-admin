<script>
export default{
    props: ['movie'],
    computed:{
        imgUrl(){
            return this.movie.image.url
        },
        directorFullName(){
            return this.movie.director.first_name + ' ' + this.movie.director.last_name
        },
        date(){
            const date = new Date(this.movie.date)
            return date.toISOString().split('T')[0]
        }
    }
}
</script>

<template>
    <tr>
        <td class=" text-gray-dark font-bold">
            <img class="w-8  rounded-md h-8 inline" :src="imgUrl" alt="Movie Image">
           {{ movie.title}}
        </td>
        <td class=" text-primary9 font-bold">{{ directorFullName }}</td>
        <td class=" text-yellow-bright font-bold">{{ movie.duration }}</td>
        <td class=" text-primary9 font-bold">{{date}}</td>
        <td class=" text-right" >
            <NuxtLink to="/admin/movies/editMovie" class=" ml-2.5 text-white font-bold bg-yellow-bright rounded-md px-3">Edit</NuxtLink>
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