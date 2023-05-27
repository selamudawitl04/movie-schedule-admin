
import { defineStore } from 'pinia'
export const useGenereStore = defineStore({   
    id: 'store',
    state: () => ({ 
        generes:[
            {
                id: 'tjasIR987654V',
                genere: 'Commedy'
            },
            {
                id: 'tjaczlLSASJLsIR987654V',
                genere: 'Romantic',
            },
            {
                id: 'tjasIlasdaR987654V',
                genere: 'Animation'
            },
            {
                id: 'tjaczcsalLSASJLsIR987654V',
                genere: 'Tragedy',
                
            },
            {
                id: 'tjasIR987654V',
                genere: 'Horor'
            },
            {
                id: 'tjaczlLSASJLsIR987654V',
                genere: 'Romantic',
                
            },
            {
                id: 'tjasIR9vrest87654V',
                genere: 'Adventure'
            },
            {
                id: 'tjaczlczcLSASJLsIR987654V',
                genere: 'Family',
                
            },
            {
                id: 'tjasqwe65IR987654V',
                genere: 'Drama'
            },
            {
                id: 'tjaczlcasLSASJLsIR987654V',
                genere: 'Battle',
                
            },
        ],
       
        // ...state
    }),

    // ...getters
    getters: {
        getGeneres() {
            return this.generes
        }
    },

    actions: {
        addGenere(Genere) {
           console.log('Genere is added')   
        },
        removeGenere(Genere) {
            console.log('Genere is removed')
        },
        updateGenere(Genere) {
            console.log('Director is updated')
        },

        async loadGeneres() {
            console.log('Generes are loaded')
        }
        // ...actions
    }
})


