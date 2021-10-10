import * as CUI from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ParliamentaryGroupCard = ({
  partyLogoURL = 'images/icons/parliamentary-group-default.svg',
  partyName = 'default-value',
  members = '0',
  parliamentaryGroupId = 'default-value',
}) => {
  const router = useRouter();
  return (
    <CUI.Flex
      direction="column"
      w={{ base: '72', md: '44' }}
      maxW={{ base: '72', md: '44' }}
      minH={{ base: '44', md: '64' }}
      px="5"
      py="6"
      textAlign="center"
      boxShadow="sm"
      border="1px solid"
      borderColor="secondary.200"
      rounded="4">
      <CUI.Flex direction={{ base: 'row', md: 'column' }} align="center">
        <CUI.Image
          w="16"
          mx={{ base: '0', md: 'auto' }}
          mb={{ base: '0', md: '4' }}
          src={partyLogoURL}
        />
        <CUI.Box flex="1">
          <CUI.Heading
            fontSize="sm"
            lineHeight="5"
            fontWeight="medium"
            color="secondary.700">
            {partyName}
          </CUI.Heading>
          <CUI.Text color="gray.500" mt="1" fontSize="sm">
            {members} {members === '1' ? 'miembro' : 'miembros'}
          </CUI.Text>
        </CUI.Box>
      </CUI.Flex>
      <CUI.Button
        variant="outline"
        mt="auto"
        onClick={() => router.push(`/bancadas/${parliamentaryGroupId}`)}>
        Ver congresistas
      </CUI.Button>
    </CUI.Flex>
  );
};

export default ParliamentaryGroupCard;
