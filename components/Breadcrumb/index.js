import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import ArrowRightIcon from '/public/images/icons/arrow-right.svg';

export default function Breadcrumb({ routes = [] }) {
  const lastIdxRoute = routes.length - 1;

  return routes?.length > 1 ? (
    <CUI.Breadcrumb separator={<ArrowRightIcon />} spacing="0.25rem">
      {routes.map(({ label, route }, idx) => (
        <CUI.BreadcrumbItem key={label}>
          <CUI.BreadcrumbLink
            as={NextCUILink}
            href={route}
            color={idx === lastIdxRoute ? 'unset' : 'secondary.600'}
            pointerEvents={idx === lastIdxRoute ? 'none' : 'auto'}>
            {label}
          </CUI.BreadcrumbLink>
        </CUI.BreadcrumbItem>
      ))}
    </CUI.Breadcrumb>
  ) : null;
}
