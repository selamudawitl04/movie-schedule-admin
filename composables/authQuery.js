export default function (query, role, variables){
    const { onResult, loading, onError, refetch } = useQuery(query, variables, () => ({
          fetchPolicy: "network-only",
          clientId: "authClient",
          context: {
            headers: {
              "x-hasura-role": role,
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
     