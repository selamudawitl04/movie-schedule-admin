<template>
    <header class="px-4 z-50  bg-primary1 fixed top-0 left-0 right-0">
      <nav class="flex justify-between container mx-auto  items-center py-6">
        <div class="left"  >
          <NuxtLink to="/" class="app-logo-and-name">
            <img class="home-image" src="../../assets/img/logo.png" alt="">
            
          </NuxtLink>
          <!-- <img src="../../assets/search.jpg" alt="search icon"> -->
        </div>
        <ul class=" hidden    lg:flex space-x-6 ">
          <li >
            <NuxtLink active-class=" text-yellow-bright" class=" text-white font-bold   " to="/">HOME</NuxtLink>
          </li>
          <li  class=" text-white font-bold">
            <NuxtLink to="/">GENERE</NuxtLink>
          </li>
          <li  class=" text-white font-bold">
            <NuxtLink to="/">CONTACTS</NuxtLink>
          </li>
        </ul>
        <!-- for search bar -->
        <div class="hidden search-input-and-icon md:block">
            <input placeholder="any keyword" class="py-3 px-12  bg-gray-dark focus:bg-white    rounded-full">
        </div>
        <div  class=" ">
          <NuxtLink class="hidden lg:block text-white  bg-primary2 font-bold rounded-full border-4 border-solid border-yellow-bright py-2 px-8 hover:bg-yellow-bright hover:text-gray-dark"  to="/auth/login">SIGN IN</NuxtLink>
        </div>
        <div class="flex flex-col space-y-2 lg:hidden">
          <span class="w-8 bg-white h-1"></span>
          <span class="w-8 bg-white h-1"></span>
          <span class="w-8 bg-white h-1"></span>
        </div>
      </nav>
    </header>
    <div>
      
    </div>
  </template>
  
  <script setup>
  
  </script>
  
  
  