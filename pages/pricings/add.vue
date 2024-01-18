<script setup>
onResult((result) => {
  pricings.value = result.data.pricings;
});

definePageMetadata({
  layout: "settings",
});
</script>
<template>
  <section class="bg-white mb-44 py-32">
    <h2 class="text-3xl font-bold text-primary9 py-8 text-center">
      Our Pricing Plan
    </h2>
    <div
      class="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8"
    >
      <div
        v-for="pricing in pricings"
        :key="pricing.id"
        class="bg-white shadow rounded-lg p-6 w-72"
      >
        <h2 class="text-xl font-medium mb-4">{{ pricing.title }}</h2>
        <p class="text-gray-600 mb-4">{{ pricing.description }}</p>
        <p class="text-3xl font-bold mb-4">{{ pricing.price }} Birr</p>
      </div>
    </div>
  </section>
</template>
