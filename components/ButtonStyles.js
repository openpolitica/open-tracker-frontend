export const ButtonStyles = {
  baseStyle: {
    transition: '1s cubic-bezier(0.075, 0.82, 0.165, 1)',
    _hover: {
      transform: 'translateY(-3px)',
    },
  },
  variants: {
    solid: {
      bg: 'teal.500',
      color: 'white',
    },
    outline: {
      color: 'gray.700',
      border: '1px solid',
      borderColor: 'gray.200',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};
