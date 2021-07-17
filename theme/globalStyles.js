export const globalStyles = {
  'html, body': {
    bg: 'white',
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
    bg: 'teal.400',
    color: 'white',
  },
  '::-moz-selection': {
    bg: 'teal.400',
    color: 'white',
  },
};
