import * as CUI from '@chakra-ui/react';
import Breadcrumb from 'components/Breadcrumb';

const Header = () => {
  const routes = [
    { label: 'Inicio', route: '/' },
    { label: 'Bancadas', route: '/random' },
    { label: 'Partido AC DC', route: '/random/ac-dc' },
  ];

  return (
    <CUI.Box p={20}>
      <Breadcrumb routes={routes} />
    </CUI.Box>
  );
};

export default Header;
