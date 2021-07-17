import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from 'components/ButtonStyles';
import { globalStyles } from 'theme/globalStyles';

const components = {
  Button,
};

const themeDefault = {
  components,
  styles: {
    global: globalStyles,
  },
};
export default extendTheme(themeDefault);
