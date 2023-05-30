
import { defineStore } from 'pinia'
export const useStore = defineStore({   
    id: 'store',

    state: () => ({ 
        keySearch:'',
        directorSearch: '',
        filterByGenere: ''
    }),

    getters: {
        getKeySearch() {
            return this.keySearch
        },
        getDirectorSearch() {
            return this.directorSearch
        },
        getFilterByGenere(){
            return this.filterByGenere
        }
    },

    actions: {
       setKeySearch(word){
        this.keySearch = word
       },
       setDirectorSearch(name){
        this.directorSearch = name
       },
       setFilterByGenere(genere){
        this.filterByGenere = genere
       }
    }
})


