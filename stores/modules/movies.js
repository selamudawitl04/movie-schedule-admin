
import { defineStore } from 'pinia'
// const getMovies = require('@/graphql/movies/query/movies.gql')
import getMovies from '@/graphql/movies/query/getMovies.gql'

export const useMovieStore = defineStore({   
    id: 'store',
    state: () => ({ 
        movies : [
            {
                id: 'akjbwafyj2318427',
                title: 'The Women Day',
                duration: 135,
                ratings: 3.4,
                date: Date.now().toLocaleString(),
                genere: ['Romantic', 'Comedy'],
                cover_image: '',
            },
            {
                title: 'Live Under Sea',
                duration: 145,
                ratings: 3.7,
                date: Date.now().toLocaleString(),
                genere: ['Adventure', 'Horor'],
                cover_image: '',
            },
            {
                title: 'Black Sunday',
                duration: 135,
                ratings: 4.1,
                date: Date.now().toLocaleString(),
                genere: ['Trajedi', 'Comedy'],
                cover_image: '',
            },
            {
                title: 'School Boy',
                duration: 125,
                ratings: 4.7,
                date: Date.now().toLocaleString(),
                genere: ['Romantic', 'Comedy'],
                cover_image: '',
            },

        ],
        movie:{
            id: 'akjbwafyj2318427',
            title: 'The Women Day',
            duration: 135,
            ratings: 3.4,
            date: Date.now().toLocaleString(),
            generes: ['Romantic', 'Comedy'],
            cover_image: '',
            director:{
                first_name: 'John',
                last_name: 'Doe',
                image: '',

            },
            actors:[
                {
                    first_name: 'John',
                    last_name: 'Doe',
                    image: '',
                },
                {
                    first_name: 'Selemon',
                    last_name: 'Alemayehu',
                    image: '',
                },
                {
                    first_name: 'Meron',
                    last_name: 'Getenet',
                    image: '',
                }
            ],

        },
        // ...state
    }),

    // ...getters
    getters: {
        getMovies() {
            return this.movies
        },
        getMovie() {
            return this.movie
        },
    },

    actions: {
        addMovie(movie) {
           console.log('Movie is added')   

        },
        removeMovie(movie) {
            console.log('Movie is removed')
        },
        updateMovie(movie) {
            console.log('Movie is updated')
        },

        async loadMovies() {
            const {date, loading, error} =  useQuery(getMovies)
            console.log( data.value, 'Movies are loaded 0909') 
        },
        async loadMovie() {
           console.log('Movie is loaded')
        }
        // ...actions
    }
})


