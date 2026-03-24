module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3A3D41",
        secondary: "#8B9467",
        accent: "#34C759",
        background: "#F7F7F7",
        darkBackground: "#2F2F2F",
        darkText: "#FFFFFF",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.darkText"),
            "[class~='lead']": {
              fontSize: theme("fontSize.lg"),
            },
          },
        },
      }),
    },
  },
  plugins: [],
  darkMode: "class",
};