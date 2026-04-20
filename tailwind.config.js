/** @type {import('tailwindcss').Config} */
/**
 * Slunch Design System v2 - Tailwind Configuration
 * "실선과 여백이 만드는 시원한 개방감 + 신선한 채소의 생동감"
 */
export default {
  /* 기존 index.css 디자인 시스템과 충돌 방지 (Tailwind 리셋 비활성화) */
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
        /* Primary - Fresh Veggie Green (신선한 채소 그린) */
        'primary': {
          DEFAULT: '#3fa945',
          light: '#6B9B7A',
          dark: '#365E43',
          50: '#F0F5F1',
        },

        /* Secondary - Carrot Orange (당근 오렌지) */
        'secondary': {
          DEFAULT: '#E07B39',
          light: '#F4A261',
          dark: '#C45D1E',
        },

        /* Accent - Vivid Points (비비드 포인트) */
        'tomato': '#D64545',
        'corn': '#F2C94C',
        'eggplant': '#7B5EA7',

        /* Background - Warm Cream (오끼뜨 감성) */
        'cream': '#FDFBF7',
        'eggshell': '#F7F4EF',

        /* Text & Line - Pure Black */
        'deep-forest': '#000000',
        'charcoal': '#3D3D3D',
        'warm-gray': '#6B6B6B',
        'muted': '#A0A0A0',

        /* Legacy aliases for compatibility */
        'slunch-black': '#000000',
        'slunch-gray': '#6B6B6B',
        'slunch-gray-light': '#9A9A9A',
        'slunch-gray-lighter': '#D4D4D4',
        'slunch-white': '#FDFBF7',
        'slunch-white-pure': '#FFFFFF',
        'slunch-lime': '#3fa945',
        'slunch-lime-dark': '#365E43',
        'slunch-olive': '#365E43',
        'slunch-error': '#D64545',
        'slunch-warning': '#F2C94C',
        'slunch-info': '#7B5EA7',
      },

      fontFamily: {
        /* Pretendard Only - KBP 스타일 산세리프 통일 */
        'sans': ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'primary': ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },

      /* NO BOLD RULE - 모든 font-weight를 400으로 통일 */
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
        'section': '#000000',
        'light': 'rgba(0, 0, 0, 0.2)',
      },

      boxShadow: {
        /* Flat Design - 최소화된 그림자 */
        'none': 'none',
        'sm': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'focus': '0 0 0 3px #F0F5F1',
        /* Legacy alias */
        'hover-shadow': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },

      spacing: {
        /* Section Spacing - 과감하게 넓은 여백 */
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
