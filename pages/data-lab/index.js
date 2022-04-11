import * as CUI from '@chakra-ui/react';
import React from 'react';
import Breadcrumb from 'components/Breadcrumb';
import SidebarLayout from 'components/layout/SidebarLayout';

const routes = [
  { label: 'Inicio', route: '/' },
  { label: 'Data Lab', route: '/data-lab' },
];

export default function DataLab() {
  return (
    <SidebarLayout>
      <Breadcrumb routes={routes} />

      <CUI.Flex w="full" align="stretch" flexDirection="column" mt="1rem">
        <CUI.Box
          as="iframe"
          title="Exploración de datos de asistencias y votaciones"
          src={process.env.grafanaDashboard}
          height={{
            base: '500vw',
            sm: '470vw',
            md: '250vh',
            lg: '200vh',
            xl: '150vh',
            '2xl': '120vh',
          }}
          allowFullScreen
        />
      </CUI.Flex>
    </SidebarLayout>
  );
}
