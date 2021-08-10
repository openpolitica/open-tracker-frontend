import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import FbIcon from 'public/images/icons/facebook.svg';
import TwitterIcon from 'public/images/icons/twitter.svg';
import MarkIcon from 'public/images/icons/mark-location.svg';
import PeopleIcon from 'public/images/icons/people.svg';
import ExternalLinkIcon from 'public/images/icons/external-link.svg';

export default function CongressmanProfileCard({
  // TODO: Remove default values after fetching real data
  avatarUrl = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
  fullName = 'Posemoscrowte Chagua Payano',
  isActiveMember = true,
  isSuspendedMember = true,
  location = 'Moquegua',
  politicalPartyName = 'Partido Peru Libre',
  parliamentaryGroup = 'Bancada Peru Libre',
  parliamentaryGroupId = 'peru-libre',
  personalUrl = 'https://www.google.com',
  facebookUrl = 'https://www.facebook.com',
  twitterUrl = 'https://www.twitter.com',
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
            {fullName}
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
                Congresista por {location}
              </CUI.Text>
            </CUI.Flex>
            <CUI.Flex align="center">
              <CUI.Icon
                mr="3"
                fontSize={{ base: 'xl', md: '2xl' }}
                as={PeopleIcon}
              />
              <CUI.Text fontSize={{ base: 'sm', md: 'md' }}>
                {politicalPartyName}
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
                textDecoration="underline"
                href={`bancadas/${parliamentaryGroupId}`}>
                {parliamentaryGroup}
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
