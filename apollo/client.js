// graphql client with auth token
import { defineApolloClient } from "@nuxtjs/apollo";
export default defineApolloClient({
  httpEndpoint: process.env.GRAPHQL_ENDPOINT,
  tokenStorage: "cookie",
  authType: "Bearer",
  authHeader: "Authorization",
  tokenName: 'auth_token',
});
