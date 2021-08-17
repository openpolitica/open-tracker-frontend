import * as CUI from '@chakra-ui/react';

const CongresspersonCard = ({
  avatar = 'https://images.unsplash.com/photo-1628038341191-8e7448fc8209?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  logoParty = 'https://cdn.mercadonegro.pe/wp-content/uploads/2020/01/congreso-2020-alianza-para-el-progreso-1024x1024.png',
  fullName = 'Posemoscrowte Chagua Payano',
}) => {
  return (
    <CUI.Flex
      direction="column"
      align="center"
      maxW="44"
      mt="4"
      px="1rem"
      py="6"
      textAlign="center"
      boxShadow="sm"
      border="1px solid"
      borderColor="secondary.200"
      rounded="4">
      <CUI.Avatar w="16" h="16" src={avatar} name={fullName}>
        <CUI.AvatarBadge as="img" src={logoParty} boxSize="1.5rem" />
      </CUI.Avatar>
      <CUI.Heading
        fontSize="md"
        lineHeight="6"
        fontWeight="medium"
        color="#1A1A1A"
        mt="3">
        {fullName}
      </CUI.Heading>
      <CUI.Button variant="outline" mt="4">
        Ver más
      </CUI.Button>
    </CUI.Flex>
  );
};

export default CongresspersonCard;
