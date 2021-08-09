export const ButtonStyles = {
  baseStyle: {
    fontSize: 'sm',
  },
  sizes: {
    md: {
      px: '12px',
      py: '6px',
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
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};
