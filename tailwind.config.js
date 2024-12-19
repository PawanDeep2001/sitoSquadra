module.exports = {
  content: [
    './src/**/*.{js,jsx}',
    'node_modules/flowbite/**/*.js' // Aggiungi questa linea per Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Aggiungi il plugin di Flowbite
  ],
}