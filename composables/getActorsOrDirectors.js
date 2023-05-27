
export default function (query){
  const { onResult, loading, onError, refetch } = useQuery(query, () => ({
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
        refetch,
        onResult,
        onError,
        loading
    }
}
   