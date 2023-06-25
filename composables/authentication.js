// for authentcation login , signup and reset password and forgot password
// this mutation are executed with default client or client with no token
export default function (mutation) {
    const { mutate, onDone, loading, onError } = useMutation(
      mutation,
      () => ({
        fetchPolicy: "network-only"
      })
    );
    return {
      onError,
      mutate,
      loading,
      onDone,
    };
  }