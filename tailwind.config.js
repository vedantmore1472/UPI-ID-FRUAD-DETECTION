/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0a0e1a', 2: '#0f1525', 3: '#141c30' },
        surface: { DEFAULT: '#111729', 2: '#161e36', 3: '#1c2640' },
        border: { DEFAULT: '#1e293f', hover: '#2a3a5c' },
        text: { DEFAULT: '#e8edf5', secondary: '#94a3b8', muted: '#5b6b85' },
        primary: { DEFAULT: '#2563eb', light: '#3b82f6', hover: '#1d4ed8', glow: 'rgba(37,99,235,0.2)' },
        accent: { DEFAULT: '#0ea5e9' },
        success: { DEFAULT: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
        warning: { DEFAULT: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
        danger: { DEFAULT: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '12px',
      },
    },
  },
  plugins: [],
}
