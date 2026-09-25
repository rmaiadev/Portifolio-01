/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          porcelain: '#F8FAFC',
          alabaster: '#FFFFFF',
          obsidian: '#0F172A',
        },
        fontFamily: {
          sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
          mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        },
      },
    },
    plugins: [],
  }