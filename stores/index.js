
import { defineStore } from 'pinia'
export const useStore = defineStore({   
    id: 'store',
    state: () => ({ 
        keySearch:'',
        directorSearch: '',
        actorSearch: '',
        filterByGenere: '',
        adminSearch: '',
        adminSearchType: ''
    }),
    getters: {
        getAdminSearch() {
            return this.adminSearch
        },
        getAdminSearchType() {
            return this.adminSearchType
        },
        getKeySearch() {
            return this.keySearch
        },
        getDirectorSearch() {
            return this.directorSearch
        },
        getActorSearch() {
            return this.actorSearch
        },

        getFilterByGenere(){
            return this.filterByGenere
        }

    },

    actions: {  
       setKeySearch(word){
        this.keySearch = word
       },
       setDirectorSearch(id){
        this.directorSearch = id
       },
       setActorSearch(id){
        this.actorSearch = id
       },
       setFilterByGenere(genere){
        this.filterByGenere = genere
       },
       setAdminSearch(word){
        this.adminSearch = word
       },
        setAdminSearchType(type){
        this.adminSearchType = type
        }
            
    }
})


