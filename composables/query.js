export default function (query){
    const { onResult, loading, onError, refetch } = useQuery(query, () => ({
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
     