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
    </SidebarLayout>
  );
}
