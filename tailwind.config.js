/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    tabSize: {
      1: '1',
      2: '2',
      4: '4',
      8: '8',
    },
    extend: {
      width: {
        '45%': '45%',
        '55%': '55%'
      },
      fontSize:{
        "cust-size": '.9rem'
      },
      backgroundImage: {
        'gradient-cust-orange1': "linear-gradient(97deg, #FA6D01 11.69%, #FAB401 118.46%)",
        'gradient-cust-orange2':'linear-gradient(to right, #FA6D01, #FA870199 60%)',
        'hero-pattern': "url('/assets/image/bg-header.png')",
        'footer-bismit': "url('/image/meeting.jpg')"
      },
      colors: {
        'footer-cover-transparent': 'rgba(250,109,1,0.8)',
        'tangerine': '#FA6D01',
        'typedBlue': '#094379',
        'pastel' : 'rgba(254, 171, 108, 0.25)',
        'peach' : 'rgba(255, 127, 29, 0.69)'
      },
      dropShadow:{
        'cust-1': [
          '1px 0 0 #FA6D01',
          '-1px 0 0 #FA6D01',
          '0 1px 0 #FA6D01',
          '0 -1px 0 #FA6D01',
        ],
        'cust-2':[
          '1px 0 0 #FA6D01',
          '1px 0 0 #FA6D01',
          '0 7px 0 #FA6D01',
          '0 -1px 0 #FA6D01',
        ]
      },
      keyframes: {
        wiggle: {
          '0%,25%': { transform: 'rotate(-3deg)',backgroundImage: "url('/art1.png')",backgroundSize:'cover',backgroundPosition:'center'},
          '26%,50%': { transform: 'rotate(3deg)',backgroundImage: "url('/art2.png')",backgroundSize:'cover',backgroundPosition:'center'},
          '56%,75%': { transform: 'rotate(-3deg)',backgroundImage: "url('/art3.png')",backgroundSize:'cover',backgroundPosition:'center'},
          '76%,100%': { transform: 'rotate(-3deg)',backgroundImage: "url('/cover.png')",backgroundSize:'cover',backgroundPosition:'center'},
        },
      },
      animation: {
        wiggle: 'wiggle 3s infinite',
        custom: 'custom-animation 3s infinite',
        'spin-cust' : 'spin 10s linear infinite',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
}