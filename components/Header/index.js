import Link from 'next/link';
import { Button } from '@chakra-ui/react';

const Header = () => {
  return (
    <header>
      <Link href="/">
        <img src="/images/icons/logo.svg" alt="open politica logo" />
      </Link>
      <Button variant="outline">Outline Medium (default) Button!</Button>
      <Button size="sm">Solid(default) Medium Button!</Button>
    </header>
  );
};

export default Header;
