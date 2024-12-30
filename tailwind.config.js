/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'mainColor':'#87b44b',
      },
      keyframes: {
        pullRight: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        pullLeft: {
          '0%': { transform: 'translateX(500px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        pullTop: {
          '0%': { transform: 'translateY(-500px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      },
      animation: {
        pullRight: 'pullRight 0.5s ease',
        pullLeft:'pullLeft 0.5s ease',
        pullTop:'pullTop 0.5s ease',
      },
      
    },
    screens:{
      'mobile':'355px',
      'tablet':'768px',
      'laptop':"1280px",
      
    },
    
  },
  plugins: [],
}

