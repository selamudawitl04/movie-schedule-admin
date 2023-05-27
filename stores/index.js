
// import { defineStore } from 'pinia'
export const useCounterStore = defineStore({   
    id: 'store',

    state: () => ({ 
        counter: 0,
        // ...state
    }),

    getters: {
        getCounter() {
            return this.counter
        },
        // ...getters
    },

    actions: {
        increment() {
            this.counter++
        },
        

        // ...actions
    }
})


