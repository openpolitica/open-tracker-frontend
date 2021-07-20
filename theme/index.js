import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { globalStyles } from 'theme/globalStyles';
import { colors } from 'theme/colors';
import { ButtonStyles as Button } from 'theme/components/Button';
import { BreadcrumbStyles as Breadcrumb } from 'theme/components/Breadcrumb';

const components = {
  Button,
  Breadcrumb,
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
