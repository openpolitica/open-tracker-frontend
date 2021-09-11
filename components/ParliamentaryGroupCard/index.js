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
      maxW="44"
      minH="64"
      px="5"
      py="6"
      textAlign="center"
      boxShadow="sm"
      border="1px solid"
      borderColor="secondary.200"
      rounded="4">
      <CUI.Image w="16" mx="auto" mb="4" src={partyLogoURL} />
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
