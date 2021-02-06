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
    scale: {
      140: '1.4',
      180: '1.8',
    },
    zIndex: {
      1: '1',
      2: '2',
      3: '3',
      20: '20',
      30: '30',
      50: '50',
    },
  },
  variants: {},
  plugins: [],
};
