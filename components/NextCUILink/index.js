import NextLink from 'next/link';
import * as CUI from '@chakra-ui/react';

/*
  1. Has to be a new component because both chakra and next share the `as` keyword
  2. Recommended/required: To put your own <a> tag within the <NextLink> tag per the docs
*/

export default function NextCUILink({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}) {
  return (
    <NextLink
      passHref
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}>
      <CUI.Link _hover={{ textDecoration: 'none' }} {...chakraProps}>
        {children}
      </CUI.Link>
    </NextLink>
  );
}
