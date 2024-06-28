/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2F6168',
        'secondary': '#F9F871',
        'tertiary': '#F9F871',
        'accent': '#F9F871',
        'neutral': '#F9F871',
        'success': '#F9F871',
        'warning': '#F9F871',
        'error': '#F9F871',
        'info': '#F9F871',
      },
    },
  },
  plugins: [],
}

