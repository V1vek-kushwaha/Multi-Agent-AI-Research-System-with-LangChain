/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12172B',
        'ink-soft': '#1B2340',
        'ink-line': '#2B3457',
        parchment: '#F5EFE0',
        'parchment-line': '#DED2B4',
        'parchment-shadow': '#C9BB94',
        amber: '#E8A33D',
        'amber-soft': '#F0BE6E',
        teal: '#5FA8A0',
        'teal-soft': '#7FC1B9',
        cream: '#F2EFE6'
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        pulseDot: 'pulseDot 1.4s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out both'
      }
    }
  },
  plugins: []
}
