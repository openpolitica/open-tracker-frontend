import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import SearchIcon from '/public/images/icons/search.svg';
import OpenLogo from 'public/images/icons/open-logo.svg';
import Separator from 'public/images/icons/separator.svg';

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
          <CUI.Text
            as={NextCUILink}
            href="/bancadas"
            lineHeight="9"
            fontFamily="ClashDisplay"
            fontSize="3xl"
            fontWeight="bold">
            Tuku
          </CUI.Text>
          <Separator />
          <CUI.Text fontFamily="Recia">hecho por</CUI.Text>
          <NextCUILink
            href="//openpolitica.com/"
            rel="noreferrer noopener"
            target="_blank">
            <OpenLogo />
          </NextCUILink>
        </CUI.HStack>
        <CUI.Box>
          <CUI.InputGroup minW="21.75rem">
            <CUI.InputLeftElement pointerEvents="none">
              <CUI.Icon color="secondary.400" fontSize="xl" as={SearchIcon} />
            </CUI.InputLeftElement>
            <CUI.Input placeholder="Ingresa el nombe de un congresista" />
          </CUI.InputGroup>
        </CUI.Box>
      </CUI.HStack>
    </CUI.Flex>
  );
}
