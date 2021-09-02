import * as CUI from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { capitalizeStrings } from 'utils';

const CongresspersonCard = ({
  avatar = '',
  logoParty = '',
  fullName = '',
  isActiveMember = false,
  location = '',
  congresspersonId = '',
  isSuspendedMember = false,
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
      <CUI.Avatar
        w="16"
        h="16"
        src={avatar}
        name={fullName}
        objectFit="contain">
        <CUI.AvatarBadge as="img" src={logoParty} boxSize="1.8rem" />
      </CUI.Avatar>
      <CUI.Heading
        fontSize="sm"
        fontWeight="medium"
        color="secondary.700"
        my="2">
        {capitalizeStrings(fullName ?? '')}
      </CUI.Heading>
      {isActiveMember ? (
        <CUI.Badge py="0.5" mb="1.5" variant="success">
          Vocera de la bancada
        </CUI.Badge>
      ) : null}
      {isSuspendedMember ? (
        <CUI.Badge variant="danger">Suspendida</CUI.Badge>
      ) : null}
      <CUI.Text
        fontSize="sm"
        color="secondary.500"
        lineHeight="5"
        mt="2"
        mb="4">
        Congresista por{' '}
        <CUI.Text as="span" display="block" color="primary.500">
          {capitalizeStrings(location ?? '')}
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
