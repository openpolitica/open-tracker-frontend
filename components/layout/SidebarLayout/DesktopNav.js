import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import OpenLogo from 'public/images/icons/open-logo.svg';
import Separator from 'public/images/icons/separator.svg';
import TukuLogo from 'public/images/icons/tuku-logo.svg';
import OmniSearch from 'components/OmniSearch';

export function DesktopNav({ ...rest }) {
  return (
    <CUI.Flex
      pos="fixed"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      h="navHeight"
      bg="white"
      px="6"
      py="2"
      boxShadow="sm"
      zIndex="sticky"
      {...rest}>
      <CUI.HStack flex={{ base: '1', md: 'auto' }} justify="space-between">
        <CUI.HStack spacing="3">
          <NextCUILink href="/">
            <CUI.VisuallyHidden>Tuku</CUI.VisuallyHidden>
            <TukuLogo />
          </NextCUILink>
          <Separator />
          <CUI.Text fontFamily="Recia">hecho por</CUI.Text>
          <NextCUILink
            href="//openpolitica.com/"
            rel="noreferrer noopener"
            target="_blank">
            <OpenLogo />
          </NextCUILink>
        </CUI.HStack>
        <OmniSearch />
      </CUI.HStack>
    </CUI.Flex>
  );
}
