
<template>
    <div class="slideshow relative">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="absolute  top-0 left-0 w-full h-full opacity-0 transition-opacity duration-1000"
        :class="{ 'translate-x-9, opacity-100': index === currentIndex, 'translate-x-full': index !== currentIndex }"
    >
      >
        <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          { src: 'https://www.myhealthyclick.com/wp-content/uploads/2020/04/netflix.jpg', alt: 'Image 1' },
          { src: 'https://th.bing.com/th/id/OIP.33wkmGay3jtQ7uhNbrX2vgHaNb?pid=ImgDet&w=183&h=331&c=7', alt: 'Image 2' },
          { src: 'https://th.bing.com/th/id/OIP.7VdwW7SptPAf8zgWlcspTQHaHa?pid=ImgDet&w=183&h=183&c=7', alt: 'Image 3' },
        ],
        currentIndex: 0,
      };
    },
    mounted() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 3000);
    },
  };
  </script>
  
  <style>
  .slideshow {
    width: 300px;
    height: 400px;
  }
  </style>

<!-- 
<template>
    <h3>Image Slide Show</h3>
    <div class=" w-2/4 mx-auto">
        <div class="slideshow">
            <img src="@/assets/img/ucm_poster01.jpg" alt="Image 1">
            <img src="@/assets/img/ucm_poster02.jpg" alt="Image 1">
            <img src="@/assets/img/ucm_poster03.jpg" alt="Image 1">
        </div>
    </div>
</template>

<style scoped>
.slideshow {
  width: 300px;
  height: 400px;
  white-space: nowrap;
  overflow: hidden;
}

img {
  display: inline-block;
  width: 300px;
  height: 400px;
  animation: slide 10s ease-in infinite;
}

@keyframes slide {
  0% {
    transform: translateX(0%);
  }
  33%{
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(-200%);
  }
}

</style> -->