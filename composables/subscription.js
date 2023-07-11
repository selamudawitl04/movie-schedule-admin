// for authentcated user

// import {useAuthStore} from '@/stores/modules/auth'
// const authStore = useAuthStore()
export default function (query,variables){
    const { onResult, loading, onError, refetch } = useSubscription(query, variables, () => ({
          fetchPolicy: "network-only",

          clientId: "authClient",
          context: {
            headers: {
              authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODg1ODY1MzksImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImJhNjEwMWQ1LWY2NDctNDNjZS04YTE4LTYyOGI4NTU5ODQxOCJ9LCJpYXQiOjE2ODg0MTM3MzksInN1YiI6IjEyMzQ1In0.m3GEe3VkktR2PQesBRkdiWrM55-ds36yQmB0klfQSJ4"
              // "x-hasura-user-id": "ba6101d5-f647-43ce-8a18-628b85598418"
            }
          }
        })
      );

      return {
          refetch,
          onResult,
          onError,
          loading
      }
  }
     