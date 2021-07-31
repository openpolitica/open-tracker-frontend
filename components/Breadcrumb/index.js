import * as CUI from '@chakra-ui/react';
import NextLink from 'next/link';
import ArrowRightIcon from '/public/images/icons/arrow-right.svg';

export default function Breadcrumb({ routes = [] }) {
  const lastIdxRoute = routes.length - 1;

  return routes?.length > 1 ? (
    <CUI.Breadcrumb separator={<ArrowRightIcon />} spacing="0.25rem">
      {routes.map(({ label, route }, idx) => (
        <CUI.BreadcrumbItem key={label}>
          <CUI.BreadcrumbLink as={NextLink} href={route}>
            <CUI.Link
              color={idx === lastIdxRoute ? 'unset' : 'secondary.600'}
              pointerEvents={idx === lastIdxRoute ? 'none' : 'auto'}>
              {label}
            </CUI.Link>
          </CUI.BreadcrumbLink>
        </CUI.BreadcrumbItem>
      ))}
    </CUI.Breadcrumb>
  ) : null;
}
