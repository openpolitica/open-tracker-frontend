import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ArrowRightIcon from '/public/images/icons/arrow-right.svg';

export default function Breadcrumb({ routes = [] }) {
  const lastIdxRoute = routes.length - 1;

  return routes?.length > 1 ? (
    <ChakraBreadcrumb separator={<ArrowRightIcon />} spacing="0.25rem">
      {routes.map(({ label, route }, idx) => (
        <BreadcrumbItem key={label}>
          <BreadcrumbLink as={NextLink} href={route}>
            <Link
              color={idx === lastIdxRoute ? 'unset' : 'secondary.600'}
              pointerEvents={idx === lastIdxRoute ? 'none' : 'auto'}>
              {label}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  ) : null;
}
