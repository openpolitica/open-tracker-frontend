import * as CUI from '@chakra-ui/react';

const ParliamentaryGroupCard = ({
  logoParty = 'https://cdn.mercadonegro.pe/wp-content/uploads/2020/01/congreso-2020-alianza-para-el-progreso-1024x1024.png',
  nameParty = 'Alianza por el Progreso',
  members = '12',
}) => {
  return (
    <CUI.Flex
      direction="column"
      maxW="44"
      minH="64"
      px="5"
      py="6"
      textAlign="center"
      boxShadow="sm"
      border="1px solid"
      borderColor="secondary.200"
      rounded="4">
      <CUI.Image w="16" mx="auto" mb="4" src={logoParty} />
      <CUI.Heading
        fontSize="sm"
        lineHeight="6"
        fontWeight="medium"
        color="secondary.700">
        {nameParty}
      </CUI.Heading>
      <CUI.Text color="gray.500" mt="1" fontSize="sm">
        {members} {members === '1' ? 'miembro' : 'miembros'}
      </CUI.Text>
      <CUI.Button variant="outline" mt="auto">
        Ver congresistas
      </CUI.Button>
    </CUI.Flex>
  );
};

export default ParliamentaryGroupCard;
