<template>
    <button v-if="!link" :class="mode" :type="type">
      <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
      <slot></slot>
    </router-link>
  </template>
  
  <script>
  export default {
    props: {
      mode: {
        type: String,
        required: false,
        default: null
      },
      link: {
        type: Boolean,
        required: false,
        default: false
      },
      to: {
        type: String,
        required: false,
        default: '/'
      },
      type:{
        type:String,
        required: false,
        default: 'submit'
      }
    }
  }
  </script>
  
  <style scoped>
  button,
  a {
    text-decoration: none;
    padding: 0.5rem 1rem;
    font: inherit;
    background-color: #E4D804;
    color: white;
    /* color: #DAD7DA; */
  
    cursor: pointer;
    width: 100%;
    border: none;
    border-radius: 5px;
    margin: 0.3rem;
    display: inline-block;
  }
  
  a:hover,
  a:active,
  button:hover,
  button:active {
    opacity: 1;
  }
  
  .auth {
   
    margin: .5rem auto;
    opacity: 0.8;
  }
  
  .card {
    background-color: #E5E5E5;
    color: rgb(50, 48, 48);
  }
  
  .flat:hover,
  .flat:active,
  .card:hover,
  .card:active {
    background-color: #E4D804;
    color: white;
  
  }
  </style>
