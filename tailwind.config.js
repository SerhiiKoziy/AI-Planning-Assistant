/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0b1712',
        panel: '#112016',
        card: { DEFAULT: '#16281c', hover: '#1c3323' },
        edge: '#2a4331',
        primary: {
          DEFAULT: '#2f9e5c',
          light: '#3fbb6f',
          muted: 'rgba(47, 158, 92, 0.15)',
        },
        ink: { DEFAULT: '#e8f3ec', muted: '#9fb8a8' },
        danger: { DEFAULT: '#e5595f', muted: 'rgba(229, 89, 95, 0.12)' },
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.35)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
