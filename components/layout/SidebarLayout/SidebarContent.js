import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import { useRouter } from 'next/router';
import UserIcon from '/public/images/icons/user.svg';
import HomeIcon from '/public/images/icons/home.svg';
import BillsIcon from '/public/images/icons/bills.svg';

const LinkItems = [
  { name: 'Inicio', icon: HomeIcon, href: '/' },
  { name: 'Bancadas', icon: UserIcon, href: '/bancadas' },
  { name: 'Congresistas', icon: UserIcon, href: '/congresistas' },
  { name: 'Proyectos de ley', icon: BillsIcon, href: '/proyectos-de-ley' },
  { name: 'Data Lab', icon: BillsIcon, href: '/data-lab' },
];

export default function SidebarContent({ ...rest }) {
  return (
    <CUI.Box
      pos="fixed"
      h="full"
      w="sidebarWidth"
      bg="secondary.50"
      boxShadow="base"
      px="3"
      py="2.5"
      top={{ base: '0', md: '14' }}
      {...rest}>
      <CUI.VStack spacing="2" align="flex-start">
        {LinkItems.map(link => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}
      </CUI.VStack>
    </CUI.Box>
  );
}

const NavItem = ({ icon, children, href, ...rest }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <NextCUILink
      _hover={{
        textDecoration: 'none',
      }}
      href={href}>
      <CUI.Flex
        bg={isActive ? 'secondary.200' : 'none'}
        h="8"
        align="center"
        px="2"
        py="3"
        color="secondary.700"
        borderRadius="md"
        cursor="pointer"
        _hover={{
          bg: 'secondary.200',
        }}
        role="group"
        {...rest}>
        {icon ? <CUI.Icon mr="2" fontSize="sm" as={icon} /> : null}
        <CUI.Text fontSize="sm" fontWeight="semibold">
          {children}
        </CUI.Text>
      </CUI.Flex>
    </NextCUILink>
  );
};
