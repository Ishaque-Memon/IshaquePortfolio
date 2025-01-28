module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkSlate: '#2C3E50',    // Deep, rich dark slate for background
        lightSlate: '#34495E',   // Lighter slate for cards and content blocks
        softGold: '#F1C40F',     // Elegant soft gold for text highlights
        softGray: '#BDC3C7',     // Soft gray for body text and subtle details
        deepCharcoal: '#1B2A34', // Deep, dark background accent for shadows
        primaryGradientStart: '#FF6A00',
        primaryGradientEnd: '#FF3D00',
        
      },
      backgroundImage: {
        gradientToBR: 'linear-gradient(to bottom right, #FF6A00, #FF3D00)',
      },
    },
  },
  plugins: [],
};
