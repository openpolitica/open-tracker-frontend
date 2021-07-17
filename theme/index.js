import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { ButtonStyles as Button } from 'components/ButtonStyles';
import { globalStyles } from 'theme/globalStyles';
import { colors } from 'theme/colors';

const components = {
  Button,
};

const breakpoints = createBreakpoints({
  sm: '20em',
  md: '48em',
  lg: '62em',
  xl: '90em',
});

const themeDefault = {
  components,
  breakpoints,
  colors,
  styles: {
    global: globalStyles,
  },
};
export default extendTheme(themeDefault);
