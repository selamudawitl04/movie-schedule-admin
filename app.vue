<script setup>
import { useAuthStore } from './stores/modules/auth';
const authStore = useAuthStore()
authStore.autoLogin()
</script>

<template>
    <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
</template>

<style >
*{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
      outline: none;
      list-style: none;
      text-decoration: none;
      transition: all 0.3s ease;
  }
  body, html{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
  }
  .custom-shadow{
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
}

</style>
