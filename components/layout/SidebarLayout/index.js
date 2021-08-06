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
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          onOverlayClick={onClose}>
          <CUI.DrawerContent
            maxW="sidebarWidth"
            boxShadow="unset"
            marginTop={14}>
            <SidebarContent />
          </CUI.DrawerContent>
        </CUI.Drawer>
        <MobileNav
          display={{ base: 'flex', md: 'none' }}
          isOpen={isOpen}
          onToggle={onToggle}
        />
        <CUI.Box
          ml={{ base: 0, md: '183px' }}
          mt={{ base: 0, md: '64px' }}
          px={{ base: '16px', md: '32px' }}
          py={{ base: '16px', md: '24px' }}
          pt={{ base: '72px', md: '24px' }}>
          {children}
        </CUI.Box>
      </CUI.Box>
    </CUI.Box>
  );
}
