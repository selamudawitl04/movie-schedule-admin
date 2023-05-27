/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      'sm': '380px',
      // => @media (min-width: 640px) { ... }

      'md': '570px',
      // => @media (min-width: 768px) { ... }

      'lg': '990px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'header-bg': "url('./assets/images/header-bg.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
    colors: {
      'blue': '#1fb6ff',
      'white': '#ffffff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'red': '#ff0000',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'primary1': '#171d22',
      'primary2': '#12151E',
      'primary3': '#100e17',
      'primary4': '#444',
      'primary5': '#bcbcbc',
      'primary6': '#242C38',
      'primary7': '#435056',
      'primary8': '#78909c',
      'primary9': '#546e7a',
      'primary10': '#F5F7F8',
      'yellow-bright': '#E4D804'
    }
  },
  plugins: [],
}
