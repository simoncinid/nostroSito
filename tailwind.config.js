/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Branding Orange #E85002 + scale */
        primary: {
          50: '#FFF4ED',
          100: '#FFE4D6',
          200: '#FFC9B3',
          300: '#FFA380',
          400: '#F16001',
          500: '#E85002',
          600: '#C10801',
          700: '#A30701',
          800: '#720500',
          900: '#4D0300',
        },
        accent: {
          50: '#FDF5F0',
          100: '#F9E6DB',
          200: '#F2D0B8',
          300: '#E8B08C',
          400: '#D9C3AB',
          500: '#F16001',
          600: '#C10801',
          700: '#991999',
          800: '#661166',
          900: '#000000',
        },
        /* White #F9F9F9, Light Gray #A7A7A7, Gray #646464, Dark Gray #333333, Primary #000000 */
        gray: {
          50: '#F9F9F9',
          100: '#F0F0F0',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A7A7A7',
          500: '#646464',
          600: '#525252',
          700: '#333333',
          800: '#1A1A1A',
          900: '#000000',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 80, 2, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 80, 2, 0.6)' },
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
        'gradient-primary': 'linear-gradient(135deg, #E85002 0%, #C10801 100%)',
        'gradient-branding': 'linear-gradient(135deg, #D9C3AB 0%, #F16001 50%, #C10801 75%, #000000 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FFF4ED 0%, #F9E6DB 100%)',
        'gradient-dark': 'linear-gradient(135deg, #000000 0%, #333333 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(232, 80, 2, 0.3)',
        'glow-lg': '0 0 60px rgba(232, 80, 2, 0.4)',
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