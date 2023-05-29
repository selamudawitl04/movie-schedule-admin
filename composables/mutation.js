
export default function (mutation, role) {
    const { mutate, onDone, loading, onError } = useMutation(
      mutation,
      () => ({
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
      onError,
      mutate,
      loading,
      onDone,
    };
  }