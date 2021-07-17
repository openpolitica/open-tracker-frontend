import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from 'components/ButtonStyles';

const components = {
  Button,
};

const themeDefault = {
  components,
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'white',
        color: 'gray.700',
        lineHeight: 'tall',
        fontFamily: 'Inter, -apple-system, Helvetica, Arial, sans-serif',
        scrollBehavior: 'smooth',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
      '::selection': {
        backgroundColor: 'teal.400',
        color: 'white',
      },
      '::-moz-selection': {
        backgroundcolor: 'teal.400',
        color: 'white',
      },
    },
  },
};
export default extendTheme(themeDefault);
