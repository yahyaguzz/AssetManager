// const generateSafelist = () => {
//   const safelist = [];
//   const states = ["hover", "active", "focus", "focus-visible", "peer-checked"];
//   Object.keys(tailwindColors).forEach((color) => {
//     if (color === "default") {
//       return
//     }

//     if (tailwindColors[color] !== null) {
//       Object.keys(tailwindColors[color]).forEach((shade) => {
//         safelist.push(`bg-${color}-${shade}`);
//         safelist.push(`text-${color}-${shade}`);
//         safelist.push(`border-${color}-${shade}`);
//         safelist.push(`ring-${color}-${shade}`);
//         // safelist.push(`outline-${color}-${shade}`);

//         states.forEach((state) => {
//           safelist.push(`${state}:bg-${color}-${shade}`);
//           safelist.push(`${state}:text-${color}-${shade}`);
//           safelist.push(`${state}:border-${color}-${shade}`);
//           safelist.push(`${state}:ring-${color}-${shade}`);
//           // safelist.push(`${state}:outline-${color}-${shade}`);
//         });
//       });
//     }
//   });
//   return safelist;
// };

export default {
  mode: 'jit',
  content: {
    relative: true,
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ]
  },
  theme: {
    extend: {
      colors: {
        "custom-primary": {
          300: 'rgb(var(--primary-color-300))',
          400: 'rgb(var(--primary-color-400))',
          500: 'rgb(var(--primary-color-500))',
          600: 'rgb(var(--primary-color-600))',
          700: 'rgb(var(--primary-color-700))',
          800: 'rgb(var(--primary-color-800))',
          900: 'rgb(var(--primary-color-900))',
        },
      },
      backgroundImage: {
        'chart-button': "url('../assets/images/ChartButton.png')", // Adjust the path as needed
    },
    },
  },
  plugins: [],
};
