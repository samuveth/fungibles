import DaisyUIPlugin from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {}
  },
  plugins: [DaisyUIPlugin],
  daisyui: {
    themes: ['lofi']
  }
}
