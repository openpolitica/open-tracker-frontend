import * as CUI from '@chakra-ui/react';

const ParliamentaryGroupCard = ({
  logoParty = 'https://cdn.mercadonegro.pe/wp-content/uploads/2020/01/congreso-2020-alianza-para-el-progreso-1024x1024.png',
  nameParty = 'Alianza por el Progreso',
  members = '12',
}) => {
  return (
    <CUI.Flex
      direction="column"
      maxW={44}
      minH="244px"
      px={18.5}
      pt="20px"
      pb={6}
      textAlign="center"
      boxShadow="sm"
      border="1px solid"
      borderColor="secondary.200"
      rounded="4">
      <CUI.Image w={16} mx="auto" src={logoParty} />
      <CUI.Heading
        fontSize="md"
        lineHeight={6}
        fontWeight="500"
        color="#1A1A1A">
        {nameParty}
      </CUI.Heading>
      <CUI.Text color="gray.500" mt={1}>
        {members} miembros
      </CUI.Text>
      <CUI.Button variant="outline" mt="auto">
        Ver congresistas
      </CUI.Button>
    </CUI.Flex>
  );
};

export default ParliamentaryGroupCard;
