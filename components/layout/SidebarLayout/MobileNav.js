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
      w="full"
      h="navHeight"
      bg="white"
      boxShadow="sm"
      alignItems="center"
      justifyContent="space-between"
      px={{ base: 4, md: 24 }}
      ref={navRef}
      {...rest}>
      <CUI.Flex alignItems="center" w="full">
        {isSearchOpen ? (
          <Fragment>
            <CUI.IconButton
              variant="ghost"
              color="secondary.500"
              onClick={onSearchClose}
              aria-label="search congresssman"
              icon={<BackIcon />}
            />
            <CUI.Input flex={1} mx={2} placeholder="Busca un congresista" />
          </Fragment>
        ) : (
          <Fragment>
            <CUI.IconButton
              variant="ghost"
              onClick={onToggle}
              color="secondary.500"
              aria-label="toggle menu"
              marginRight="12px"
              icon={isOpen ? <CloseIcon /> : <MenuIcon />}
            />
            <CUI.Text
              fontSize="md"
              color="secondary.700"
              fontWeight="bold"
              flex={1}>
              Congreso
            </CUI.Text>
          </Fragment>
        )}
        <CUI.IconButton
          variant="ghost"
          onClick={isSearchOpen ? handleSearch : onSearchOpen}
          aria-label="search congresssman"
          bg="secondary.100"
          color="secondary.700"
          icon={<SearchIcon />}
        />
      </CUI.Flex>
    </CUI.Flex>
  );
}
