import * as CUI from '@chakra-ui/react';
import NextCUILink from 'components/NextCUILink';
import statusMap from 'components/BillCard/statusMap';
import {
  capitalizeNames,
  applyPeruCapitalizations,
  upperCaseFirstLetter,
} from 'utils';

const BillCard = ({
  authorship = [
    { slug: 'congressperson-slug-1', name: 'congressperon slug 1' },
    { slug: 'congressperson-slug-2', name: 'congressperon slug 2' },
  ],
  billId = '1234',
  billTitle = 'Ley que propone declarar de interés nacional y necesidad pública incluir en el currículo nacional de la educación básica regular y alternativa la enseñanza del curso de cívica con enfoque en los derechos humanos.',
  committeeName = 'Sin comisión',
  lastUpdate = '15/11/2021 - 13:46hrs',
  publicationDate = '15/11/2021',
  status = { bill_status_slug: 'en comisión' },
}) => {
  return (
    <CUI.Flex
      direction="column"
      p="6"
      backgroundColor="white"
      border="1px"
      borderColor="secondary.200"
      borderRadius="4px">
      <CUI.HStack spacing="2" mb="2">
        <CUI.Tag>{upperCaseFirstLetter(committeeName)}</CUI.Tag>
        <CUI.Tag variant={statusMap[status]?.variant}>
          {upperCaseFirstLetter(
            applyPeruCapitalizations(status.bill_status_slug),
          )}
        </CUI.Tag>
      </CUI.HStack>
      <CUI.Text fontSize="md" mb="4">
        {billTitle}
      </CUI.Text>
      <CUI.Flex mb="1">
        <CUI.Text fontWeight="bold" fontSize="sm">
          Fecha de publicación:
        </CUI.Text>
        <CUI.Text ml="1" fontSize="sm">
          {publicationDate}
        </CUI.Text>
      </CUI.Flex>
      <CUI.Flex mb="1">
        <CUI.Text fontWeight="bold" fontSize="sm">
          Última actualización:
        </CUI.Text>
        <CUI.Text ml="1" fontSize="sm">
          {lastUpdate}
        </CUI.Text>
      </CUI.Flex>
      <CUI.Flex mb="4" fontSize="sm">
        {authorship.length > 0 ? (
          <CUI.Text fontWeight="bold" mr="1">
            Autores:
          </CUI.Text>
        ) : null}
        {authorship.length > 0
          ? authorship.map((author, index) => (
              <NextCUILink
                key={author.slug}
                href={`/congresistas/${author.slug}`}
                color="primary.500"
                mr="1">
                {capitalizeNames(author.name)}
                {index + 1 !== authorship.length ? ', ' : ''}
              </NextCUILink>
            ))
          : null}
      </CUI.Flex>
      <CUI.Button
        as="a"
        href={`/proyectos-de-ley/${billId}`}
        mt="auto"
        variant="outline"
        size="sm"
        w="24">
        Ver detalle
      </CUI.Button>
    </CUI.Flex>
  );
};

export default BillCard;
