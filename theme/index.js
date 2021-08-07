import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { globalStyles } from 'theme/globalStyles';
import { colors } from 'theme/colors';
import { sizes } from 'theme/sizes';

import { BadgeStyles as Badge } from 'theme/components/Badge';
import { BreadcrumbStyles as Breadcrumb } from 'theme/components/Breadcrumb';
import { ButtonStyles as Button } from 'theme/components/Button';

const components = {
  Badge,
  Breadcrumb,
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
  sizes,
  styles: {
    global: globalStyles,
  },
};
export default extendTheme(themeDefault);
