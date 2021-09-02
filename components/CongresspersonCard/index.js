import * as CUI from '@chakra-ui/react';
import { useRouter } from 'next/router';

const CongresspersonCard = ({
  avatar = 'https://images.unsplash.com/photo-1628038341191-8e7448fc8209?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  logoParty = 'https://cdn.mercadonegro.pe/wp-content/uploads/2020/01/congreso-2020-alianza-para-el-progreso-1024x1024.png',
  fullName = 'Posemoscrowte Chagua Payano',
  isActiveMember = true,
  location = 'Moquegua',
  congresspersonId = '133748',
}) => {
  const router = useRouter();
  return (
    <CUI.Flex
      direction="column"
      align="center"
      maxW="44"
      minH="72"
      px="4"
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
        fontSize="sm"
        fontWeight="medium"
        color="secondary.700"
        my="2">
        {fullName}
      </CUI.Heading>
      {isActiveMember ? (
        <CUI.Badge py="0.5" mb="2" variant="success">
          Vocera de la bancada
        </CUI.Badge>
      ) : null}
      <CUI.Text fontSize="sm" color="secondary.500" lineHeight="5" mb="4">
        Congresista por{' '}
        <CUI.Text as="span" color="primary.500">
          {location}
        </CUI.Text>
      </CUI.Text>
      <CUI.Button
        onClick={() => router.push(`/congresistas/${congresspersonId}`)}
        variant="outline"
        mt="auto">
        Ver perfil
      </CUI.Button>
    </CUI.Flex>
  );
};

export default CongresspersonCard;
