/* eslint-disable */
const colors = require('tailwindcss/colors');

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
      105: '1.05',
      120: '1.2',
      140: '1.4',
      180: '1.8',
    },
    zIndex: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,
      rz: {
        800: '#100D0F',
        700: '#110E13',
        600: '#141018',
        500: '#201129',
        400: '#32124A',
        300: '#4A115E',
        200: '#8D22A4',
        100: '#BD3FD7',
      },
      subaru: {
        100: '#F3B15F',
      },
      'rz-logo': {
        100: '#796BAE',
        600: '#261C4C',
      },
      'vue': {
        100: '#41B883',
      },
      'tailwindcss': {
        100: '#06B6D4',
      },
      'google-font': {
        100: '#1A73E8',
      },
      'tippy': {
        100: '#FFDF9F',
      },
      'github': {
        100: '#A147AC',
      },
      'reddit': {
        100: '#FF4500',
      },
      'twitter': {
        100: '#31A9F3',
      }
    },
  },
  variants: {},
  plugins: [],
};
