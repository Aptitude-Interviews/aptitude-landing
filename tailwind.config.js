/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FFFBF5',
        'text': '#374151',       // gray-700
        'heading': '#1F2937',    // gray-800
        'primary': '#F97316',    // orange-500
        'primary-hover': '#EA580C', // orange-600
        'secondary': '#4B5563',  // gray-600
        'subtle': '#FED7AA',     // orange-200
        'card': '#FFFFFF',
        'border': '#E5E7EB',     // gray-200
        'input': '#F9FAFB',      // gray-50
        'success': '#10B981',    // green-500
        'danger': '#EF4444',     // red-500
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
