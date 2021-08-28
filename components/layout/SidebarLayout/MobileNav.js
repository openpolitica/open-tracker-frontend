import { Fragment, useRef } from 'react';
import * as CUI from '@chakra-ui/react';
import MenuIcon from '/public/images/icons/menu.svg';
import CloseIcon from '/public/images/icons/close.svg';
import BackIcon from '/public/images/icons/back-arrow.svg';
import SearchIcon from '/public/images/icons/search.svg';

export default function MobileNav({ isOpen, onToggle, ...rest }) {
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = CUI.useDisclosure();

  const navRef = useRef();
  CUI.useOutsideClick({
    ref: navRef,
    handler: () => onSearchClose(),
  });

  const handleSearch = () => {};

  return (
    <CUI.Flex
      pos="fixed"
      zIndex="sticky"
      w="full"
      h="navHeight"
      px={{ base: '4', md: '24' }}
      bg="white"
      boxShadow="sm"
      alignItems="center"
      justifyContent="space-between"
      ref={navRef}
      {...rest}>
      <CUI.Flex alignItems="center" w="full">
        {isSearchOpen ? (
          <Fragment>
            <CUI.IconButton
              variant="ghost"
              color="secondary.500"
              aria-label="search congresssman"
              icon={<BackIcon />}
              onClick={onSearchClose}
            />
            <CUI.Input flex="1" mx="2" placeholder="Busca un congresista" />
          </Fragment>
        ) : (
          <Fragment>
            <CUI.IconButton
              variant="ghost"
              color="secondary.500"
              aria-label="toggle menu"
              mr="3"
              icon={isOpen ? <CloseIcon /> : <MenuIcon />}
              onClick={onToggle}
            />
            <CUI.Text
              fontSize="md"
              color="secondary.700"
              fontWeight="bold"
              flex="1">
              Congreso
            </CUI.Text>
          </Fragment>
        )}
        <CUI.IconButton
          variant="ghost"
          aria-label="search congresssman"
          bg="secondary.100"
          color="secondary.700"
          icon={<SearchIcon />}
          onClick={isSearchOpen ? handleSearch : onSearchOpen}
        />
      </CUI.Flex>
    </CUI.Flex>
  );
}
