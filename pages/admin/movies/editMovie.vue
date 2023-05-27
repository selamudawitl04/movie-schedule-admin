<script setup>
import { ref , reactive} from "vue";
definePageMeta({
  layout: "adminpanel",
});

let imageNumbers = ref([])



//fetch directors from data base 
const directors = ref([])
 directors.value.push('Selamu Dawit1')
 directors.value.push('Selamu Dawit2')
 directors.value.push('Selamu Dawit3')
 directors.value.push('Selamu Dawit4')
 directors.value.push('Selamu Dawit5')
 directors.value.push('Selamu Dawit6')
 directors.value.push('Selamu Dawit6')
 directors.value.push('Selamu Dawit7')
 directors.value.push('Selamu Dawit8')




//  actors logic

//1. fetch actors from database
const actors = ref([])
actors.value.push('Yontan Tesfaye')
actors.value.push('Samuel Shimelis')
actors.value.push('Yonas Sisay')
actors.value.push('Abel Mekonin')
actors.value.push('Minase Dirba')
actors.value.push('Meron Tesfaye')
actors.value.push('Bereket Demise')
actors.value.push('Mehelat Abebe')

// 2. display actors according to search value in each key stroke
const displayedActors = ref([''])
const setDisplayedActors = (event)=>{
    const search = event.target.value
    if(search =='') return
    displayedActors.value = actors.value.filter(actor=>{
        return actor.toLowerCase().includes(search.toLowerCase())
    })
}

// display search result actors
const showActorsList = ref(false)
const showActors = ()=>{
    showActorsList.value = true
    displayedActors.value = []
}



// set actors to movie
const selectedActors = ref([''])
const setActorToMovie = (actor)=>{
    
    if(!selectedActors.value.some(selectedActor => selectedActor.toLowerCase().includes(actor.toLowerCase()))){
        selectedActors.value.unshift(actor)
        showActorsList.value = false
    }
}



// genere logic
// 1. Fetch generes from database
 const geners = ref([])
 geners.value.push('Action')
 geners.value.push('Romantic')
 geners.value.push('Adventure')
 geners.value.push('Family')
 geners.value.push('Horor')
 geners.value.push('Comedy')
 geners.value.push('Darama')


//  2. Display Genere

 const displayGenere = ref(false)
 const selectedGeneres = ref([])
 const currentGenere = ref('')

//  set genere to movies
 const addGenere = ()=>{
    if(!selectedGeneres.value.includes(currentGenere.value)){
        selectedGeneres.value.unshift(currentGenere.value)
    }
 }


// add movie
// set data 
const movie = reactive({
    title: '',
    duration: null,
    discrption: '',
    directors: null,
    images: null,
    geners: null,
    date: null,
    actors: null
});

// add movie
const handleAddMovie = ()=>{
    console.log(base64Images.value)

    // execute upload image mutation
    // set variable
    // execute add movie muation
   
}

</script>
<template>
    <div class=" w-full max-w-5xl px-6 mx-auto bg-white shadow-md rounded-sm py-10">
        <form @submit.prevent="handleAddMovie" action=""> 
            <h1 class="text-center text-3xl font-bold text-primary9 py-10 uppercase">Edit Movie</h1>
            <div class=" flex items-start justify-center space-x-10">
                <div class=" flex flex-col space-y-6">
                    <!-- title -->
                    <div class="flex flex-nowrap justify-between space-x-4">
                        <input v-model="movie.title" class=" text-primary9  py-1 " type="text" placeholder="Title" name="" id="">
                    </div>
                    <!-- duration -->
                    <div>
                        <input v-model="movie.duration" class="text-primary9 py-1" type="number" placeholder="Duration Min" name="" id="">
                    </div>
                    <!--  schedule time -->
                    <div class="flex flex-nowrap justify-between space-x-4">
                        <input v-model="movie.date"  type="datetime-local" name="" id="">
                    </div>
                    
                    <div  class=" flex flex-col">
                        <label class=" text-primary9 px-2 " for="">discrption</label>
                        <textarea v-model="movie.discrption" class=" border border-gray-dark border-solid p-2 text-primary9" name="" id="" cols="27" rows="3"></textarea>
                    </div>

                     <!-- Genere -->
                     <div class="flex justify-between space-x-10">
                        <div class=" text-primary9">
                            <p class=" text-primary9 font-bold">Generes</p>
                            <p v-for=" val in selectedGeneres" :key="val">
                             {{ val }}
                            </p>
                        </div>

                        <div class=" flex flex-col space-y-4">
                            <select @change="addGenere"  v-model="currentGenere"  class=" border p-1 text-primary9" v-if="displayGenere"  name="genere" id="genere">
                                <option class=" text-primary9" v-for=" val in geners" :key="val"  :value="val">
                                    {{ val }}
                                </option>
                            </select>
                            <button type="button" @click="displayGenere = true" class=" rounded-full  bg-gray-dark p-1 text-white ">Add Genere</button>
                        </div>    
                    </div> 
                </div>
                <div class=" flex flex-col space-y-6">

                    <!-- Director -->
                    <div class="flex justify-between w-96">
                        <label class=" text-primary9" for="director"> Director</label>
                        <select v-model="movie.director"  name="director" id="director" class=" uppercase text-primary9 border p-1">
                            <option name="director" class=" hover:bg-yellow-bright" v-for=" val in directors" :key="val" :value="val">
                                {{ val }}
                            </option>
                        </select>
                    </div>
                    <!-- Uload Images -->
                    <UploadMultiImage></UploadMultiImage>
                     <!-- Actors -->
                     <div class="flex justify-between">
                        <div class=" text-primary9">
                            <p class=" text-primary9 font-bold">Actors</p>

                            <transition-group name="actors">
                                <p class=" text-left" v-for=" val  in selectedActors" :key="val">
                                 {{ val }}
                                </p>
                            </transition-group>
                        </div>

                        <div  class=" flex flex-col text-left space-y-4">
                            <input v-if="showActorsList"  @input="setDisplayedActors" placeholder="Actor Name" type="text">
                            <div v-if="showActorsList">
                            <transition-group name="actors">
                                <p   v-for=" val in displayedActors" :key="val" @click="setActorToMovie(val)" class=" hover:bg-gray-dark cursor-pointer hover:text-white text-primary9" >
                                    {{ val }}
                                </p>
                            </transition-group>
                            </div>
                            <button type="button" @click="showActors" class="  bg-gray-dark p-1 px-3 text-white  rounded-full">Add Actor</button>
                        </div>    
                    </div>
                    <button class=" font-bold text-white bg-yellow-bright  w-full mx-auto block rounded-full p-2">Submit</button>

                </div>
            </div>
           
        </form>
    </div>
</template>

<style scoped>
input[type="text"] ,input[type="number"]{
  padding: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
  border-bottom: 1px solid rgb(220, 214, 214);
  /* border: none; */
}

input[type="text"]:focus ,input[type="number"]:focus {
  border-bottom: 3px solid #E4D804;
}

input[type="text"]:focus::placeholder ,input[type="number"]:focus::placeholder {
  transform: translate(-5px, -15px);
  transition: transform 0.3s ease-in-out;
}



input[type="datetime-local"]{
    color:#546e7a;
    padding: 0.5rem;

    border-bottom: 1px solid rgb(213, 207, 207);

}

#search-input{
    border:1px solid rgb(225, 218, 218)
}


  
  
  /* Hide the default radio button */
  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* border-radius: 50%; */
    width: 20px;
    height: 20px;
    border: 1px solid #E4D804;
  }
  
  /* Show a custom radio button */
  input[type="radio"]:before {
    content: "";

    display: block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 3.6px;
    background-color: white;
  }

  
  
  /* Show the custom radio button when it's selected */
  input[type="radio"]:checked:before {
    background-color: #546e7a;
  }

  .actors-enter-from{
    opacity: 0;
    transform: translateY(-10px);
}
.actors-enter-active{
    transition: all 0.3s ease-in;   
}

.actors-enter-to, .actors-leave-from{
    opacity: 1;
    transform: translateY(0px);
}
.actors-leave-to{
    opacity: 0;
    position: absolute;
    transform: translateY(30px);
}
.actors-leave-active{
    transition: all 0.3s ease-in;   
}
.actors-move{
    transition: transform 0.8s ease-in;
}
</style>