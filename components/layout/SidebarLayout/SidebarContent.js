import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import { useRouter } from 'next/router';
import HomeIcon from '/public/images/icons/home.svg';
import UserIcon from '/public/images/icons/user.svg';

const LinkItems = [
  { name: 'Inicio', icon: HomeIcon, href: '/' },
  { name: 'Bancadas', icon: UserIcon, href: '/bancadas' },
  { name: 'Congresistas', icon: UserIcon, href: '/congresistas' },
];

export default function SidebarContent({ ...rest }) {
  return (
    <CUI.Box
      pos="fixed"
      top={{ base: 0, md: 14 }}
      h="full"
      w="sidebarWidth"
      bg="secondary.50"
      boxShadow="base"
      px={3}
      py={2.5}
      {...rest}>
      <CUI.VStack spacing={2} align="flex-start">
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
    <NextCUILink href={href}>
      <CUI.Flex
        h="32px"
        align="center"
        bg={isActive ? 'secondary.200' : 'none'}
        px={2}
        py={3}
        color="secondary.700"
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'secondary.200',
        }}
        {...rest}>
        {icon ? <CUI.Icon mr="2" fontSize="14" as={icon} /> : null}
        <CUI.Text fontSize="sm" fontWeight="600">
          {children}
        </CUI.Text>
      </CUI.Flex>
    </NextCUILink>
  );
};
