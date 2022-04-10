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
        <CUI.AspectRatio ratio={9 / 16} display={{ base: 'flex', md: 'none' }}>
          <iframe
            title="Exploración de datos de asistencias y votaciones"
            src={process.env.grafanaDashboard}
          />
        </CUI.AspectRatio>
        <CUI.AspectRatio ratio={16 / 9} display={{ base: 'none', md: 'block' }}>
          <iframe
            title="Exploración de datos de asistencias y votaciones"
            src={process.env.grafanaDashboard}
          />
        </CUI.AspectRatio>
      </CUI.Flex>
    </SidebarLayout>
  );
}
