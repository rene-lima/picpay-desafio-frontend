module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      heading: [
        'Montserrat',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      body: [
        'Roboto',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      display: [
        'Lato',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    },
    colors: {
      white: {
        DEFAULT: 'white'
      },
      blue: {
        DEFAULT: '#007DFE',
        dark: '#002D69'
      },
      red: {
        DEFAULT: '#EF4444'
      },
      gray: {
        dark: '#69788C',
        DEFAULT: '#F2F2F2',
        border: '#CFDCE5',
        button: '#F5F5F5',
        filter: '#E6ECF0',
        zebra: '#F5F8FA'
      },
      black: {
        emphasis: '#000000DE',
        DEFAULT: '#333333',
        secondary: '#2D3540',
        outline: '#0000001F',
        medium: '#00000099'
      }
    },
    extend: {}
  },
  variants: {
    extend: {}
  }
};
