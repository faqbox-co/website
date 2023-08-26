

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins : ["Poppins", "sans-serif"],
        inter : ["Inter", "sans-serif"],
        ssp : ["Source Sans Pro", "sans-serif"]
      },
      backgroundImage:{
        "dark-smoke" : ["linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))","url(/img/dark-smoke.jpg)"],
        "light-smoke" : ["url(/img/light-smoke.jpg)"],
        "leaves" : ["url(/img/leaves.png)"],
        "koi" : ["url(/img/koi.png)"],
        "space" : ["url(/img/space.png)"]
      }
    },
  },
  plugins: [],
}
