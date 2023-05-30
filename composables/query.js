export default function (query, variables){
    const { onResult, loading, onError, refetch } = useQuery(query,variables, () => ({
          fetchPolicy: "network-only",
        })
      );
      return {
          refetch,
          onResult,
          onError,
          loading
      }
  }
     