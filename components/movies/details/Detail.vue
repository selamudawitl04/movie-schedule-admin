<script setup>
const props = defineProps({
    movie: {
        type: Object,
        required: true
    }
})

const lastword = ref('')

const title = computed(()=> {
    const words = props.movie.title.split(' ')
    if(words.length == 0) return props.movie.title
    lastword.value = words.pop()
    return words.join(' ')
})


const date = computed(()=> {
    const date = new Date(props.movie.date)
    return date.toISOString().split('T')[0]
})
const imgUrl = computed(()=>{
  return props.movie.image.url
})


// actors and directors to display

</script>

<template>
    <div class="flex flex-col lg:flex-row lg:space-x-12 justify-center  ">
        <!-- The left Side -->
        <div class="">
            <div class="w-80 mx-auto">
                <img class="w-full h-auto" :src="imgUrl" alt="">
                <a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" class="popup-video"><img src="img/images/play_icon.png" alt=""></a>
            </div>
        </div>
        <!-- The right Side -->
        <div class=" my-6">
            <div class="">
                <h5 class=" text-yellow-bright font-bold text-2xl mb-4">New Movie</h5>
                <h2 class=" text-white text-6xl font-bold">{{title }}  <span class=" text-yellow-bright">{{ lastword }}</span></h2>
                <div class="banner-meta">
                    <ul class=" my-6 flex flex-wrap items-stretch ">
                        <span class=" bg-white mr-4 font-semibold text-primary3 p-0.5 align-baseline uppercase">Pg 18</span>
                        <span class="border-4 border-white border-solid  px-2 text-white uppercase">hd</span>
                        <p class=" text-white mx-2 py-1">
                            <a v-for="genere in props.movie.movies_generes" :key="genere.genere.id" href="#">{{ genere.genere.name }},</a>
                        </p>
                        <span class=" text-white mx-2 pt-1"><i class="far fa-calendar-alt"></i>{{ date }}</span>
                        <span class=" text-white pt-1"><i class="far fa-clock"></i>{{ props.movie.duration }} min</span>
                    </ul>
                </div>
                <p class=" text-primary5">Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod tempor.There are many
                    variations of passages of lorem
                    Ipsum available, but the majority have suffered alteration in some injected humour.</p>
                <div class=" bg-primary6 w-full mt-8 max-w-lg p-8">
                    <ul class="flex flex-wrap justify-between items-center text-primary5">
                        <li class=""><a href="#"><i class="fas fa-share-alt"></i> BookMark</a></li>
                        <li class="streaming">
                            <h6>Rate It</h6>
                        </li>
                        <router-link class="text-white   font-bold rounded-full border-4 border-solid border-yellow-bright py-2 px-6  md:px-10 text-center hover:bg-yellow-bright hover:text-gray-dark  "  to="/auth/login">Buy ticket</router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
   
  </template>

