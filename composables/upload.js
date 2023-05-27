
import uploadImage from "@/graphql/images/upload.gql"
export default function () {
    const { mutate, onDone, loading, onError } = useMutation(
      uploadImage,
      () => ({
        fetchPolicy: "network-only",
        clientId: "authClient",
  
      })
    );
    return {
      onError,
      mutate,
      loading,
      onDone,
    };
  }