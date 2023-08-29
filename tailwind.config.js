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
      slabtext: "#f7f5f5",
      subwhite: "#9ca3af",
      transparent: 'transparent',
      gradient: {
        start: '#dcdc1f',
        end: '#22fafa'
      },
      black: '#000',
      white: '#fff',
      red: 'red',
      cream: '#fafad0',
      lightblue: '#22ffff',
      mediumblue: "#131823",
      modalblue: 'rgb(21 27 41)',
      gray: {
        100: '#f7fafc',
        disabled: "rgb(107 114 128)",
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
    extend: {
      height: {
        128: "64rem"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
