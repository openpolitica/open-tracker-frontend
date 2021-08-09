import * as CUI from '@chakra-ui/react';
import SearchIcon from '/public/images/icons/search.svg';

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
      {...rest}>
      <CUI.HStack flex={{ base: '1', md: 'auto' }} justify="space-between">
        <CUI.Text fontSize="lg" fontWeight="bold">
          Congreso
        </CUI.Text>
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
