import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        customColor1: '#FF5733',
        customColor2: '#33FF57',
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;