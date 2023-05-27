import uploadImage from "@/graphql/images/upload.gql"
export default function (mutation) {
    const { mutate, onDone, loading, onError } = useMutation(
      mutation,
      () => ({
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
      onError,
      mutate,
      loading,
      onDone,
    };
  }