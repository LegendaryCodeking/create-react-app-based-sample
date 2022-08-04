/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      darkblue: '#000b18',
      eggyellow: '#f0da14',
      eggyellow2: '#dcc814',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: {
        100: '#f7fafc',
        // ...
        900: '#1a202c',
      },
    },
    fontFamily: {
      //sans: ['Graphik', 'sans-serif'],
      //serif: ['Merriweather', 'serif'],
      sans: ['Montserrat'],
      serif: ['Montserrat'],
      mono: ['Montserrat'],
      display: ['Montserrat'],
      body: ['Montserrat']
    },
    extend: {},
  },
  plugins: [],
}
