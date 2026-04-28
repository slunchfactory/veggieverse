/** @type {import('tailwindcss').Config} */
/**
 * VeggieVerse — 2026 브랜드 팔레트 (index.css --palette-* 와 동기)
 */
export default {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./agents/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#1a0a05',
        white: '#ffffff',
        primary: {
          DEFAULT: '#dfff4f',
          light: '#e8ff85',
          dark: '#c8e845',
          50: '#f6ffcc',
        },
        'secondary': {
          DEFAULT: '#ffab91',
          light: '#ffcbbb',
          dark: '#e89578',
        },
        'tomato': '#ffab91',
        'corn': '#fff59d',
        'eggplant': '#d1c4e9',

        'cream': '#f2eeee',
        'eggshell': '#f2eeee',

        'deep-forest': '#1a0a05',
        'charcoal': '#3d3836',
        'warm-gray': '#6b6560',
        'muted': '#9a928c',

        'palette': {
          'bg-1': '#bdbdbd',
          'bg-2': '#f2eeee',
          'bg-3': '#ffffff',
          'text': '#1a0a05',
          'accent': '#dfff4f',
          'lavender': '#d1c4e9',
          'yellow': '#fff59d',
          'tan': '#bcaaa4',
          'sky': '#81d4fa',
          'mint': '#c8e6c9',
          'orange': '#ffab91',
        },

        'slunch-black': '#1a0a05',
        'slunch-gray': '#6b6560',
        'slunch-gray-light': '#8a827c',
        'slunch-gray-lighter': '#ccc5c0',
        'slunch-white': '#f2eeee',
        'slunch-white-pure': '#ffffff',
        'slunch-lime': '#dfff4f',
        'slunch-lime-dark': '#c8e845',
        'slunch-olive': '#1a0a05',
        'slunch-error': '#ffab91',
        'slunch-warning': '#fff59d',
        'slunch-info': '#81d4fa',
      },

      fontFamily: {
        'sans': ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'primary': ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },

      fontWeight: {
        'thin': '400',
        'extralight': '400',
        'light': '400',
        'normal': '400',
        'medium': '400',
        'semibold': '400',
        'bold': '400',
        'extrabold': '400',
        'black': '400',
      },

      fontSize: {
        'display': ['48px', { lineHeight: '1.3' }],
        'h1': ['36px', { lineHeight: '1.3' }],
        'h2': ['28px', { lineHeight: '1.4' }],
        'h3': ['20px', { lineHeight: '1.4' }],
        'body': ['16px', { lineHeight: '1.7' }],
        'small': ['14px', { lineHeight: '1.6' }],
        'caption': ['12px', { lineHeight: '1.5' }],
      },

      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        'full': '9999px',
      },

      borderWidth: {
        'DEFAULT': '1px',
        '2': '2px',
      },

      borderColor: {
        'section': '#1a0a05',
        'light': 'rgba(26, 10, 5, 0.2)',
      },

      boxShadow: {
        'none': 'none',
        'sm': '0 2px 4px rgba(26, 10, 5, 0.06)',
        'DEFAULT': '0 4px 12px rgba(26, 10, 5, 0.1)',
        'focus': '0 0 0 3px #f6ffcc',
        'hover-shadow': '0 4px 12px rgba(26, 10, 5, 0.1)',
      },

      spacing: {
        '18': '72px',
        '22': '88px',
        '30': '120px',
        'section': '120px',
        'section-mobile': '80px',
        'card': '32px',
      },

      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}
