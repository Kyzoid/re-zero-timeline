module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    cursor: {
      grab: 'grab',
      pointer: 'pointer',
    },
    container: {
      center: true,
    },
  },
  variants: {},
  plugins: [],
};
