<script setup>
const router = useRouter()
const directors = reactive([])

import setDirectorList  from '@/composables/getDirectors.js'
//1. load directors
const {mutate, onDone, onError, loading} = setDirectorList()

mutate()
onDone((result)=>{
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
    <div class="flex justify-between w-96">
        <label class=" text-primary9" for="director"> Director</label>
        <select @change="setDirector" v-model="director"  name="director" id="director" class=" uppercase text-primary9 border p-1">
            <option name="director" class=" hover:bg-yellow-bright" v-for=" director in directors" :key="director.id" :value="director.id">
                {{ director.first_name + ' ' + director.last_name }}
            </option>
        </select>
    </div>
</template>