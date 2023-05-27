
<script  setup>
const query = gql`
  query getUser {
    user {
      id
      first_name
    }
  }
`

const { data } = await useAsyncQuery(query)
</script>


<template>
    <p>There are {{ data?.ships?.length || 0 }} ships.</p>
</template>
  
 