import { createGlobalStyle } from 'styled-components'

export const theme = {
  font: {
    sans: '"Poppins", sans-serif',
    serif: '"Lora", serif',
    regular: 400,
    bold: 600,
    sizes: {
      root: '62.5%',
      sm: '.875rem',
      lg: '1.5rem',
      xl: '2.4rem',
    },
  },
  color: {
    white: '#fff',
    lightGray: '#EDF2F7',
    light: '#F8F9FB',
    dark: '#03070E',
    gray: '#A0AEC0',
    indigo: '#2F13CD',
  },
}

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: ${theme.font.sizes.root}
  }

  body {
    font-family: ${theme.font.serif};
    background: ${theme.color.light};
    color: ${theme.color.dark};
    padding: 0;
    margin: 0;
    font-size: 1.4rem;
  }

  img {
    max-width: 100%;
  }

  ul, ol {
    margin: 0;
    padding: 0;
  }
`
