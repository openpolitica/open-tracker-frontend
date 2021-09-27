import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import { useRouter } from 'next/router';
import { capitalizeNames } from 'utils';

const CongresspersonCard = ({
  avatar = '',
  logoParty = '',
  fullName = '',
  gender = '',
  isActiveMember = false,
  location = '',
  congresspersonSlug = '',
  isSuspendedMember = false,
}) => {
  const router = useRouter();
  return (
    <CUI.Flex
      direction="column"
      align="center"
      w="44"
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
        {capitalizeNames(fullName ?? '')}
      </CUI.Heading>
      {isActiveMember ? (
        <CUI.Badge py="0.5" mb="1.5" variant="success">
          {gender === 'M' ? 'Vocero' : 'Vocera'} de la bancada
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
        <NextCUILink
          href={`/congresistas?departamento=${location.toLowerCase()}`}
          display="block"
          color="primary.500">
          {capitalizeNames(location ?? '')}
        </NextCUILink>
      </CUI.Text>
      <CUI.Button
        onClick={() => router.push(`/congresistas/${congresspersonSlug}`)}
        variant="outline"
        mt="auto">
        Ver perfil
      </CUI.Button>
    </CUI.Flex>
  );
};

export default CongresspersonCard;
