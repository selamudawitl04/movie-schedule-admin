<script setup>
const router = useRouter()
const directors = reactive([])

import setDirectorList  from '~/composables/getActorsOrDirectors.js'
import getDirectors from '@/graphql/directors/query/getDirectors.gql'
//1. load directors
const { onResult, loading, onError, refetch } = setDirectorList(getDirectors)
onResult((result)=>{
    result.data.directors.forEach((director)=>{
        directors.push(director)
    })
})
onError((error)=>{
    console.log(error, 'error')
    router.push('/error')
})

// selecting director
const emit = defineEmits(['set-director']);
const director = ref('')
const setDirector = ()=>{
    emit('set-director', director.value)
}
</script>
<template>
    <div class="flex flex-col ">
        <label class=" text-primary9 font-bold" for="director"> Director</label>
        <select @change="setDirector" v-model="director"  name="director" id="director" class="border-2 p-2 border-gray rounded-md">
            <!-- <option v-if="loading" selected value="loading">List is Loading ...</option> -->
            <!-- <option v-if="directors.length == 0" selected value="no-data">Unable to Fetch Data ...</option> -->
            <option name="director" class=" hover:bg-yellow-bright" v-for=" director in directors" :key="director.id" :value="director.id">
                {{ director.first_name + ' ' + director.last_name }}
            </option>
        </select>
    </div>
</template>