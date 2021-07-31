import Link from 'next/link';
import * as CUI from '@chakra-ui/react';

const Header = () => {
  return (
    <header>
      <Link href="/">
        <img src="/images/icons/logo.svg" alt="open politica logo" />
      </Link>
      <CUI.Button variant="outline">
        Outline Medium (default) Button!
      </CUI.Button>
      <CUI.Button size="sm">Solid(default) Medium Button!</CUI.Button>
    </header>
  );
};

export default Header;
