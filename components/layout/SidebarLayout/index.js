import * as CUI from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';
import { DesktopNav } from './DesktopNav';

export default function SidebarLayout({ children }) {
  const { isOpen, onToggle, onClose } = CUI.useDisclosure();

  return (
    <CUI.Box minH="100vh" bg="white">
      <DesktopNav display={{ base: 'none', md: 'block' }} />
      <CUI.Box>
        <SidebarContent display={{ base: 'none', md: 'block' }} />
        <CUI.Drawer
          autoFocus={false}
          placement="left"
          isOpen={isOpen}
          onClose={onClose}
          onOverlayClick={onClose}>
          <CUI.DrawerContent maxW="sidebarWidth" boxShadow="unset" mt="14">
            <SidebarContent />
          </CUI.DrawerContent>
        </CUI.Drawer>
        <MobileNav
          display={{ base: 'flex', md: 'none' }}
          isOpen={isOpen}
          onToggle={onToggle}
        />
        <CUI.Box
          ml={{ base: '0', md: '11.5rem' }}
          mt={{ base: '0', md: '16' }}
          px={{ base: '4', md: '8' }}
          py={{ base: '4', md: '6' }}
          pt={{ base: '4.5rem', md: '6' }}>
          {children}
        </CUI.Box>
      </CUI.Box>
    </CUI.Box>
  );
}
