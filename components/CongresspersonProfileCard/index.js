import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import FbIcon from 'public/images/icons/facebook.svg';
import TwitterIcon from 'public/images/icons/twitter.svg';
import MarkIcon from 'public/images/icons/mark-location.svg';
import PeopleIcon from 'public/images/icons/people.svg';
import PersonalIcon from 'public/images/icons/external-link.svg';
import { capitalizeNames } from 'utils';

const mapSocialNetworkIcons = {
  twitter: TwitterIcon,
  facebook: FbIcon,
  instagram: PersonalIcon, // TODO: change icon
};

export default function CongresspersonProfileCard({
  avatarUrl = '',
  fullName = '',
  location = '',
  politicalPartyName = '',
  parliamentaryGroupName = '',
  isActiveMember = false,
  parliamentaryGroupSlug = '',
  socialNetworkList = [],
  isSuspendedMember = false,
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
            {capitalizeNames(fullName ?? '')}
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
                Congresista por {capitalizeNames(location ?? '')}
              </CUI.Text>
            </CUI.Flex>
            <CUI.Flex align="center">
              <CUI.Icon
                mr="3"
                fontSize={{ base: 'xl', md: '2xl' }}
                as={PeopleIcon}
              />
              <CUI.Text fontSize={{ base: 'sm', md: 'md' }}>
                {capitalizeNames(politicalPartyName ?? '')}
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
                Bancada {parliamentaryGroupName}
              </CUI.Text>
            </CUI.Flex>
          </CUI.VStack>
          <CUI.HStack mt="8" spacing="2" align="center">
            {socialNetworkList?.length
              ? socialNetworkList.map(
                  ({ socialNetworkUrl, socialNetworkName }) => {
                    const Icon =
                      mapSocialNetworkIcons[socialNetworkName] ?? PersonalIcon;
                    return (
                      <ExternalIconLink
                        key={socialNetworkName}
                        href={socialNetworkUrl}
                        icon={<Icon />}
                      />
                    );
                  },
                )
              : null}
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
