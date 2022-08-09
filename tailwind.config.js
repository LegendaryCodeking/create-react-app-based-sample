/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      darkblue: '#000b18',
      lightblue: '#ade6e6',
      eggyellow: '#f0da14',
      eggyellow2: '#dcc814',
      transparent: 'transparent',
      gradient: {
        start: '#dcdc1f',
        end: '#22fafa'
      },
      black: '#000',
      white: '#fff',
      red: 'red',
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
  plugins: [
    require('flowbite/plugin')
  ],
}
