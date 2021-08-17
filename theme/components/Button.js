export const ButtonStyles = {
  baseStyle: {
    fontSize: 'sm',
  },
  sizes: {
    md: {
      px: '0.75rem',
      py: '0.375rem',
    },
  },
  variants: {
    solid: {
      bg: 'primary.500',
      color: 'white',
    },
    outline: {
      color: 'secondary.700',
      border: '1px solid',
      borderColor: 'secondary.200',
      fontSize: 'sm',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};
