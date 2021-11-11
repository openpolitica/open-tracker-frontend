import * as CUI from '@chakra-ui/react';
import CongresspersonCard from 'components/CongresspersonCard';

export default function ListOfCongresspeople({ congresspeople }) {
  return (
    <CUI.Wrap spacing="4" direction={{ base: 'column', md: 'row' }}>
      {congresspeople.map(({ cvId, ...congresperson }) => (
        <CUI.WrapItem key={cvId} display={{ base: 'block', md: 'flex' }}>
          <CongresspersonCard {...congresperson} />
        </CUI.WrapItem>
      ))}
    </CUI.Wrap>
  );
}
