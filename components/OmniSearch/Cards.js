import * as CUI from '@chakra-ui/react';
import { capitalizeNames } from 'utils';
import ExternalLink from 'public/images/icons/external-link.svg';

function CongresspersonSmallCard({
  avatar = '',
  partyLogo = '',
  fullName = '',
  location = '',
  congresspersonSlug = '',
}) {
  return (
    <CUI.HStack
      w="full"
      minH="20"
      p="4"
      justify="space-between"
      _hover={{ bg: 'secondary.100' }}
      _focus={{ bg: 'secondary.300' }}>
      <CUI.Avatar
        w="12"
        h="12"
        mr="4"
        src={avatar}
        name={fullName}
        objectFit="contain">
        <CUI.AvatarBadge as="img" src={partyLogo} boxSize="8" />
      </CUI.Avatar>
      <CUI.Box flex="1">
        <CUI.Heading
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight="bold"
          color="secondary.700"
          mb="1">
          {capitalizeNames(fullName ?? '')}
        </CUI.Heading>
        <CUI.Text fontSize="sm" color="secondary.500" lineHeight="5">
          Congresista por{' '}
          <CUI.Text as="span">{capitalizeNames(location ?? '')}</CUI.Text>
        </CUI.Text>
      </CUI.Box>
      <CUI.Icon minW="6" minH="6" color="secondary.700" as={ExternalLink} />
    </CUI.HStack>
  );
}
function ParliamentaryGroupSmallCard({
  members = '',
  partyLogo = '',
  partyName = '',
  parliamentaryGroupSlug = '',
}) {
  return (
    <CUI.HStack
      minH={{ base: 'initial', md: '20' }}
      w="full"
      p="4"
      justify="space-between"
      _hover={{ bg: 'secondary.100' }}
      _focus={{ bg: 'secondary.300' }}>
      <CUI.Avatar
        w="12"
        h="12"
        mr="4"
        borderRadius="md"
        src={partyLogo}
        name={partyName}
        objectFit="cover"
      />
      <CUI.Box flex="1">
        <CUI.Heading
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight="bold"
          color="secondary.700"
          mb="1">
          {capitalizeNames(partyName ?? '')}
        </CUI.Heading>
        <CUI.Text fontSize="sm" color="secondary.500" lineHeight="5">
          {members} {members === '1' ? 'miembro' : 'miembros'}
        </CUI.Text>
      </CUI.Box>
      <CUI.Icon minW="6" minH="6" color="secondary.700" as={ExternalLink} />
    </CUI.HStack>
  );
}

export { CongresspersonSmallCard, ParliamentaryGroupSmallCard };
