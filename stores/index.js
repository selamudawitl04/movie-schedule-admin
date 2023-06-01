
import { defineStore } from 'pinia'
export const useStore = defineStore({   
    id: 'store',

    state: () => ({ 
        keySearch:'',
        directorSearch: '',
        filterByGenere: '',
        adminSearch: '',
    }),

    getters: {
        getAdminSearch() {
            return this.adminSearch
        },

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
       },
       setAdminSearch(word){
        this.adminSearch = word
        },
    }
})


