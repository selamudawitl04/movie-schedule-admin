<script setup>
// ticket

</script>

<template>
    <main class="h-screen w-full flex flex-col justify-center items-center bg-gray-dark">
	<h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
	<div class="bg-yellow-bright text-white font-bold px-2 text-sm rounded rotate-12 absolute">
		Page Not Found
	</div>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-yellow-bright group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-gray-dark border border-yellow-bright">
          <router-link to="/">Go Home</router-link>
        </span>
      </a>
    </button>
</main>
</template>

<style scoped></style>