
import { defineStore } from 'pinia'
import getDirectors from '@/graphql/directors/query/getDirectors.gql'
export const useDirectorStore = defineStore({   
    id: 'directors',
    state: () => ({ 
        
       
        // ...state
    }),

   

    actions: {
        addDirector(director) {
           console.log('Director is added')   
        },
        removeDirector(director) {
            console.log('Director is removed')
        },
        updateDirector(director) {
            console.log('Director is updated')
        },

        loadDirectors() {
            const {mutate, onDone, onError, loading} = useMutation(loadDirectors, () => ({
                fetchPolicy: "network-only",
                clientId: "authClient",
                context: {
                  headers: {
                    "x-hasura-role": "admin",
                  }
                }
              })
            );
            return {
                mutate,
                onDone,
                onError,
                loading
            }
        },
        async loadDirector() {
           console.log('Director is loaded')
        }
        // ...actions
    }
})


