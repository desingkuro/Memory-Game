// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",      
        secondary: "var(--color-secondary)",  
        tertiary: "var(--color-tertiary)",    
        quaternary: "var(--color-quaternary)",        
        quinary: "var(--color-quinary)",            
        senary: "var(--color-senary)",          
        'blue-light': "var(--color-blue-light)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)',
        'gradient-accent': 'linear-gradient(135deg, var(--color-tertiary) 0%, var(--color-quaternary) 100%)',
        'gradient-hero': 'linear-gradient(135deg, var(--color-quinary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)',
      },
      screens: {
        'xs': '400px',
      },
    },
  },
  plugins: [],
};
