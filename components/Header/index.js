import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <Link href="/">
        <img src="/images/icons/logo.svg" alt="open politica logo" />
      </Link>
      <h1>Proyecto de Open politica</h1>
    </header>
  );
};

export default Header;
