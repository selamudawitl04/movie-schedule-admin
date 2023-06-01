export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('apollo:error', (error) => {
      if (error.networkError) {
        console.log("check you network connection");
      }

      if (error.graphQLErrors) {
        console.log("graphQLErrors one");
      }

      if (error.response) {
        
        console.log("response one");
      }
  
    })
  })
  