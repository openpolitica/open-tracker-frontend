import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import FbIcon from 'public/images/icons/facebook.svg';
import TwitterIcon from 'public/images/icons/twitter.svg';
import MarkIcon from 'public/images/icons/mark-location.svg';
import PeopleIcon from 'public/images/icons/people.svg';
import ExternalLinkIcon from 'public/images/icons/external-link.svg';
import { capitalizeStrings } from 'utils/misc';

export default function CongresspersonProfileCard({
  avatarUrl = '',
  fullName = '',
  location = '',
  politicalPartyName = '',
  parliamentaryGroup = '',
  isActiveMember = false,
  // TODO: missing data from api
  parliamentaryGroupSlug = '',
  isSuspendedMember = false,
  personalUrl = 'https://openpolitica.com/',
  facebookUrl = 'https://openpolitica.com/',
  twitterUrl = 'https://openpolitica.com/',
}) {
  const avatarSize = CUI.useBreakpointValue({ base: 'md', md: '2xl' });

  return (
    <CUI.Box
      maxW="41rem"
      w="full"
      borderRadius="6px"
      p="6"
      border="1px"
      borderColor="secondary.200">
      <CUI.Stack
        alignItems="flex-start"
        spacing={{ base: '2', md: '8' }}
        direction={{ base: 'column', md: 'row' }}>
        {avatarUrl ? (
          <CUI.Avatar size={avatarSize} src={avatarUrl} name={fullName} />
        ) : null}
        <CUI.VStack spacing="3" align="flex-start">
          <CUI.Heading
            fontSize={{ base: 'lg', md: '2xl' }}
            color="secondary.700">
            {capitalizeStrings(fullName ?? '')}
          </CUI.Heading>
          <CUI.HStack align="center" spacing="1">
            {isActiveMember ? (
              <CUI.Badge variant="success">Vocera de la bancada</CUI.Badge>
            ) : null}
            {isSuspendedMember ? (
              <CUI.Badge variant="danger">Suspendida</CUI.Badge>
            ) : null}
          </CUI.HStack>
          <CUI.VStack align="flex-start" spacing="1" color="secondary.500">
            <CUI.Flex align="center">
              <CUI.Icon
                mr="3"
                fontSize={{ base: 'xl', md: '2xl' }}
                as={MarkIcon}
              />
              <CUI.Text fontSize={{ base: 'sm', md: 'md' }}>
                Congresista por {capitalizeStrings(location ?? '')}
              </CUI.Text>
            </CUI.Flex>
            <CUI.Flex align="center">
              <CUI.Icon
                mr="3"
                fontSize={{ base: 'xl', md: '2xl' }}
                as={PeopleIcon}
              />
              <CUI.Text fontSize={{ base: 'sm', md: 'md' }}>
                {capitalizeStrings(politicalPartyName ?? '')}
              </CUI.Text>
            </CUI.Flex>
            <CUI.Flex align="center">
              <CUI.Icon
                mr="3"
                fontSize={{ base: 'xl', md: '2xl' }}
                as={PeopleIcon}
              />
              <CUI.Text
                fontSize={{ base: 'sm', md: 'md' }}
                as={NextCUILink}
                color="primary.500"
                href={`/bancadas/${parliamentaryGroupSlug}`}>
                Bancada {parliamentaryGroup}
              </CUI.Text>
            </CUI.Flex>
          </CUI.VStack>
          <CUI.HStack mt="8" spacing="2" align="center">
            {personalUrl ? (
              <ExternalIconLink
                href={personalUrl}
                icon={<ExternalLinkIcon />}
              />
            ) : null}
            {facebookUrl ? (
              <ExternalIconLink href={facebookUrl} icon={<FbIcon />} />
            ) : null}
            {twitterUrl ? (
              <ExternalIconLink href={twitterUrl} icon={<TwitterIcon />} />
            ) : null}
          </CUI.HStack>
        </CUI.VStack>
      </CUI.Stack>
    </CUI.Box>
  );
}

const ExternalIconLink = ({ href, icon, ...rest }) => {
  return (
    <CUI.IconButton
      isExternal
      minW="unset"
      h="unset"
      variant="unstyled"
      aria-label="facebook"
      color="secondary.700"
      as={CUI.Link}
      href={href}
      icon={icon}
      {...rest}
    />
  );
};
