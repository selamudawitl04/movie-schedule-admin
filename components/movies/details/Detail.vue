<script setup>
import {useStore} from "~/stores/index"
import { useAuthStore } from "~/stores/modules/auth";
import mutation from "~/composables/mutation";
import bookMovie from "~/graphql/bookings/bookmovie.gql"
import rateMovie from "~/graphql/ratings/rate.gql"
import buy from "~/graphql/tickets/buy.gql"

const router = useRouter()
const store  = useStore()
const authStore = useAuthStore()
const props = defineProps({
    movie: {
        type: Object,
        required: true
    }
})

const tickets = ref([])
props.movie.tickets.forEach((ticket) => {
    tickets.value.push(ticket.seat_number)
})

const lastword = ref('')
const title = computed(()=> {
    const words = props.movie.title.split(' ')
    if(words.length == 0) return props.movie.title
    lastword.value = words.pop()
    return words.join(' ')
})

function filterMoviesByGenere(genere){
    console.log('Slele gene', genere)
    store.setFilterByGenere(genere)
    router.push({
        path: '/',
        hash: '#movieslist'
    })
}

const date = computed(()=> {
    const date = new Date(props.movie.date)
    return date.toISOString().split('T')[0]
})
const imgUrl = computed(()=>{
  return props.movie.image.url
})

const successAlert = ref(false)
const alertMessage = ref('')


// booking
const {mutate, onDone, loading, onError } = mutation(bookMovie, 'user');

const book = () => {
    if(authStore.isLoggedIn){
        const variables = {   
        data:{
            user_id: authStore.getUserId,
            movie_id: props.movie.id,
        }
    }
        mutate(variables)
    }else{
        router.push('/auth/login')
    }
}

onDone((result) => {
    alertMessage.value = "Movie is Booked Succfully"
    successAlert.value = true
    setTimeout(() => {
        successAlert.value = false
    }, 5000);
    
});

onError((error) => {
    console.log(error)
    alertMessage.value = "Movie was already Booked"
    successAlert.value = true
    setTimeout(() => {
        successAlert.value = false
    }, 5000);
});

// rating
const {mutate:ratingMutate, onDone:ratingDone, loading:ratingLoading, onError:ratingOnError } = mutation(rateMovie, 'user');

const rate = (rating) => {
    if(authStore.isLoggedIn){
        const variables = {   
        data:{
            rating,
            user_id: authStore.getUserId,
            movie_id: props.movie.id,
        }
    }
        ratingMutate(variables)
    }else{
        router.push('/auth/login')
    }
}
ratingDone((result) => {
    alertMessage.value = "Movie is Rated Succfully"
    successAlert.value = true
    setTimeout(() => {
        successAlert.value = false
        location.reload()
    }, 3000);
    
});

ratingOnError((error) => {
    console.log(error)
    alertMessage.value = "Movie was already Rated"
    successAlert.value = true
    setTimeout(() => {
        successAlert.value = false
    }, 5000);
});

const displayTicketForm = ref(false)

function showBuyForm(){
    if(authStore.isLoggedIn){
        displayTicketForm.value = true
    }else{
        router.push('/auth/login')
    }
}


const {mutate:buyMutate, onDone:buyOnDone, loading:byLoading, onError:buyOnError } = mutation(buy, 'user');

const selectedSeat = ref()
const buyTicket = (seat) => {
    selectedSeat.value = seat
    if(authStore.isLoggedIn){
        const variables = {   
            data:{
                seat_number: seat,
                price: 150,
                user_id: authStore.getUserId,
                movie_id: props.movie.id,
            }
        }
        buyMutate(variables)
        
    }else{
        router.push('/auth/login')
    }
}

buyOnDone((result) => {
    displayTicketForm.value = false
    alertMessage.value = "Ticket is Bought Succfully"
    successAlert.value = true
    tickets.value.push(selectedSeat.value)
    setTimeout(() => {
        successAlert.value = false
    }, 5000);
    
});
buyOnError((error) => {
    console.log(error)
    alertMessage.value = "Some thing Wrong Happened"
    successAlert.value = true
    setTimeout(() => {
        successAlert.value = false
    }, 5000);
});


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
                            <span class=" hover:text-yellow-bright cursor-pointer"  v-for="genere in props.movie.movies_generes" 
                                :key="genere.genere.id" href="#"
                                @click="filterMoviesByGenere(genere.genere.name)"
                                >{{ genere.genere.name }},
                            </span>
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
                        <li @click="book" class=" relative"><p class=" relative hover:text-yellow-bright cursor-pointer"><i class="fas fa-share-alt"></i> 
                            BookMark</p>
                            <span v-if="loading" class="z-50 left-5  -top-1  absolute animate-spin text-9xl inline-block w-8 h-8 border-[3px] border-current border-t-transparent  text-yellow-bright rounded-full" role="status" aria-label="loading"></span>
                        </li>
                        <div class=" flex flex-col items-center relative">
                            <h6 class=" absolute -top-2">3.4</h6>
                            <div class="rating self-center ">
                                <input  @click="rate(5)"  type="radio" name="rating" value="5" id="5"><label for="5">☆</label>
                                <input   @click="rate(4)" type="radio" name="rating" value="4" id="4"><label for="4">☆</label>
                                <input   @click="rate(3)" type="radio" name="rating" value="3" id="3"><label for="3">☆</label>
                                <input   @click="rate(2)" type="radio" name="rating" value="2" id="2"><label for="2">☆</label>
                                <input   @click="rate(1)" type="radio" name="rating" value="1" id="1"><label for="1">☆</label>
                           </div>
                        </div>
                        
                        <button @click="showBuyForm" class="text-white   font-bold rounded-full border-4 border-solid border-yellow-bright py-2 px-6  md:px-10 text-center hover:bg-yellow-bright hover:text-gray-dark  " >Buy ticket</button>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <TicketsForm v-if="displayTicketForm" @buy-ticket="buyTicket" :tickets="tickets"></TicketsForm>
    <BaseAlert v-if="successAlert" :message="alertMessage"></BaseAlert>
  </template>
  <style scoped>
.rating {
display: flex;
flex-direction: row-reverse;
justify-content: center;
}


.rating > input{ display:none;}

.rating > label {
position: relative;
font-size: 35px;
color: #ff7700;
cursor: pointer;
}

.rating > label::before{
content: "\2605";
position: absolute;
opacity: 0;
}

.rating > label:hover:before,
.rating > label:hover ~ label:before {
opacity: 1 !important;
}

.rating > input:checked ~ label:before{
opacity:1;
}

.rating:hover > input:checked ~ label:before{ opacity: 0.4; }
  </style>

