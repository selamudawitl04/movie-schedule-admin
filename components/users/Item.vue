<script setup>
// this component is used as table row for each actor or director
import {useStore} from "@/stores/index";
const router = useRouter()
const store = useStore()

// this props contains two datas, the first one is user data which is either the director or actor 
// the second one is type which is either actors or directors just for edit page links

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const detailLink = computed(()=>{
    return '/users/'+ props.user.id
})

const numberOfTicket = computed(()=>{
    return props.user.tickets_aggregate?.aggregate?.count
})

const ids = ref([])

const setUserId = inject('setUsersId')
const removeUsersId = inject('removeUsersId')

watch(ids, (newValue, oldValue)=>{
    if(newValue.length>0){
        setUserId(ids.value[0])
    }
    else{
        removeUsersId(oldValue[0])
    }
})




      


</script>
<template>
    <tr >
        <td class=" flex items-center space-x-1 text-gray-dark font-bold">
            <input :value="user.id" class="px-4"  v-model="ids"  type="checkbox" name="ids" id="ids">
            <NuxtLink :to="detailLink">
                <span>
                {{ user.firstName}}
            </span>
            </NuxtLink>
            
        </td>
        <td class=" text-primary9 cursor-pointer font-bold">
            <NuxtLink :to="detailLink">
               
                {{ user.lastName }}
            </NuxtLink>
        </td>
        <td  class=" text-gray-dark cursor-pointer  pl-5  font-bold">
            <NuxtLink :to="detailLink">
                <span>
                {{ user.email}}
            </span>
            </NuxtLink>
        </td>
        <td  class=" text-primary9 cursor-pointer  pl-5  font-bold">{{ numberOfTicket }} tickets</td>

        <td class=" relative text-right" >
            <div  class=" px-4 text-center absolute left-4 top-6   text-white font-bold bg-gray-dark rounded-md  ">
                <button disabled class=" ">active</button>
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