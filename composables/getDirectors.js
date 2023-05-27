import { defineStore } from 'pinia'
import getDirectors from '@/graphql/directors/query/getDirectors.gql'
export default function (){
    const {mutate, onDone, onError, loading} = useMutation(getDirectors, () => ({
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
}

  
        
       
  

