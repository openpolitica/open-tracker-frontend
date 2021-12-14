import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { globalStyles } from 'theme/globalStyles';
import { colors } from 'theme/colors';
import { sizes } from 'theme/sizes';

import { BadgeStyles as Badge } from 'theme/components/Badge';
import { BreadcrumbStyles as Breadcrumb } from 'theme/components/Breadcrumb';
import { ButtonStyles as Button } from 'theme/components/Button';
import { TagStyles as Tag } from 'theme/components/Tag';

const components = {
  Badge,
  Breadcrumb,
  Button,
  Tag,
};

const fonts = {
  heading: 'Inter, -apple-system, Helvetica, Arial, sans-serif',
  body: 'Inter, -apple-system, Helvetica, Arial, sans-serif',
};

const breakpoints = createBreakpoints({
  sm: '20em',
  md: '48em',
  lg: '62em',
  xl: '90em',
});

const defaultTheme = {
  components,
  breakpoints,
  fonts,
  colors,
  sizes,
  styles: {
    global: globalStyles,
  },
};

export default extendTheme(defaultTheme);
