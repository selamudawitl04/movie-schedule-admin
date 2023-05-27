
import { defineStore } from 'pinia'
export const useActorStore = defineStore({   
    id: 'actor',
    state: () => ({ 
        actors:[
            {
                id: 'tjasIR987654V',
                first_name: 'John',
                last_name: 'Doe',
                image: '',
            },
            {
                id: 'tjaczlLSASJLsIR987654V',
                first_name: 'Selemon',
                last_name: 'Alemayehu',
                image: '',
            },
            {
                id: 'tj45aCFNZvJasIR987654V',
                first_name: 'Meron',
                last_name: 'Getenet',
                image: '',
            },
            {
                id: 'tj45aCFNZadSFVFGvJasIR987654V',
                first_name: 'Abebe',
                last_name: 'Emran',
                image: '',
            },
            {
                id: 'tj45aCFNZadSFVFGvJasIR987654V',
                first_name: 'Bezabi',
                last_name: 'Yakob',
                image: '',
            }
        ],
       
        // ...state
    }),

    // ...getters
    getters: {
        getActors() {
            return this.actors
        }
    },

    actions: {
        addActor(actor) {
           console.log('Director is added')   
        },
        removeActor(actor) {
            console.log('Director is removed')
        },
        updateActor(Actor) {
            console.log('Actor is updated')
        },

        async loadActors() {
            console.log('Actors are loaded')
        },
        async loadActor() {
           console.log('Director is loaded')
        }
        // ...actions
    }
})


