/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F4FF',
          100: '#CCE9FF',
          200: '#99D3FF',
          300: '#66BDFF',
          400: '#33A7FF',
          500: '#158CFF',
          600: '#0F6ECC',
          700: '#0B5099',
          800: '#073266',
          900: '#031433',
        },
        accent: {
          50: '#FFE6FF',
          100: '#FFCCFF',
          200: '#FF99FF',
          300: '#FF66FF',
          400: '#FF33FF',
          500: '#FE2AFF',
          600: '#CC22CC',
          700: '#991999',
          800: '#661166',
          900: '#330833',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#1A1A1A',
          900: '#0A0A0A',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(21, 140, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(21, 140, 255, 0.6)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #158CFF 0%, #FE2AFF 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #E6F4FF 0%, #FFE6FF 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(21, 140, 255, 0.3)',
        'glow-lg': '0 0 60px rgba(21, 140, 255, 0.4)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'premium-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.35)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 