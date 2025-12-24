/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'slunch-black': '#0D0D0D',
        'slunch-gray': '#6B6B6B',
        'slunch-gray-light': '#9A9A9A',
        'slunch-white': '#FAF9F6',
        'slunch-white-pure': '#FFFFFF',
        'slunch-lime': '#BFFF00',
        'slunch-lime-dark': '#9ACC00',
        'slunch-olive': '#3D4A3A',
        'slunch-error': '#FF4444',
      },
      fontFamily: {
        'mono': ['Space Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '2px',
        'md': '4px',
        'lg': '8px',
      },
      boxShadow: {
        'hover-shadow': '8px 8px 0 #0D0D0D',
      },
    },
  },
  plugins: [],
}

