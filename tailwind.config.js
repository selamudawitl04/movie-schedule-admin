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
      sm: "380px",
      // => @media (min-width: 640px) { ... }

      md: "570px",
      // => @media (min-width: 768px) { ... }

      lg: "990px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        "header-bg": "url('./assets/images/header-bg.png')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
    colors: {
      blue: "#1fb6ff",
      white: "#ffffff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      red: "#ff0000",
      green: "#13ce66",
      yellow: "#ffc82c",
      gray: "#8492a6",
      primary1: "#171d22",
      primary2: "#12151E",
      primary3: "#100e17",
      primary4: "#444",
      primary5: "#bcbcbc",
      primary6: "#242C38",
      primary7: "#435056",
      primary8: "#78909c",
      primary9: "#546e7a",
      primary10: "#F5F7F8",
      primary: {
        50: "#fcfee8",
        100: "#f8ffc2",
        200: "#f6ff88",
        300: "#f9ff44",
        400: "#fefb11",
        500: "#e4d804", //BASE
        600: "#cdb201",
        700: "#a48004",
        800: "#87640c",
        900: "#735210",
        950: "#432c05",
      },
      "movie-gray": {
        50: "#f5f7fa",
        100: "#eaeef4",
        200: "#d0dbe7",
        300: "#a7bcd2",
        400: "#7898b8",
        500: "#577da0",
        600: "#436386",
        700: "#37506d",
        800: "#31445b",
        900: "#273444",
        950: "#1e2733",
      },
    },
  },
  plugins: [],
};
