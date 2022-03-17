import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import { useRouter } from 'next/router';
import { capitalizeNames } from 'utils';

const CongresspersonCard = ({
  avatar = '',
  logoParty = '',
  fullName = '',
  gender = '',
  isSpeaker = false,
  location = '',
  congresspersonSlug = '',
  isSuspendedMember = false,
}) => {
  const router = useRouter();
  return (
    <CUI.Flex
      direction="column"
      align={{ base: 'baseline', md: 'center' }}
      h={{ base: '52', md: '72' }}
      w={{ md: '44' }}
      minH={{ base: '52', md: '72' }}
      px={{ base: '6', md: '4' }}
      py="6"
      boxShadow="sm"
      border="1px solid"
      borderColor="secondary.200"
      rounded="4">
      <CUI.Flex direction={{ base: 'row', md: 'column' }} align="center">
        <CUI.Avatar
          w="16"
          h="16"
          src={avatar}
          name={fullName}
          objectFit="contain">
          <CUI.AvatarBadge as="img" src={logoParty} boxSize="8" />
        </CUI.Avatar>
        <CUI.Box
          ml={{ base: '4', md: '0' }}
          textAlign={{ base: 'initial', md: 'center' }}>
          <CUI.Heading
            fontSize="sm"
            fontWeight="medium"
            color="secondary.700"
            my={{ base: '0', md: '2' }}>
            {capitalizeNames(fullName ?? '')}
          </CUI.Heading>
          {isSpeaker ? (
            <CUI.Badge
              py="0.5"
              mb="1.5"
              mt={{ base: '1.5', md: '0' }}
              variant="success">
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
            mt={{ base: '0', md: '2' }}
            mb={{ base: '0', md: '4' }}>
            Congresista por{' '}
            <NextCUILink
              href={`/congresistas?departamento=${location.toLowerCase()}`}
              display="block"
              color="primary.500">
              {capitalizeNames(location ?? '')}
            </NextCUILink>
          </CUI.Text>
        </CUI.Box>
      </CUI.Flex>
      <CUI.Button
        onClick={() => router.push(`/congresistas/${congresspersonSlug}`)}
        variant="outline"
        mt="auto"
        w={{ base: 'full', md: 'auto' }}>
        Ver perfil
      </CUI.Button>
    </CUI.Flex>
  );
};

export default CongresspersonCard;
